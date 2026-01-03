from rest_framework import serializers
from .models import Invoice, InvoiceItem
from inventory.models import Product
from django.db import transaction

class InvoiceItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = InvoiceItem
        fields = ['product', 'product_name', 'quantity', 'price']
        # This is the MAGIC LINE: Tell Django "Don't ask the user for this, just read it"
        read_only_fields = ['product_name']

import logging

logger = logging.getLogger(__name__)

class InvoiceSerializer(serializers.ModelSerializer):
    items = InvoiceItemSerializer(many=True)

    class Meta:
        model = Invoice
        fields = ['id', 'customer', 'customer_name', 'total_amount', 'payment_mode', 'created_at', 'items']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        
        # Use a transaction to ensure everything happens or nothing happens
        with transaction.atomic():
            # 1. Create the Invoice
            invoice = Invoice.objects.create(**validated_data)
            
            total = 0
            for item_data in items_data:
                product_data = item_data['product']
                qty = item_data['quantity']
                
                # 2. Check Stock with LOCK
                # select_for_update() locks the row until the transaction ends
                product = Product.objects.select_for_update().get(pk=product_data.pk)
                
                if product.quantity < qty:
                    raise serializers.ValidationError(f"Not enough stock for {product.name}. Available: {product.quantity}")
                
                # 3. Deduct Stock
                product.quantity -= qty
                product.save()
                
                # Log inventory change
                logger.info(f"Stock deducted for {product.name}: {qty} units. Remaining: {product.quantity}")
                
                # 4. Create Invoice Item
                InvoiceItem.objects.create(invoice=invoice, **item_data)
                total += (item_data['price'] * qty)
            
            # 5. Update Total
            invoice.total_amount = total
            invoice.save()

            # 6. HANDLE CREDIT TRANSACTION
            if invoice.payment_mode == 'CREDIT':
                if not invoice.customer:
                     raise serializers.ValidationError("Customer is required for credit sales.")
                
                # Credit Limit Check
                new_balance = invoice.customer.current_balance + invoice.total_amount
                if new_balance > invoice.customer.credit_limit:
                     raise serializers.ValidationError(f"Credit limit exceeded. Limit: {invoice.customer.credit_limit}, Current Balance: {invoice.customer.current_balance}, Purchase: {invoice.total_amount}")

                # Update Customer Balance
                invoice.customer.current_balance = new_balance
                invoice.customer.last_transaction_date = invoice.created_at
                invoice.customer.save()
                
                # Log credit transaction
                logger.info(f"Credit transaction: Invoice #{invoice.id}, Customer {invoice.customer.name}, Amount: {invoice.total_amount}")
            
            return invoice