import os
import django
import sys

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'artha_api.settings')
django.setup()

from django.contrib.auth import get_user_model
User = get_user_model()

email = 'bhanu@gmail.com'

try:
    user = User.objects.get(email=email)
    print(f"User found: {user.email}")
    print(f"Username: {user.username}")
    print(f"Is Active: {user.is_active}")
    print(f"Check Password 'password': {user.check_password('password')}")
except User.DoesNotExist:
    print(f"User {email} DOES NOT EXIST.")
except Exception as e:
    print(f"Error: {e}")
