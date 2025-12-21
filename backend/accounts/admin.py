from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

class CustomUserAdmin(UserAdmin):
    # This adds 'role' to the "Change User" page
    fieldsets = UserAdmin.fieldsets + (
        ('Artha Custom Fields', {'fields': ('role',)}),
    )
    # This adds 'role' to the "Add User" page
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Artha Custom Fields', {'fields': ('role',)}),
    )
    list_display = ('username', 'email', 'role', 'is_staff')

# Register your User with the new settings
admin.site.register(User, CustomUserAdmin)