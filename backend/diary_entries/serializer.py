from django.forms import ValidationError
from rest_framework import serializers
from diary_entries.models import PhysicalEntry, MentalEntry

class UpdatePhysicalEntrySerializer(serializers.Serializer):
    body_parts = serializers.CharField(required = False, max_length=1024, allow_blank=True)
    notes = serializers.CharField(required = False, max_length=1024, allow_blank=True)
    done_exercise = serializers.BooleanField(required = False)
    date = serializers.DateField(required = False)
    state = serializers.CharField(required = False)

    def validate_state(self, value):
        if (value != None):
            accepted_values = {"VG", "G", "F", "B", "VB"}
            if value not in accepted_values:
                raise ValidationError("Elige estados válidos (VG, G, F, B, VB)")
            return value

    def validate_body_parts(self, value):
        if (value != None):
            accepted_values = {"", "HEAD", "NECK", "SHOULDER", "HIGHER_BACK", "LOWER_BACK", "ARM", "ELBOW", "WRIST", "HAND", "TORSO", "LEG", "KNEE", "ANKLE", "FOOT"}
            already_used_values = []
            splitted = value.split(",")
            for part in splitted:
                if (part.strip() in accepted_values and part.strip() not in already_used_values):
                    already_used_values.append(part.strip())
                elif (part.strip() in accepted_values and part.strip() in already_used_values):
                    raise ValidationError("Recuerda no repetir partes del cuerpo")
                else:
                    raise ValidationError("Elige partes del cuerpo válidas (HEAD, NECK, SHOULDER, HIGHER_BACK, LOWER_BACK, TORSO, ARM, ELBOW, WRIST, HAND, LEG, KNEE, ANKLE, FOOT)")
            return value

class PhysicalEntrySerializer(serializers.ModelSerializer):
    body_parts = serializers.CharField(required = False, default = "", max_length=1024)
    notes = serializers.CharField(required = False, default = "", max_length=1024)
    done_exercise = serializers.BooleanField(required = False, default = False)
    patient_id=serializers.IntegerField()

    class Meta:
        model = PhysicalEntry
        fields = ['id', 'date', 'state', 'body_parts', 'notes', "patient_id", "done_exercise"]


    def validate_body_parts(self, value):
        accepted_values = {"", "HEAD", "NECK", "SHOULDER", "HIGHER_BACK", "LOWER_BACK", "ARM", "ELBOW", "WRIST", "HAND", "TORSO", "LEG", "KNEE", "ANKLE", "FOOT"}
        already_used_values = []
        splitted = value.split(",")
        for part in splitted:
            if (part.strip() in accepted_values and part.strip() not in already_used_values):
                already_used_values.append(part.strip())
            elif (part.strip() in accepted_values and part.strip() in already_used_values):
                raise ValidationError("Recuerda no repetir partes del cuerpo")
            else:
                raise ValidationError("Elige partes del cuerpo válidas (HEAD, NECK, SHOULDER, HIGHER_BACK, LOWER_BACK, TORSO, ARM, ELBOW, WRIST, HAND, LEG, KNEE, ANKLE, FOOT)")
        return value
    
class UpdateMentalEntrySerializer(serializers.Serializer):
    weather = serializers.CharField(max_length=64, required = False)
    food = serializers.CharField(max_length=64, required = False)
    sleep = serializers.CharField(max_length=64, required = False)
    notes = serializers.CharField(required = False, max_length=1024, allow_blank=True)
    positive_thoughts = serializers.CharField(required = False, max_length=1024, allow_blank=True)
    negative_thoughts = serializers.CharField(required = False, max_length=1024, allow_blank=True)
    state = serializers.CharField(required = False)
    date = serializers.DateField(required = False)
    

    def validate_state(self, value):
        if (value != None):
            accepted_values = {"VG", "G", "F", "B", "VB"}
            if value not in accepted_values:
                raise ValidationError("Elige estados válidos (VG, G, F, B, VB)")
            return value

    def validate_weather(self, value):
        accepted_values = {"SNOWY", "RAINY", "CLOUDY", "STORMY", "SUNNY"}
        if value in accepted_values:
            return value
        else:
            raise ValidationError("Elige un tiempo atmosférico válido (SNOWY, RAINY, CLOUDY, STORMY, SUNNY)")

    def validate_food(self, value):
        accepted_values = {"NONE", "NORMAL", "FAST", "HEALTHY"}
        if value in accepted_values:
            return value
        else:
            raise ValidationError("Elige un tipo de comida válido (NONE, NORMAL, FAST, HEALTHY)")
        
    def validate_sleep(self, value):
        accepted_values = {"NONE", "LIGHT", "NORMAL", "DEEP"}
        if value in accepted_values:
            return value
        else:
            raise ValidationError("Elige una cantidad de sueño válida (NONE, LIGHT, NORMAL, DEEP)")

class MentalEntrySerializer(serializers.ModelSerializer):
    weather = serializers.CharField(max_length=64)
    food = serializers.CharField(max_length=64)
    sleep = serializers.CharField(max_length=64)
    notes = serializers.CharField(required = False, default = "", max_length=1024)
    positive_thoughts = serializers.CharField(required = False, default = "", max_length=1024)
    negative_thoughts = serializers.CharField(required = False, default = "", max_length=1024)
    patient_id=serializers.IntegerField()
    class Meta:
        model = MentalEntry
        fields = ['id', 'date', 'state', 'notes', 'weather', 'food', 'sleep', 'positive_thoughts', 'negative_thoughts', "patient_id"]

    def validate_weather(self, value):
        accepted_values = {"SNOWY", "RAINY", "CLOUDY", "STORMY", "SUNNY"}
        if value in accepted_values:
            return value
        else:
            raise ValidationError("Elige un tiempo atmosférico válido (SNOWY, RAINY, CLOUDY, STORMY, SUNNY)")

    def validate_food(self, value):
        accepted_values = {"NONE", "NORMAL", "FAST", "HEALTHY"}
        if value in accepted_values:
            return value
        else:
            raise ValidationError("Elige un tipo de comida válido (NONE, NORMAL, FAST, HEALTHY)")
        
    def validate_sleep(self, value):
        accepted_values = {"NONE", "LIGHT", "NORMAL", "DEEP"}
        if value in accepted_values:
            return value
        else:
            raise ValidationError("Elige una cantidad de sueño válida (NONE, LIGHT, NORMAL, DEEP)")