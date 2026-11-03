from django.urls import path
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.conf import settings

@api_view(['GET'])
def license_status(request):
    return Response({
        'mode': getattr(settings, 'DEPLOYMENT_MODE', 'STANDALONE'),
        'valid': True,
        'message': 'License check placeholder'
    })

urlpatterns = [
    path('status/', license_status),
]
