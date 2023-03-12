from django.forms import ValidationError
from rest_framework import serializers
from diary_entries.models import PhysicalEntry, MentalEntry
from django.contrib.auth.models import User



class CreateSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    date = serializers.DateField()
    state = serializers.CharField(max_length=64)
    notes = serializers.CharField(max_length=1024)
    

class PhysicalEntrySerializer(serializers.ModelSerializer):
    body_parts = serializers.CharField(max_length=1024)

    class Meta:
        model = PhysicalEntry
        fields = ['id', 'date', 'state', 'body_parts', 'notes']


    def validate_body_parts(self, value):
        accepted_values = {"HEAD", "TORSO", "LEFT_ARM", "RIGHT_ARM", "LEFT_LEG", "RIGHT_LEG"}
        already_used_values = []
        splitted = value.split(",")
        for part in splitted:
            if (part.strip() in accepted_values and part.strip() not in already_used_values):
                already_used_values.append(part.strip())
            elif (part.strip() in accepted_values and part.strip() in already_used_values):
                raise ValidationError("Recuerda no repetir partes del cuerpo")
            else:
                raise ValidationError("Elige partes del cuerpo válidas (HEAD, TORSO, LEFT_ARM, RIGHT_ARM, LEFT_LEG, RIGHT_LEG)")
        return value


class MentalEntrySerializer(serializers.ModelSerializer):

    weather = serializers.CharField(max_length=64)
    food = serializers.CharField(max_length=64)
    sleep = serializers.CharField(max_length=64)
    positive_thoughts = serializers.CharField(max_length=1024)
    negative_thoughts = serializers.CharField(max_length=1024)
    class Meta:
        model = MentalEntry
        fields = ['id', 'date', 'state', 'notes', 'weather', 'food', 'sleep', 'positive_thoughts', 'negative_thoughts']

    def validate_weather(self, value):
        accepted_values = {"SNOWY", "RAINY", "CLOUDY", "STORMY", "SUNNY"}
        if value in accepted_values:
            return value
        else:
            raise ValidationError("Elige un tiempo atmosférico válido (SNOWY, RAINY, CLOUDY, STORMY, SUNNY)")

    def validate_food(self, value):
        accepted_values = {"NONE", "FAST", "HEALTHY"}
        if value in accepted_values:
            return value
        else:
            raise ValidationError("Elige un tipo de comida válido (NONE, FAST, HEALTHY)")
        
    def validate_sleep(self, value):
        accepted_values = {"NONE", "LIGHT", "DEEP"}
        if value in accepted_values:
            return value
        else:
            raise ValidationError("Elige una cantidad de sueño válida (NONE, LIGHT, DEEP)")