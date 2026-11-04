from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from rest_framework import status

User = get_user_model()

@api_view(['POST'])
def google_register_shop(request):
    email = request.data.get('email')
    if not email or not email.endswith('@gmail.com'):
        return Response({'error': 'Gmail only'}, status=400)
    user, created = User.objects.get_or_create(username=email, defaults={'email': email})
    return Response({'user_id': user.id, 'email': user.email, 'created': created})

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
