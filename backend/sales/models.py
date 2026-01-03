from django.db import models
from django.conf import settings
from inventory.models import Product

from customers.models import Customer

class Invoice(models.Model):
    merchant = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True, blank=True)
    customer_name = models.CharField(max_length=100, blank=True, default="Walk-in Customer")
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    PAYMENT_MODES = [('CASH', 'Cash'), ('CREDIT', 'Credit')]
    payment_mode = models.CharField(max_length=10, choices=PAYMENT_MODES, default='CASH')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Invoice #{self.id} - ₹{self.total_amount}"

class InvoiceItem(models.Model):
    invoice = models.ForeignKey(Invoice, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    product_name = models.CharField(max_length=255) # Backup name in case Product is deleted
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2) # Price AT THE MOMENT of sale

    class Meta:
        constraints = [
            models.CheckConstraint(check=models.Q(quantity__gte=0), name='invoice_item_quantity_non_negative'),
        ]

    def save(self, *args, **kwargs):
        # Auto-save the product name if not set
        if self.product and not self.product_name:
            self.product_name = self.product.name
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.quantity} x {self.product_name}"