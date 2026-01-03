import os
import django
import sys
from datetime import date
from decimal import Decimal


# Setup Django Environment
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'artha_api.settings')

import django
django.setup()

from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework.test import APIRequestFactory, force_authenticate
from gig_api.models import Shift, Expense, SavingsGoal
from gig_api.views import habit_status_view

User = get_user_model()

def run_verification():
    print("Starting GW-016 Habit Loop Verification...")
    
    # 1. Setup Request Factory
    factory = APIRequestFactory()
    
    # 2. Setup Test User (Gig Worker)
    user, created = User.objects.get_or_create(username="gw016_tester", defaults={'email': 'gw016@test.com', 'role': 'GIG_WORKER'})
    if created:
        user.set_password("password123")
        user.save()
    
    # Cleanup
    today = date.today()
    Shift.objects.filter(user=user, date=today).delete()
    Expense.objects.filter(user=user, created_at__date=today).delete()
    SavingsGoal.objects.filter(user=user, date=today).delete()
    print("[INFO] Cleaned up data for gw016_tester")

    # 3. Test: Initial State (All False)
    request = factory.get('/api/gig/summary/status')
    force_authenticate(request, user=user)
    response = habit_status_view(request)
    
    data = response.data
    print(f"\n[Test 1] Initial State: {data}")
    if not any([data['shift_logged_today'], data['expenses_logged_today'], data['savings_goal_set_today'], data['day_completed']]):
         print("[PASS] All statuses False initially.")
    else:
         print("[FAIL] Expected all False.")

    # 4. Test: Log Shift
    shift = Shift.objects.create(user=user, date=today, earnings_amount=Decimal('100'))
    response = habit_status_view(request)
    if response.data['shift_logged_today']:
        print("[PASS] shift_logged_today is True after creating shift.")
    else:
        print("[FAIL] shift_logged_today not detected.")

    # 5. Test: Log Expense (Linked to Shift)
    Expense.objects.create(user=user, shift=shift, expense_type='FUEL', amount=Decimal('10'))
    response = habit_status_view(request)
    if response.data['expenses_logged_today']:
        print("[PASS] expenses_logged_today is True after creating expense.")
    else:
        print("[FAIL] expenses_logged_today not detected.")

    # 6. Test: Set Goal
    SavingsGoal.objects.create(user=user, date=today, daily_target_amount=Decimal('50'))
    response = habit_status_view(request)
    if response.data['savings_goal_set_today']:
        print("[PASS] savings_goal_set_today is True after setting goal.")
    else:
        print("[FAIL] savings_goal_set_today not detected.")

    # 7. Test: Day Completed
    if response.data['day_completed']:
        print("[PASS] day_completed is True (Habit Loop Closed).")
    else:
        print("[FAIL] day_completed False but all conditions met.")

    # 8. Test: Security / Role Check
    merchant_user, _ = User.objects.get_or_create(username="merchant_spy", defaults={'role': 'MERCHANT'})
    request_m = factory.get('/api/gig/summary/status')
    force_authenticate(request_m, user=merchant_user)
    response_m = habit_status_view(request_m)
    
    if response_m.status_code == 403:
        print(f"[PASS] Merchant blocked accessing endpoint (403).")
    else:
        print(f"[FAIL] Merchant allowed access! Status: {response_m.status_code}")

    print("\n[SUCCESS] GW-016 Verification Complete.")

if __name__ == "__main__":
    run_verification()
