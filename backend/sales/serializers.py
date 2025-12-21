from rest_framework import serializers
from .models import Invoice, InvoiceItem
from inventory.models import Product
from django.db import transaction

class InvoiceItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = InvoiceItem
        fields = ['product', 'product_name', 'quantity', 'price']
        # This is the MAGIC LINE: Tell Django "Don't ask the user for this, just read it"
        read_only_fields = ['product_name']

class InvoiceSerializer(serializers.ModelSerializer):
    items = InvoiceItemSerializer(many=True)

    class Meta:
        model = Invoice
        fields = ['id', 'customer', 'customer_name', 'total_amount', 'payment_mode', 'created_at', 'items']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        
        # Use a transaction to ensure everything happens or nothing happens
        with transaction.atomic():
            # 1. Create the Invoice
            invoice = Invoice.objects.create(**validated_data)
            
            total = 0
            for item_data in items_data:
                product = item_data['product']
                qty = item_data['quantity']
                
                # 2. Check Stock
                if product.quantity < qty:
                    raise serializers.ValidationError(f"Not enough stock for {product.name}")
                
                # 3. Deduct Stock
                product.quantity -= qty
                product.save()
                
                # 4. Create Invoice Item
                InvoiceItem.objects.create(invoice=invoice, **item_data)
                total += (item_data['price'] * qty)
            
            # 5. Update Total
            invoice.total_amount = total
            invoice.save()

            # 6. HANDLE CREDIT TRANSACTION
            if invoice.payment_mode == 'CREDIT' and invoice.customer:
                # Update Customer Balance
                invoice.customer.current_balance += invoice.total_amount
                invoice.customer.last_transaction_date = invoice.created_at
                invoice.customer.save()
            
            return invoice