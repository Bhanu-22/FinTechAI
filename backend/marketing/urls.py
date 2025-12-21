from django.urls import path
from .views import JoinWaitlistView

urlpatterns = [
    path('join/', JoinWaitlistView.as_view(), name='join-waitlist'),
]