from django.db import models
from django.conf import settings
import uuid

class ActiveManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(archived_at__isnull=True)

class Shift(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='gig_shifts')
    date = models.DateField()
    earnings_amount = models.DecimalField(max_digits=12, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    archived_at = models.DateTimeField(null=True, blank=True, default=None)

    objects = models.Manager()
    active_objects = ActiveManager()

    class Meta:
        constraints = []

    def __str__(self):
        return f"{self.user.username} - {self.date} - {self.earnings_amount}"

class Expense(models.Model):
    TYPE_CHOICES = [
        ('FUEL', 'Fuel'),
        ('REPAIR', 'Repair'),
        ('PARKING', 'Parking'),
        ('COMMISSION', 'Commission'),
        ('OTHER', 'Other'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='gig_expenses')
    shift = models.ForeignKey(Shift, on_delete=models.SET_NULL, null=True, blank=True, related_name='expenses')
    expense_type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    archived_at = models.DateTimeField(null=True, blank=True, default=None)

    objects = models.Manager()
    active_objects = ActiveManager()

    def __str__(self):
        return f"{self.expense_type} - {self.amount}"

class SavingsGoal(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='savings_goals')
    date = models.DateField()
    daily_target_amount = models.DecimalField(max_digits=12, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user', 'date'], name='unique_goal_per_day')
        ]

    def __str__(self):
        return f"{self.user.username} - {self.date} - Target: {self.daily_target_amount}"
