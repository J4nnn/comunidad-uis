from django.test import TestCase

# Create your tests here.

from rest_framework.test import APIClient
from django.test import TestCase
from django.contrib.auth.models import User
from core.models import Faculty, School, Group, Announcement, UserGroup

class GroupViewTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.faculty = Faculty.objects.create(name="Engineering")
        self.school = School.objects.create(name="Computer Science", faculty=self.faculty)
        self.user1 = User.objects.create(username="user1", password="password")
        self.user2 = User.objects.create(username="user2", password="password")
        self.group1 = Group.objects.create(
            name="Group 1", description="Test group", quota=3, creator=self.user1, school=self.school
        )
        self.group2 = Group.objects.create(
            name="Group 2", description="Another test group", quota=2, creator=self.user2, school=self.school
        )
        self.announcement1 = Announcement.objects.create(
            publisher=self.user1,
            group=self.group1,
            description="Test announcement 1",
        )
        self.announcement2 = Announcement.objects.create(
            publisher=self.user2,
            group=self.group2,
            description="Test announcement 2",
        )
        UserGroup.objects.create(user=self.user2, group=self.group1)

    def test_get_group_announcements(self):
        response = self.client.get(f'/groups/{self.group1.id}/announcements/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)  # Check if only 1 announcement is returned

    def test_get_member_announcements(self):
        response = self.client.get(f'/groups/member_announcements/{self.user2.id}/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)  # Check if 2 announcements are returned (from both groups)

    def test_group_quota(self):
        # Test that quota is enforced when creating UserGroup
        data = {"user": self.user1.id, "group": self.group2.id}
        response = self.client.post('/usergroups/', data, format='json')
        self.assertEqual(response.status_code, 201)  # Should be able to join

        data = {"user": self.user1.id, "group": self.group1.id}
        response = self.client.post('/usergroups/', data, format='json')
        self.assertEqual(response.status_code, 400)  # Quota reached for group1

    def test_get_group_members(self):
        response = self.client.get(f'/groups/{self.group1.id}/members/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)  # Should include creator and user2