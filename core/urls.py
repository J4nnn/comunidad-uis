from rest_framework import routers
from django.urls import path, include
from core.views import *
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView

router = routers.DefaultRouter()
router.register(r'users', UserView)
router.register(r'faculties', FacultyView)
router.register(r'schools', SchoolView)
router.register(r'groups', GroupView)
router.register(r'announcements', AnnouncementView)

urlpatterns = [
    path('', include(router.urls)),

    ### DOCUMENTATION ###
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    # Optional UI:
    path('schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('schema/redoc/', SpectacularRedocView.as_view(url_name='schema'),
         name='redoc'),
]