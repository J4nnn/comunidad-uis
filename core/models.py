from django.db import models

# Create your models here.

# These are the tables in the database, the ID is created automatically

class Faculty(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return f'Facultad de {self.name}'

class School(models.Model):
    name = models.CharField(max_length=100)
    faculty = models.ForeignKey(Faculty, on_delete=models.CASCADE)

    def __str__(self):
        return f'Escuela de {self.name}'

class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    password = models.CharField(max_length=100)
    school = models.ForeignKey(School, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.name}'

class Group(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    schedule = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=100)
    quota = models.IntegerField(blank=True, null=True)
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    school = models.ForeignKey(School, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return f'{self.name}'

class UserGroup(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.user.name} - {self.group.name}'

class Announcement(models.Model):
    publisher = models.ForeignKey(User, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    cover = models.ImageField()
    description = models.TextField()
    creation_date = models.DateTimeField()
    expiration_date = models.DateTimeField()

    def __str__(self):
        return f'{self.publisher} - {self.group}'
