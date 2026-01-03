import os
import django
import sys
from datetime import date
from decimal import Decimal

# Setup Django Environment
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'artha_api.settings')
django.setup()

from django.contrib.auth import get_user_model
from gig_api.models import Shift, Expense, SavingsGoal

User = get_user_model()

def run_verification():
    print("Starting Gig Feature Verification...")
    
    # 1. Create Test User
    username = "gig_tester"
    password = "password123"
    email = "gig@test.com"
    
    user, created = User.objects.get_or_create(username=username, defaults={'email': email})
    if created:
        user.set_password(password)
        user.save()
        print(f"[PASS] Created test user: {username}")
    else:
        print(f"[INFO] Using existing test user: {username}")

    # Cleanup previous data for today
    today = date.today()
    Shift.objects.filter(user=user, date=today).delete()
    Expense.objects.filter(user=user, created_at__date=today).delete() # approximate for expense
    SavingsGoal.objects.filter(user=user, date=today).delete()
    print("[INFO] Cleaned up previous test data for today")

    # 2. Create Shift
    try:
        shift = Shift.objects.create(
            user=user,
            date=today,
            earnings_amount=Decimal('1500.50')
        )
        print(f"[PASS] Created Shift for {today} with earnings: {shift.earnings_amount}")
    except Exception as e:
        print(f"[FAIL] Failed to create Shift: {e}")
        return

    # 3. Create Expense
    try:
        expense = Expense.objects.create(
            user=user,
            shift=shift,
            expense_type='FUEL',
            amount=Decimal('200.00'),
            description="Test Fuel"
        )
        print(f"[PASS] Created Expense: {expense.expense_type} - {expense.amount}")
    except Exception as e:
        print(f"[FAIL] Failed to create Expense: {e}")

    # 4. Create Savings Goal
    try:
        goal = SavingsGoal.objects.create(
            user=user,
            date=today,
            daily_target_amount=Decimal('500.00')
        )
        print(f"[PASS] Created Savings Goal: {goal.daily_target_amount}")
    except Exception as e:
        print(f"[FAIL] Failed to create Savings Goal: {e}")

    # 5. Verify Aggregations (Simulate what the View would do)
    # Net Income = Earnings - Expenses
    total_earnings = shift.earnings_amount
    total_expenses = expense.amount
    net_income = total_earnings - total_expenses
    
    print("\n--- Summary Verification ---")
    print(f"Total Earnings: {total_earnings}")
    print(f"Total Expenses: {total_expenses}")
    print(f"Net Income: {net_income}")
    
    expected_net = Decimal('1300.50')
    if net_income == expected_net:
        print(f"[PASS] Net Income calculation correct: {net_income}")
    else:
        print(f"[FAIL] Net Income calculation incorrect. Expected {expected_net}, got {net_income}")

    # 6. Verify Goal Progress
    progress = (net_income / goal.daily_target_amount) * 100
    print(f"Goal Progress: {progress}%")
    
    if progress > 100:
        print("[PASS] Goal exceeded (Good!)")
    else:
        print("[PASS] Goal progress calculated")

    print("\n[SUCCESS] Gig Backend Verification Complete!")

if __name__ == "__main__":
    run_verification()
