from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    class Role(models.TextChoices):
        MERCHANT = "MERCHANT", "Merchant"
        FREELANCER = "FREELANCER", "Freelancer"
        GIG_WORKER = "GIG_WORKER", "Gig Worker"
        ADMIN = "ADMIN", "Admin"

    role = models.CharField(max_length=50, choices=Role.choices, default=Role.ADMIN)

    def __str__(self):
        return f"{self.username} ({self.role})"