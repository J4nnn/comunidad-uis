from rest_framework import viewsets, permissions, status
from core.serializer import *
from core.models import *
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Q

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
    @action(detail=True, methods=['get'])
    def members(self, request, pk=None):
        group = self.get_object()

        # Get members (from UserGroup) and the creator
        members = User.objects.filter(Q(usergroup__group=group) | Q(pk=group.creator.id))

        serializer = UserSerializer(members, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def announcements(self, request, pk=None):
        group = self.get_object()
        announcements = Announcement.objects.filter(group=group)
        serializer = AnnouncementSerializer(announcements, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='member_announcements/(?P<user_id>[^/.]+)')
    def member_announcements(self, request, user_id=None):
        announcements = Announcement.objects.filter(group__usergroup__user=user_id)
        serializer = AnnouncementSerializer(announcements, many=True)
        return Response(serializer.data)

class UserGroupView(viewsets.ModelViewSet):
    serializer_class = UserGroupSerializer
    queryset = UserGroup.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        group_id = serializer.validated_data['group'].id
        group = Group.objects.get(pk=group_id)

        if group.quota is not None and (group.usergroup_set.count()) >= group.quota:
            return Response({"error": "Límite de miembros alcanzado"}, status=status.HTTP_400_BAD_REQUEST)

        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class AnnouncementView(viewsets.ModelViewSet):
    serializer_class = AnnouncementSerializer
    queryset = Announcement.objects.all()
    # permission_classes = [IsCreatorOrReadOnly]