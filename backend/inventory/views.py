from rest_framework import viewsets, permissions
from .models import Product
from .serializers import ProductSerializer

class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated] # Only logged-in users can access

    # 1. Filter: Only return products belonging to the logged-in user
    def get_queryset(self):
        return Product.objects.filter(merchant=self.request.user).order_by('-updated_at')

    # 2. Auto-Add: When saving a product, automatically set 'merchant' to the current user
    def perform_create(self, serializer):
        serializer.save(merchant=self.request.user)