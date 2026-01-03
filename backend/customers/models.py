from django.db import models
from django.conf import settings

class Customer(models.Model):
    merchant = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='customers')
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=15)
    credit_limit = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    current_balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    last_transaction_date = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('merchant', 'phone')
        ordering = ['-updated_at']
        constraints = [
            models.CheckConstraint(check=models.Q(current_balance__gte=0), name='customer_balance_non_negative'),
            models.CheckConstraint(check=models.Q(credit_limit__gte=0), name='credit_limit_non_negative'),
        ]

    def __str__(self):
        return f"{self.name} ({self.phone})"
