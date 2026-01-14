from rest_framework import routers
from django.urls import path, include
from core.views import *
from core.auth_views import register, login
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView
from rest_framework_simplejwt.views import TokenRefreshView

router = routers.DefaultRouter()
router.register(r'users', UserView)
router.register(r'faculties', FacultyView)
router.register(r'schools', SchoolView)
router.register(r'groups', GroupView)
router.register(r'announcements', AnnouncementView)
router.register(r'usergroups', UserGroupView)

urlpatterns = [
    path('', include(router.urls)),

    ### AUTHENTICATION ###
    path('auth/register/', register, name='register'),
    path('auth/login/', login, name='login'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    ### DOCUMENTATION ###
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    # Optional UI:
    path('schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('schema/redoc/', SpectacularRedocView.as_view(url_name='schema'),
         name='redoc'),
]