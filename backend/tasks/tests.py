from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework import status
from .models import Task

class TaskAPITestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.client = APIClient()

    def test_task_list_create_view(self):
        # Log in the user
        self.client.force_authenticate(user=self.user)

        # Create a task
        task_data = {'title': 'Test Task', 'description': 'Test Description', 'status': 'pending'}
        response = self.client.post('/api/tasks/', task_data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Task.objects.count(), 1)
        self.assertEqual(Task.objects.get().title, 'Test Task')
        self.assertEqual(Task.objects.get().user, self.user)

    def test_task_list_create_view_unauthenticated(self):
        # Attempt to create a task without authentication
        task_data = {'title': 'Test Task', 'description': 'Test Description', 'status': 'pending'}
        response = self.client.post('/api/tasks/', task_data, format='json')

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_task_detail_view(self):
        # Log in the user
        self.client.force_authenticate(user=self.user)

        # Create a task
        task = Task.objects.create(title='Test Task', description='Test Description', status='pending', user=self.user)

        # Retrieve task details
        response = self.client.get(f'/api/tasks/{task.id}/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], 'Test Task')
        self.assertEqual(response.data['user'], self.user.id)  # Compare user ID instead of username


    def test_task_detail_view_unauthenticated(self):
        # Create a task
        task = Task.objects.create(title='Test Task', description='Test Description', status='pending', user=self.user)

        # Attempt to retrieve task details without authentication
        response = self.client.get(f'/api/tasks/{task.id}/')

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
