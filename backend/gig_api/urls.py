from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import ShiftViewSet, ExpenseViewSet, SavingsGoalViewSet, daily_summary_view, gig_welcome, habit_status_view

router = DefaultRouter()
router.register(r'shifts', ShiftViewSet, basename='shift')
router.register(r'expenses', ExpenseViewSet, basename='expense')
router.register(r'savings/goal', SavingsGoalViewSet, basename='savings-goal')

urlpatterns = [
    path('', gig_welcome, name='gig-welcome'),
    path('summary/daily', daily_summary_view, name='daily-summary'),
    path('summary/status', habit_status_view, name='habit-status'),
    path('sms/parse', views.parse_sms_view, name='sms-parse'),
    path('sms/confirm', views.confirm_sms_view, name='sms-confirm'),
    path('', include(router.urls)),
]
