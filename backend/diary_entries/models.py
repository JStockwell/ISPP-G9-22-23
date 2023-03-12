from django.db import models
from enum import Enum
from django.utils.translation import gettext_lazy as _


class State(models.TextChoices):
    VERY_BAD = "VB", _("Very bad"),
    BAD = "B", _("Bad"),
    FAIR = "F", _("Fair"),
    GOOD = "G", _("Good"),
    VERY_GOOD = "VG", _("Very Good"),

class BodyParts(models.TextChoices):
    HEAD = "HEAD", _("Head"),
    TORSO = "TORSO", _("Torso"),
    LEFT_ARM = "LEFT_ARM", _("Left arm"),
    RIGHT_ARM = "RIGHT_ARM", _("Right arm"),
    LEFT_LEG = "LEFT_LEG", _("Left leg"),
    RIGHT_LEG = "RIGHT_LEG", _("Right leg")

class Sleep(models.TextChoices):
    NONE = "NONE", _("No sleep"),
    LIGHT = "LIGHT", _("Light sleep"),
    DEEP = "DEEP", _("Deep sleep")

class Food(models.TextChoices):
    NONE = "NONE", _("Did not eat"),
    FAST = "FAST", _("Fast food"),
    HEALTHY = "HEALTHY", _("Healthy food")

class Weather(models.TextChoices):
    SUNNY = "SUNNY", _("Sunny"),
    CLOUDY = "CLOUDY", _("Cloudy"),
    RAINY = "RAINY", _("Rainy"),
    SNOWY = "SNOWY", _("Snowy"),
    THUNDER = "THUNDER", _("Thunder")


class DiaryEntry(models.Model):
    state = models.CharField(choices=State.choices, max_length=15)
    notes = models.TextField(max_length=500)
    date = models.DateField()

    def __str__(self):
        return str(self.state) + " " + str(self.date)


class BodyPart(models.Model):
    name = models.CharField(choices=BodyParts.choices, primary_key=True, max_length=15)
    
 
class PhysicalEntry(DiaryEntry):
    body_parts = models.ManyToManyField(BodyPart) #, validators=[validate_unique_body_parts])


class MentalEntry(DiaryEntry):
    sleep = models.CharField(choices=Sleep.choices, max_length=15)
    food = models.CharField(choices=Food.choices, max_length=15)
    weather = models.CharField(choices=Weather.choices, max_length=15)
    positive_thoughts = models.TextField(max_length=500)
    negative_thoughts = models.TextField(max_length=500)


'''
def validate_unique_body_parts(value):
    """
    Validator function to ensure that only one value of each ranking type is allowed.
    """
    bparts = set()
    for bpart in value:
        if bpart in bparts:
            raise ValidationError(f"Selección duplicada: {bpart}")
        bparts.add(bpart)
'''