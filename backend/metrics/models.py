from django.db import models
from django.core.exceptions import ValidationError
from users.models import Patient

class MetricInfo(models.Model):
    name = models.CharField(unique=False, max_length=50)
    unit = models.CharField(max_length=10)

    def __str__(self):
        return self.name

class Metric(models.Model):
    min_value = models.FloatField()
    max_value = models.FloatField()
    favorite = models.BooleanField(default=False)
    info = models.ForeignKey(MetricInfo, on_delete=models.CASCADE, related_name="info")
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)

    def clean(self):
        if self.max_value <= self.min_value:
            raise ValidationError({'max_value': 'Valor máximo debe ser mayor que valor mínimo.'})
    
    def __str__(self):
        return self.info.name 

class Measure(models.Model):
    date = models.DateTimeField(auto_now=True)
    value = models.FloatField()
    metric = models.ForeignKey(Metric, on_delete=models.CASCADE)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.value) + " " + self.metric.unit 

