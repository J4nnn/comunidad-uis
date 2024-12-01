from rest_framework import viewsets, permissions, status
from core.serializer import *
from core.models import *
from rest_framework.response import Response
from rest_framework.decorators import action
from core.permissions import IsCreatorOrReadOnly

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

    @action(detail=False, methods=['get'], url_path='subscribed/(?P<user_id>[^/.]+)')
    def subscribed(self, request, user_id = None):
        # user_id = request.query_params.get('user_id')
        if not user_id:
            return Response({"error": "user_id is required"}, status=400)

        groups = Group.objects.filter(usergroup__user=user_id)
        serializer = GroupSerializer(groups, many=True)
        return Response(serializer.data)

    # permission_classes = [IsCreatorOrReadOnly]

class UserGroupView(viewsets.ModelViewSet):
    serializer_class = UserGroupSerializer
    queryset = UserGroup.objects.all()

class AnnouncementView(viewsets.ModelViewSet):
    serializer_class = AnnouncementSerializer
    queryset = Announcement.objects.all()
    # permission_classes = [IsCreatorOrReadOnly]