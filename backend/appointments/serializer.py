from rest_framework import serializers
from appointments.models import Appointment

class UpdateAppointmentSerializer(serializers.Serializer):
    date = serializers.DateField(required=False)
    description = serializers.CharField(required = False, max_length=300)
    specialty = serializers.CharField(required = False, max_length=100)
    time = serializers.TimeField(required = False)

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = "__all__"

class SerializerCreateAppointment(serializers.Serializer):
    date = serializers.DateField()
    description = serializers.CharField(max_length=300)
    specialty = serializers.CharField(max_length=100)
    time = serializers.TimeField()
    patient_id = serializers.FloatField()
