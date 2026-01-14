from rest_framework import permissions
from core.models import Group, Announcement


class IsCreatorOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow creators of a group/announcement to edit it.
    Read permissions are allowed to any authenticated request.
    """
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any authenticated request
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the creator/publisher
        if isinstance(obj, Group):
            return obj.creator.id == request.user.id
        elif isinstance(obj, Announcement):
            return obj.publisher.id == request.user.id
        return False


class IsGroupMemberOrReadOnly(permissions.BasePermission):
    """
    Custom permission to allow group members to create announcements.
    Read permissions are allowed to any authenticated request.
    """
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_authenticated
    
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # For announcements, check if user is a member of the group
        if isinstance(obj, Announcement):
            group = obj.group
            is_creator = group.creator.id == request.user.id
            is_member = group.usergroup_set.filter(user=request.user).exists()
            return is_creator or is_member
        
        return False