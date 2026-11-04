from rest_framework.permissions import BasePermission

class RolePermission(BasePermission):
    allowed_roles = []

    def has_permission(self, request, view):
        user = request.user
        if not user or not user.is_authenticated:
            return False
        role = getattr(user, 'role', None)
        if view.action in ['list', 'retrieve']:
            return True
        if role == 'ADMIN':
            return True
        return role in getattr(view, 'allowed_roles', self.allowed_roles)
