from django.utils.deprecation import MiddlewareMixin
from django.conf import settings
from django.http import JsonResponse
from .models import LicenseActivation


class LicenseCheckMiddleware(MiddlewareMixin):
    def process_request(self, request):
        if getattr(settings, 'DEPLOYMENT_MODE', 'STANDALONE') != 'STANDALONE':
            return None

        path = request.path_info or ''
        # Allow license API and static files
        if path.startswith('/api/licensing/'):
            return None
        if path.startswith('/admin/'):
            return None
        if path.startswith('/static/') or path.startswith('/media/'):
            return None

        # Try to get machine_id from header or query
        machine_id = request.headers.get('X-Machine-ID') or request.GET.get('machine_id')
        if not machine_id:
            return JsonResponse({
                'detail': 'License key required. Provide X-Machine-ID header or machine_id.',
                'code': 'LICENSE_REQUIRED'
            }, status=423)

        license = LicenseActivation.objects.filter(machine_id=machine_id, is_valid=True).first()
        if not license:
            return JsonResponse({
                'detail': 'Invalid or unactivated license. Please activate your license key.',
                'code': 'LICENSE_INVALID'
            }, status=423)

        request.license_activation = license
        return None
