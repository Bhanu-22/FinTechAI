from django.test import TransactionTestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from datetime import date
from decimal import Decimal
from .models import Shift, Expense, SavingsGoal

User = get_user_model()

class PlatformTrackingTests(TransactionTestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='gigworker', email='gig@example.com', password='password123', role='GIG_WORKER')
        self.client.force_authenticate(user=self.user)
        self.today = date.today()

    def test_platform_aggregation(self):
        # Create shifts for multiple platforms
        Shift.objects.create(
            user=self.user,
            date=self.today,
            earnings_amount=Decimal('500.00'),
            platform='UBER'
        )
        Shift.objects.create(
            user=self.user,
            date=self.today,
            earnings_amount=Decimal('300.00'),
            platform='ZOMATO'
        )

        response = self.client.get(f'/api/gig/summary/daily?date={self.today}')
        self.assertEqual(response.status_code, 200)

        platform_breakdown = response.data['platform_breakdown']
        self.assertEqual(len(platform_breakdown), 2)

        uber = next(p for p in platform_breakdown if p['platform'] == 'UBER')
        self.assertEqual(Decimal(str(uber['total_earnings'])), Decimal('500.00'))
        
    def test_platform_field_default(self):
        shift = Shift.objects.create(
            user=self.user,
            date=self.today,
            earnings_amount=Decimal('100.00')
        )
        self.assertEqual(shift.platform, 'MANUAL')

    def test_daily_summary_backward_compatibility(self):
        response = self.client.get(f'/api/gig/summary/daily?date={self.today}')
        self.assertEqual(response.status_code, 200)

        required_fields = [
            'date',
            'currency',
            'earnings_total',
            'expenses_total',
            'net_income',
            'savings_goal'
        ]

        for field in required_fields:
            self.assertIn(field, response.data)
