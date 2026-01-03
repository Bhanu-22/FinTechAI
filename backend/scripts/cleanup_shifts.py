import os
import django
import datetime

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'artha_api.settings')
django.setup()

from django.contrib.auth import get_user_model
from gig_api.models import Shift

User = get_user_model()
try:
    user = User.objects.get(email='bhanu@gmail.com')
    today = datetime.date.today()
    shifts = Shift.objects.filter(user=user, date=today)
    count = shifts.count()
    shifts.delete()
    print(f"Deleted {count} shifts for {user.email} on {today}.")
except Exception as e:
    print(f"Error: {e}")
