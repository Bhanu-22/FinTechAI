from django.contrib import admin
from .models import Shift, Expense, SavingsGoal

@admin.register(Shift)
class ShiftAdmin(admin.ModelAdmin):
    list_display = ('user', 'date', 'earnings_amount', 'archived_at')
    readonly_fields = ('archived_at',)

@admin.register(Expense)
class ExpenseAdmin(admin.ModelAdmin):
    list_display = ('user', 'expense_type', 'amount', 'shift', 'archived_at')
    readonly_fields = ('archived_at',)

@admin.register(SavingsGoal)
class SavingsGoalAdmin(admin.ModelAdmin):
    list_display = ('user', 'date', 'daily_target_amount')
