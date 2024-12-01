from rest_framework import permissions
from core.models import Group, Announcement

class IsCreatorOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow creators of a group to edit it.
    """
    def has_object_permission(self, request, view, obj):
        print("Object:", obj)
        print("Query Params:", request.query_params)
        # Read permissions are allowed to any request,
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the creator of the group.
        if isinstance(obj, Group):
            return obj.creator.id == int(request.query_params.get('user_id'))
        elif isinstance(obj, Announcement):
            return obj.publisher.id == int(request.query_params.get('user_id'))
        return False