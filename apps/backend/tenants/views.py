from rest_framework import viewsets
from .models import Tenant, Shop
from .serializers import ShopSerializer
from django.utils import timezone
from datetime import timedelta

class ShopViewSet(viewsets.ModelViewSet):
    queryset = Shop.objects.all()
    serializer_class = ShopSerializer

    def perform_create(self, serializer):
        shop = serializer.save(owner=self.request.user if self.request.user.is_authenticated else None)
        shop.trial_end = timezone.now() + timedelta(days=7)
        shop.subscription_status = 'TRIAL'
        shop.save()
from .models import DomainRequest
from .serializers import DomainRequestSerializer

class DomainRequestViewSet(viewsets.ModelViewSet):
    queryset = DomainRequest.objects.all()
    serializer_class = DomainRequestSerializer
