from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Customer
from .serializers import CustomerSerializer
from decimal import Decimal

class CustomerViewSet(viewsets.ModelViewSet):
    serializer_class = CustomerSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Only return customers belonging to the logged-in merchant
        return Customer.objects.filter(merchant=self.request.user)

    def perform_create(self, serializer):
        # Explicitly set merchant when saving (though serializer handles it too)
        serializer.save(merchant=self.request.user)

    @action(detail=True, methods=['post'])
    def settle_balance(self, request, pk=None):
        customer = self.get_object()
        amount = request.data.get('amount')

        if not amount:
            return Response({'error': 'Amount is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            amount = Decimal(str(amount))
            if amount <= 0:
                raise ValueError
        except (ValueError, TypeError):
             return Response({'error': 'Invalid amount'}, status=status.HTTP_400_BAD_REQUEST)

        customer.current_balance -= amount
        customer.save()

        serializer = self.get_serializer(customer)
        return Response(serializer.data)
