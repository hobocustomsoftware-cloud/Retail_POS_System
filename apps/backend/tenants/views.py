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
from dateutil.relativedelta import relativedelta
from django.utils import timezone

class ShopViewSet(ShopViewSet):
    def perform_create(self, serializer):
        shop = serializer.save(owner=self.request.user if self.request.user.is_authenticated else None)
        shop.trial_end = timezone.now() + relativedelta(months=1) + timedelta(days=7)
        shop.subscription_status = 'TRIAL'
        shop.save()


from rest_framework.decorators import action
from rest_framework.response import Response


class ShopViewSet(ShopViewSet):
    @action(detail=False, methods=['get'])
    def status(self, request):
        shop = getattr(request, 'shop', None)
        if not shop and request.user.is_authenticated:
            shop = Shop.objects.filter(owner=request.user).first()
        if not shop:
            return Response({'status': 'NO_SHOP', 'is_read_only': True}, status=404)
        from core.utils.subscription import get_shop_status
        status = get_shop_status(shop)
        return Response({
            'shop_id': shop.id,
            'shop_name': shop.shop_name,
            'subscription_status': shop.subscription_status,
            'trial_end': shop.trial_end,
            **status
        })
