from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import InvoiceViewSet, DashboardStatsView, AnalyticsDataView

router = DefaultRouter()
router.register(r'invoices', InvoiceViewSet, basename='invoice')

urlpatterns = [
    path('', include(router.urls)),
    path('dashboard-stats/', DashboardStatsView.as_view(), name='dashboard-stats'),
    path('analytics/', AnalyticsDataView.as_view(), name='analytics'),

]
