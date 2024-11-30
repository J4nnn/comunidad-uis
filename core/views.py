from rest_framework import viewsets, permissions, status
from core.serializer import *
from core.models import *
from rest_framework.response import Response
from rest_framework.decorators import action

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

    '''@action(detail=True, methods=['post', 'delete'])
    def subscribe(self, request, pk=None):
        group = self.get_object()
        user = request.user

        if request.method == 'POST':
            serializer = UserGroupSerializer(data={'user': user.pk, 'group': group.pk})
            if serializer.is_valid():
                serializer.save()
                return Response({'mensaje': 'Te has suscrito a grupo'}, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        elif request.method == 'DELETE':
            try:
                user_group = UserGroup.objects.get(user=user, group=group)
                user_group.delete()
                return Response({'mensaje': 'Te has desuscrito de este grupo'}, status=status.HTTP_204_NO_CONTENT)
            except UserGroup.DoesNotExist:
                return Response({'mensaje': 'No estás suscrito a este grupo'}, status=status.HTTP_400_BAD_REQUEST)'''

    @action(detail=False, methods=['get'])
    def subscribed(self, request):
        user_id = request.query_params.get('user_id')
        if not user_id:
            return Response({"error": "user_id is required"}, status=400)

        groups = Group.objects.filter(usergroup__user=user_id)
        serializer = GroupSerializer(groups, many=True)
        return Response(serializer.data)

class UserGroupView(viewsets.ModelViewSet):
    serializer_class = UserGroupSerializer
    queryset = UserGroup.objects.all()

class AnnouncementView(viewsets.ModelViewSet):
    serializer_class = AnnouncementSerializer
    queryset = Announcement.objects.all()