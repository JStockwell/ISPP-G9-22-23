from django.db import models
from django.core.exceptions import ValidationError
from users.models import Patient

class Appointment(models.Model):
    date = models.DateTimeField()
    description = models.CharField(max_length=300)
    specialty = models.CharField(max_length=100)
    time = models.DateField()
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)

    
    def __str__(self):
        return "Cita del paciente: " + self.patient + " en la especialidad: " + self.specialty