from rest_framework import viewsets, permissions
from core.serializer import *
from core.models import *

# Create your views here.

class FacultyView(viewsets.ModelViewSet):
    serializer_class = FacultySerializer
    queryset = Faculty.objects.all()

class SchoolView(viewsets.ModelViewSet):
    serializer_class = SchoolSerializer
    queryset = School.objects.all()
class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

class GroupView(viewsets.ModelViewSet):
    serializer_class = GroupSerializer
    queryset = Group.objects.all()

class AnnouncementView(viewsets.ModelViewSet):
    serializer_class = AnnouncementSerializer
    queryset = Announcement.objects.all()