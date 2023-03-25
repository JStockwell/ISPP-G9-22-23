from django.shortcuts import render
from appointments.models import Appointment
from users.models import Patient
from appointments.serializer import AppointmentSerializer, SerializerCreateAppointment 
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.shortcuts import get_object_or_404
from datetime import datetime

class AppointmentList(APIView):
    def get(self, request):
        appointments = Appointment.objects.all()
        serializer = AppointmentSerializer(appointments, many=True)
        return Response(serializer.data)
    
class AppointmentCreate(APIView):
    def post(self, request):
        serializer = SerializerCreateAppointment(data = request.data)
        dateToday = datetime.now()
        
        if serializer.is_valid():
            date = serializer.data["date"]
            description = serializer.data["description"]
            specialty = serializer.data["specialty"]
            time = serializer.data["time"]
            patient_id = serializer.data["patient_id"]
            fecha_dt = datetime.strptime(date, '%Y-%m-%d')

            if not Patient.objects.filter(id = patient_id).exists():
                return Response({"error": "No existe ningun paciente con ese id"}, status=status.HTTP_400_BAD_REQUEST)
            if fecha_dt < dateToday:
                 return Response({"error": "No se puede coger cita con fecha anterior a la actual"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                patient = get_object_or_404(Patient, id=patient_id)
                appointment = Appointment(date = date, description = description, specialty = specialty, time = time, patient = patient)
                appointment.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class AppointmentId(APIView):
    def get(self, request, *arg, **kwargs):
        pk = self.kwargs.get('pk')
        appointment = get_object_or_404(Appointment, id=pk)
        serializer = AppointmentSerializer(appointment)
        return Response(serializer.data)
    
    def delete(self, request, *arg, **kwargs):
        pk = self.kwargs.get('pk')
        appointment = get_object_or_404(Appointment, id = pk)
        appointment.delete()
        return Response({"message":"Cita con id: " + str(pk) + " borrado correctamente"}, status=status.HTTP_200_OK)
    
class AppointmentPatientId(APIView):
    def get(self, request, *arg, **kwargs):
        pk = self.kwargs.get('pk')
        patient = get_object_or_404(Patient, id = pk)
        appointment = Appointment.objects.filter(patient = patient)
        serializer = AppointmentSerializer(appointment, many=True)
        return Response(serializer.data)