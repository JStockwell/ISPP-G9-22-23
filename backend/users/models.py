from django.db import models
from django.contrib.auth.models import User
import random
import string

def generate_random_code():
    characters = string.ascii_uppercase + string.ascii_lowercase + string.digits
    code = ''.join(random.choices(characters, k=6))
    
    while Patient.objects.filter(code=code).exists():
        code = ''.join(random.choices(characters, k=6))
    return code


#User: username, password, email, first_name, last_name
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    tel = models.CharField(max_length=20)
    birthdate = models.DateField()
    premium_account = models.BooleanField(default=False)

    class Meta:
        app_label="users"

    def __str__(self):
        return "Usuario con email " + str(self.user.email)

class Patient(Profile):
    code = models.CharField(max_length=6, default=generate_random_code, unique=True, editable=False)

    class Meta:
        app_label="users"

class Medic(Profile):
    patients = models.ManyToManyField(Patient, blank=True)

    class Meta:
        app_label="users"
