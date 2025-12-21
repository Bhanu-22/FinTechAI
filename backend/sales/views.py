from rest_framework import viewsets, permissions
from .models import Invoice
from .serializers import InvoiceSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Sum, Count
from inventory.models import Product
from django.db.models.functions import TruncDate
from django.utils import timezone
from datetime import timedelta

class InvoiceViewSet(viewsets.ModelViewSet):
    serializer_class = InvoiceSerializer
    permission_classes = [permissions.IsAuthenticated]

    # 1. Only show invoices for the logged-in Merchant
    def get_queryset(self):
        return Invoice.objects.filter(merchant=self.request.user).order_by('-created_at')

    # 2. When creating an invoice, automatically attach the Merchant
    def perform_create(self, serializer):
        serializer.save(merchant=self.request.user)

class DashboardStatsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        # 1. Calculate Total Revenue (Sum of all invoices)
        revenue_data = Invoice.objects.filter(merchant=request.user).aggregate(Sum('total_amount'))
        total_revenue = revenue_data['total_amount__sum'] or 0

        # 2. Count Total Orders
        total_orders = Invoice.objects.filter(merchant=request.user).count()

        # 3. Count Low Stock Items (Less than 10 qty)
        low_stock_count = Product.objects.filter(merchant=request.user, quantity__lt=10).count()

        # 4. Return the Data
        return Response({
            "total_revenue": total_revenue,
            "total_orders": total_orders,
            "low_stock_alerts": low_stock_count,
            "currency": "₹"
        })

class AnalyticsDataView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        today = timezone.now().date()
        last_7_days = today - timedelta(days=6)

        # 1. Chart Data: Sales per day for the last 7 days
        daily_sales = (
            Invoice.objects.filter(
                merchant=request.user, 
                created_at__date__gte=last_7_days
            )
            .annotate(date=TruncDate('created_at'))
            .values('date')
            .annotate(revenue=Sum('total_amount'), orders=Count('id'))
            .order_by('date')
        )

        # 2. Recent Transactions (Full Detail)
        recent_invoices = Invoice.objects.filter(merchant=request.user).order_by('-created_at')[:10]
        
        # Format the data for the frontend
        chart_data = []
        # Create a dictionary for quick lookup to handle days with 0 sales
        sales_dict = {entry['date'].strftime('%Y-%m-%d'): entry['revenue'] for entry in daily_sales}
        
        # Loop through last 7 days to ensure even 0 sales days appear on the chart
        for i in range(7):
            date_obj = last_7_days + timedelta(days=i)
            date_str = date_obj.strftime('%Y-%m-%d')
            chart_data.append({
                "date": date_obj.strftime('%d %b'), # e.g., "22 Dec"
                "revenue": sales_dict.get(date_str, 0)
            })

        return Response({
            "chart_data": chart_data,
            "recent_transactions": InvoiceSerializer(recent_invoices, many=True).data
        })