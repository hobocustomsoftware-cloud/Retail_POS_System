from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate
from django.conf import settings
from .models import User

@api_view(['POST'])
def pin_login(request):
    pin = request.data.get('pin')
    username = request.data.get('username')
    if not pin:
        return Response({'error': 'PIN required'}, status=400)
    try:
        user = User.objects.get(pin=pin)
        return Response({'id': user.id, 'username': user.username, 'role': user.role, 'branch': user.branch_id})
    except User.DoesNotExist:
        return Response({'error': 'Invalid PIN'}, status=401)
