from django.urls import path
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.conf import settings
import uuid

@api_view(['GET'])
def license_status(request):
    return Response({
        'mode': getattr(settings, 'DEPLOYMENT_MODE', 'STANDALONE'),
        'valid': True
    })

@api_view(['POST'])
def license_activate(request):
    key = request.data.get('key')
    machine_id = request.data.get('machine_id') or str(uuid.uuid4())
    return Response({
        'valid': bool(key and len(key) > 5),
        'machine_id': machine_id,
        'message': 'Activated' if key else 'Invalid key'
    })

urlpatterns = [
    path('status/', license_status),
    path('activate/', license_activate),
]
