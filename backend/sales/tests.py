from django.test import TransactionTestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from inventory.models import Product
from customers.models import Customer
from sales.models import Invoice
from decimal import Decimal
import threading

User = get_user_model()

class InvoiceTests(TransactionTestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testmerch', email='test@example.com', password='password123')
        self.client.force_authenticate(user=self.user)
        
        self.product = Product.objects.create(
            merchant=self.user,
            name="Test Product",
            quantity=10,
            price=Decimal("100.00")
        )
        
        self.customer = Customer.objects.create(
            merchant=self.user,
            name="Test Customer",
            phone="1234567890",
            credit_limit=Decimal("1000.00"),
            current_balance=Decimal("0.00")
        )

    def test_stock_deduction(self):
        data = {
            "customer": self.customer.id,
            "payment_mode": "CASH",
            "items": [
                {"product": self.product.id, "quantity": 2, "price": 100.00}
            ]
        }
        response = self.client.post('/api/sales/invoices/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        self.product.refresh_from_db()
        self.assertEqual(self.product.quantity, 8)

    def test_insufficient_stock(self):
        data = {
            "customer": self.customer.id,
            "payment_mode": "CASH",
            "items": [
                {"product": self.product.id, "quantity": 11, "price": 100.00}
            ]
        }
        response = self.client.post('/api/sales/invoices/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        
        self.product.refresh_from_db()
        self.assertEqual(self.product.quantity, 10) # Unchanged

    def test_credit_limit_success(self):
        data = {
            "customer": self.customer.id,
            "payment_mode": "CREDIT",
            "items": [
                {"product": self.product.id, "quantity": 5, "price": 100.00} # Total 500
            ]
        }
        response = self.client.post('/api/sales/invoices/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        self.customer.refresh_from_db()
        self.assertEqual(self.customer.current_balance, Decimal("500.00"))

    def test_credit_limit_exceeded(self):
        # Limit 1000. Buy 11 * 100 = 1100.
        # Ensure we have enough stock first for this test not to fail on stock
        self.product.quantity = 20
        self.product.save()
        
        data = {
            "customer": self.customer.id,
            "payment_mode": "CREDIT",
            "items": [
                {"product": self.product.id, "quantity": 11, "price": 100.00}
            ]
        }
        response = self.client.post('/api/sales/invoices/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("Credit limit exceeded", str(response.data))
        
        self.customer.refresh_from_db()
        self.assertEqual(self.customer.current_balance, Decimal("0.00"))

    def test_race_condition(self):
        # Try to buy 6 items twice concurrently. Stock 10.
        # Should result in 1 success, 1 fail. Or both fail if checking happens after.
        # With atomic and select_for_update, the second one should see 4 items left and fail.
        
        exceptions = []
        
        def create_invoice():
            try:
                # We need a new client for each thread to avoid shared state issues in test client?
                # Actually TransactionTestCase might handle DB but client is not thread safe?
                # We'll simulate by calling the view logic or just relying on the fact that database is shared.
                # But `client.post` is easiest.
                
                local_client = APIClient()
                local_client.force_authenticate(user=self.user)
                data = {
                    "customer": self.customer.id,
                    "payment_mode": "CASH",
                    "items": [
                        {"product": self.product.id, "quantity": 6, "price": 100.00}
                    ]
                }
                res = local_client.post('/api/sales/invoices/', data, format='json')
                if res.status_code != 201:
                    exceptions.append(res.status_code)
            except Exception as e:
                exceptions.append(e)

        t1 = threading.Thread(target=create_invoice)
        t2 = threading.Thread(target=create_invoice)
        
        t1.start()
        t2.start()
        
        t1.join()
        t2.join()
        
        # Reload product
        self.product.refresh_from_db()
        
        # One should fail (400), one success.
        # So remaining stock should be 4.
        # If race condition existed, both might check 10 >= 6, and both deduct 6 -> -2 stock.
        
        self.assertEqual(self.product.quantity, 4)
        self.assertEqual(len(exceptions), 1) # Expect 1 failure
