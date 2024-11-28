from django.contrib import admin

from core.models import *

# Register your models here.

admin.site.register(User)
admin.site.register(Group)
admin.site.register(Faculty)
admin.site.register(School)
admin.site.register(Announcement)