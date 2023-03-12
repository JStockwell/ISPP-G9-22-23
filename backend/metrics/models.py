from django.db import models
from django.core.exceptions import ValidationError
from users.models import Patient

class Metric(models.Model):
    name = models.CharField(unique=True, max_length=50)
    unit = models.CharField(max_length=10)
    min_value = models.FloatField()
    max_value = models.FloatField()

    def clean(self):
        if self.max_value <= self.min_value:
            raise ValidationError({'max_value': 'Valor máximo debe ser mayor que valor mínimo.'})
    
    def __str__(self):
        return self.name

class Measure(models.Model):
    date = models.DateTimeField()
    value = models.FloatField()
    metric = models.ForeignKey(Metric, on_delete=models.CASCADE)
    user = models.ForeignKey(Patient, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.value) + " " + self.metric.unit 

