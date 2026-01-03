from rest_framework import serializers
from .models import Shift, Expense, SavingsGoal

class ShiftSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shift
        fields = ['id', 'user', 'date', 'earnings_amount', 'platform', 'created_at']
        read_only_fields = ['id', 'user', 'created_at']

class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = ['id', 'user', 'shift', 'expense_type', 'amount', 'description', 'created_at']
        read_only_fields = ['id', 'user', 'created_at']

class SavingsGoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavingsGoal
        fields = ['id', 'user', 'date', 'daily_target_amount', 'created_at']
        read_only_fields = ['id', 'user', 'created_at']
