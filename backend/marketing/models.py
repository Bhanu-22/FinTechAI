from django.db import models

# Create your models here.

class WaitlistEntry(models.Model):
    ROLE_CHOICES = [
        ('MERCHANT', 'Merchant'),
        ('FREELANCER', 'Freelancer'),
        ('GIG_WORKER', 'Gig Worker'),
    ]

    email = models.EmailField(unique=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.email} ({self.role})"