from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import Task
from .serializers import TaskSerializer
from rest_framework.authtoken.models import Token

class CustomTokenAuthentication(permissions.BasePermission):
    """
    Custom authentication based on a token.
    """

    def has_permission(self, request, view):
        # Your custom token verification logic here
        # You can access the token from the request headers or query parameters

        token_key = request.headers.get('Authorization', '').split(' ')[-1]

        if not token_key:
            return False

        # Retrieve the user associated with the token
        try:
            token = Token.objects.get(key=token_key)
            request.user = token.user
        except Token.DoesNotExist:
            return False

        # Add your additional token verification logic here if needed

        return True

class TaskListCreateView(generics.ListCreateAPIView):
    permission_classes = [CustomTokenAuthentication]  # Use your custom authentication class

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    serializer_class = TaskSerializer

class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [CustomTokenAuthentication]  # Use your custom authentication class

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)

    serializer_class = TaskSerializer

class TokenVerificationView(APIView):
    permission_classes = [CustomTokenAuthentication]

    def get(self, request, *args, **kwargs):
        # If the token is verified, return a success response
        return Response({'detail': 'Token is valid'}, status=status.HTTP_200_OK)
