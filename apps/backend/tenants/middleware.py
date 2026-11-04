from django.utils.deprecation import MiddlewareMixin
from django.http import JsonResponse
from django.conf import settings
from .models import Shop


class TenantMiddleware(MiddlewareMixin):
    def process_request(self, request):
        request.tenant_id = None
        request.shop = None
        
        # Try to resolve shop
        if hasattr(request, 'user') and request.user.is_authenticated:
            shop = Shop.objects.filter(owner=request.user).first()
            if shop:
                request.shop = shop
                request.tenant_id = shop.id
        
        return None


class SubscriptionCheckMiddleware(MiddlewareMixin):
    MUTATING_METHODS = ['POST', 'PUT', 'PATCH', 'DELETE']
    
    def process_request(self, request):
        # Skip for safe methods and certain paths
        if request.method not in self.MUTATING_METHODS:
            return None
        
        path = request.path_info or ''
        # Allow certain paths
        if path.startswith('/api/billing/'):
            return None
        if path.startswith('/api/tenants/shops/'):
            return None
        if path.startswith('/api/licensing/'):
            return None
        if path.startswith('/admin/'):
            return None
        if path.startswith('/api/auth/') or path.startswith('/api/accounts/'):
            return None
        
        shop = getattr(request, 'shop', None)
        if not shop:
            return None
        
        # Check subscription status
        from django.utils import timezone
        from core.utils.subscription import get_shop_status
        status = get_shop_status(shop)
        if status.get('is_read_only'):
            return JsonResponse({
                'detail': 'View only mode. Trial expired. Please subscribe to continue.',
                'code': 'VIEW_ONLY',
                'status': status.get('status')
            }, status=403)
        return None
