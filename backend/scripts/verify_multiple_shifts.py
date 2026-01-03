import os
import django
import sys
from datetime import date
from decimal import Decimal
from rest_framework.test import APIRequestFactory, force_authenticate

# Setup Django Environment
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'artha_api.settings')

import django
django.setup()

from django.conf import settings
from django.contrib.auth import get_user_model
from gig_api.models import Shift
from gig_api.views import daily_summary_view

User = get_user_model()

def run_verification():
    print("Starting Multi-Shift Verification...")
    
    # 1. Setup Test User
    user, _ = User.objects.get_or_create(username="multi_shifter", defaults={'role': 'GIG_WORKER'})
    
    # Cleanup
    today = date.today()
    Shift.objects.filter(user=user, date=today).delete()
    
    # 2. Create Multiple Shifts
    Shift.objects.create(user=user, date=today, earnings_amount=Decimal('100.00'))
    Shift.objects.create(user=user, date=today, earnings_amount=Decimal('200.00'))
    print("[INFO] Created two shifts: 100 + 200")

    # 3. Check Summary
    factory = APIRequestFactory()
    request = factory.get(f'/api/gig/summary/daily?date={today}')
    force_authenticate(request, user=user)
    response = daily_summary_view(request)
    
    total = response.data['earnings_total']
    print(f"\n[Result] Total Earnings: {total}")
    
    if total == 300:
        print("[PASS] Aggregation works correctly!")
    else:
        print(f"[FAIL] Expected 300, got {total}")

if __name__ == "__main__":
    run_verification()
