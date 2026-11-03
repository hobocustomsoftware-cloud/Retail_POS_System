from django.urls import path
from .views import pin_login, google_register_shop

urlpatterns = [
    path('pin-login/', pin_login),
    path('google-register-shop/', google_register_shop),
]
