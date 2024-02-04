# authentication/urls.py

from django.urls import path
from .views import CustomObtainAuthToken, SignUpView, LogoutView

urlpatterns = [
    path('token/', CustomObtainAuthToken.as_view(), name='custom_obtain_auth_token'),
    path('signup/', SignUpView.as_view(), name='signup'),
    path('logout/', LogoutView.as_view(), name='logout'),
]
