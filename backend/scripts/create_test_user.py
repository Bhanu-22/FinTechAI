import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'artha_api.settings')
django.setup()

from django.contrib.auth import get_user_model
User = get_user_model()

try:
    user, created = User.objects.get_or_create(
        email='test@example.com',
        username='test@example.com'
    )
    user.set_password('password')
    user.is_active = True
    user.save()
    
    if created:
        print("Test user 'test@example.com' created successfully.")
    else:
        print("Test user 'test@example.com' already exists. Password reset to 'password'.")

except Exception as e:
    print(f"Error creating test user: {e}")
