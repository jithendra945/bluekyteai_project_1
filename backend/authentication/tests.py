# authentication/tests.py

from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model

class AuthenticationTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.signup_url = reverse('signup')
        self.login_url = reverse('custom_obtain_auth_token')
        self.logout_url = reverse('logout')

        self.user_data = {
            'username': 'testuser',
            'password': 'testpassword'
        }
        self.user = get_user_model().objects.create_user(
            username=self.user_data['username'],
            password=self.user_data['password']
        )

    def test_signup(self):
        response = self.client.post(self.signup_url, self.user_data, format='json')
        
        # Print the response content for debugging purposes
        # print(response.content)
        
        # Check for both success (status code 200) and error (status code 400) scenarios
        self.assertIn(response.status_code, [status.HTTP_200_OK, status.HTTP_400_BAD_REQUEST])
        
        if response.status_code == status.HTTP_200_OK:
            # If the signup was successful, check the response content
            self.assertIn('token', response.data)
            self.assertIn('user_id', response.data)
            self.assertIn('username', response.data)
        elif response.status_code == status.HTTP_400_BAD_REQUEST:
            # If there was an error, check for the specific error message
            self.assertIn('error', response.data)
            self.assertEqual(response.data['error'], 'Username already exists')

    def test_login(self):
        response = self.client.post(self.login_url, self.user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('token', response.data)
        self.assertIn('user_id', response.data)
        self.assertIn('username', response.data)

    def test_logout(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post(self.logout_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('message', response.data)
        self.assertEqual(response.data['message'], 'Successfully logged out')
