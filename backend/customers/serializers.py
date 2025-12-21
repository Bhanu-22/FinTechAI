from rest_framework import serializers
from .models import Customer

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'merchant', 'name', 'phone', 'current_balance', 'last_transaction_date', 'updated_at']
        read_only_fields = ['merchant', 'current_balance', 'last_transaction_date', 'updated_at']

    def create(self, validated_data):
        # Automatically assign the merchant from the context
        validated_data['merchant'] = self.context['request'].user
        return super().create(validated_data)
