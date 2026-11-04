from django.urls import path
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.conf import settings
import uuid

from .models import LicenseActivation


@api_view(['GET'])
def license_status(request):
    machine_id = request.headers.get('X-Machine-ID') or request.GET.get('machine_id')
    if getattr(settings, 'DEPLOYMENT_MODE', 'STANDALONE') == 'MULTI_TENANT':
        return Response({'mode': 'MULTI_TENANT', 'valid': True})
    
    if not machine_id:
        return Response({'mode': 'STANDALONE', 'valid': False, 'reason': 'MACHINE_ID_REQUIRED'}, status=200)
    
    license = LicenseActivation.objects.filter(machine_id=machine_id, is_valid=True).first()
    if license:
        return Response({'mode': 'STANDALONE', 'valid': True, 'machine_id': machine_id})
    return Response({'mode': 'STANDALONE', 'valid': False, 'reason': 'NOT_ACTIVATED'}, status=200)


@api_view(['POST'])
def license_activate(request):
    key = request.data.get('key') or request.data.get('license_key')
    machine_id = request.data.get('machine_id') or request.headers.get('X-Machine-ID') or str(uuid.uuid4())
    
    if not key:
        return Response({'valid': False, 'message': 'License key is required'}, status=400)
    
    if not (key.startswith('POS-') and len(key) >= 12):
        return Response({'valid': False, 'message': 'Invalid license key format. Must start with POS- and be at least 12 characters'}, status=400)
    
    license, created = LicenseActivation.objects.update_or_create(
        machine_id=machine_id,
        defaults={'license_key': key, 'is_valid': True}
    )
    return Response({
        'valid': True,
        'machine_id': machine_id,
        'message': 'License activated successfully',
        'created': created
    })


urlpatterns = [
    path('status/', license_status),
    path('activate/', license_activate),
]
