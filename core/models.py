from django.db import models

# Create your models here.

# These are the tables in the database, the ID is created automatically

class Faculty(models.Model):
    name = models.CharField(max_length=100)

class School(models.Model):
    name = models.CharField(max_length=100)
    faculty = models.ForeignKey(Faculty, on_delete=models.CASCADE)

class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    password = models.CharField(max_length=100)
    school = models.ForeignKey(School, on_delete=models.CASCADE)

class Group(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    schedule = models.TextField()
    location = models.CharField(max_length=100)
    quota = models.IntegerField()
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    school = models.ForeignKey(School, on_delete=models.CASCADE)

class UserGroup(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)

class Announcement(models.Model):
    publisher = models.ForeignKey(User, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    cover = models.ImageField()
    description = models.TextField()
    creation_date = models.DateTimeField()
    expiration_date = models.DateTimeField()
