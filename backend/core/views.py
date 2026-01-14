from rest_framework import viewsets, permissions, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from core.serializer import *
from core.models import *
from core.permissions import IsCreatorOrReadOnly, IsGroupMemberOrReadOnly
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Q

# Create your views here.

class FacultyView(viewsets.ModelViewSet):
    """ViewSet for managing faculties."""
    serializer_class = FacultySerializer
    queryset = Faculty.objects.all()
    permission_classes = [IsAuthenticated]

class SchoolView(viewsets.ModelViewSet):
    """ViewSet for managing schools."""
    serializer_class = SchoolSerializer
    queryset = School.objects.all()
    permission_classes = [IsAuthenticated]

class UserView(viewsets.ModelViewSet):
    """ViewSet for managing users."""
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]
    
    def get_permissions(self):
        """Allow anyone to register (POST), but require auth for other operations."""
        if self.action == 'create':
            return [AllowAny()]
        return [IsAuthenticated()]

class GroupView(viewsets.ModelViewSet):
    """ViewSet for managing groups."""
    serializer_class = GroupSerializer
    queryset = Group.objects.all()
    permission_classes = [IsAuthenticated, IsCreatorOrReadOnly]

    def perform_create(self, serializer):
        """Set the creator to the current authenticated user."""
        serializer.save(creator=self.request.user)

    @action(detail=False, methods=['get'])
    def subscribed(self, request):
        """Get groups that the current user is subscribed to."""
        groups = Group.objects.filter(usergroup__user=request.user)
        serializer = GroupSerializer(groups, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def members(self, request, pk=None):
        """Get all members of a group (including creator)."""
        group = self.get_object()
        # Get members (from UserGroup) and the creator
        members = User.objects.filter(Q(usergroup__group=group) | Q(pk=group.creator.id))
        serializer = UserSerializer(members, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def announcements(self, request, pk=None):
        """Get all announcements for a group."""
        group = self.get_object()
        announcements = Announcement.objects.filter(group=group)
        serializer = AnnouncementSerializer(announcements, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def member_announcements(self, request):
        """Get announcements from all groups the current user is a member of."""
        announcements = Announcement.objects.filter(group__usergroup__user=request.user)
        serializer = AnnouncementSerializer(announcements, many=True)
        return Response(serializer.data)

class UserGroupView(viewsets.ModelViewSet):
    """ViewSet for managing user-group memberships."""
    serializer_class = UserGroupSerializer
    queryset = UserGroup.objects.all()
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        """Set the user to the current authenticated user."""
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        """Create a new user-group membership with quota validation."""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        group_id = serializer.validated_data['group'].id
        group = Group.objects.get(pk=group_id)

        # Check if user is already a member
        if UserGroup.objects.filter(user=request.user, group=group).exists():
            return Response(
                {"error": "Ya eres miembro de este grupo"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Check quota
        if group.quota is not None and (group.usergroup_set.count()) >= group.quota:
            return Response(
                {"error": "Límite de miembros alcanzado"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Set the user to the authenticated user
        serializer.save(user=request.user)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class AnnouncementView(viewsets.ModelViewSet):
    """ViewSet for managing announcements."""
    serializer_class = AnnouncementSerializer
    queryset = Announcement.objects.all()
    permission_classes = [IsAuthenticated, IsGroupMemberOrReadOnly]

    def perform_create(self, serializer):
        """Set the publisher to the current authenticated user."""
        serializer.save(publisher=self.request.user)