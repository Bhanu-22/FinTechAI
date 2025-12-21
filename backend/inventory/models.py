from django.db import models

from django.conf import settings

class Product(models.Model):
    # Link the product to a specific Merchant (so they only see their own stuff)
    merchant = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='products')
    
    name = models.CharField(max_length=255)
    quantity = models.IntegerField(default=0)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    
    # Optional: Help them organize (e.g., "Dairy", "Snacks")
    category = models.CharField(max_length=100, blank=True, null=True)
    
    # Auto-timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.quantity})"