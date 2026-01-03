import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'artha_api.settings')
django.setup()

from django.contrib.auth import get_user_model
User = get_user_model()

email = 'bhanu@gmail.com'

try:
    user = User.objects.get(email=email)
    print(f"Current Role: {user.role}")
    
    if user.role != 'GIG_WORKER':
        user.role = 'GIG_WORKER'
        user.save()
        print(f"Role updated to 'GIG_WORKER'.")
    else:
        print("User is already a GIG_WORKER.")

except User.DoesNotExist:
    print(f"User {email} not found.")
except Exception as e:
    print(f"Error: {e}")
