from django.urls import path
from .views import pin_login

urlpatterns = [
    path('pin-login/', pin_login),
]
