from rest_framework import serializers
from users.models import Patient, Medic, Profile
from django.contrib.auth.models import User

class UpdateUserSerializer(serializers.Serializer):
    tel = serializers.CharField(required = False,max_length=20)
    birthdate = serializers.DateField(required = False)
    first_name = serializers.CharField(required = False,max_length=128)
    last_name = serializers.CharField(required = False,max_length=128)
    premium_account = serializers.BooleanField(required = False)
    share_physical_entries = serializers.BooleanField(default=False)
    share_mental_entries = serializers.BooleanField(default=False)
    share_metrics = serializers.BooleanField(default=False)
    share_appointments = serializers.BooleanField(default=False)

class CreateSerializer(serializers.Serializer):
    email = serializers.EmailField()
    tel = serializers.CharField(max_length=20)
    birthdate = serializers.DateField()
    password = serializers.CharField(max_length=128)
    first_name = serializers.CharField(max_length=128)
    last_name = serializers.CharField(max_length=128)
    username = serializers.CharField(max_length=128)

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = "__all__"
        depth = 2

class MedicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medic
        fields = "__all__"
        depth=2