from rest_framework import generics
from .models import WaitlistEntry
from .serializers import WaitlistEntrySerializer

class JoinWaitlistView(generics.CreateAPIView):
    queryset = WaitlistEntry.objects.all()
    serializer_class = WaitlistEntrySerializer