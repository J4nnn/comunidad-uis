from django.db import models
from django.contrib.auth.hashers import make_password, check_password

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
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)  # Increased for hashed passwords
    school = models.ForeignKey(School, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.name}'
    
    def set_password(self, raw_password):
        """Hash and set the password."""
        self.password = make_password(raw_password)
    
    def check_password(self, raw_password):
        """Check if the provided password matches the hashed password."""
        return check_password(raw_password, self.password)

class Group(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    schedule = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=100)
    quota = models.IntegerField(blank=True, null=True)
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    school = models.ForeignKey(School, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return f'{self.name} - {self.creator}'

class UserGroup(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.user.name} - {self.group.name}'

class Announcement(models.Model):
    publisher = models.ForeignKey(User, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    description = models.TextField()
    creation_date = models.CharField()
    expiration_date = models.CharField()

    def __str__(self):
        return f'{self.publisher} - {self.group}'
