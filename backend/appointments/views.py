from django.shortcuts import render
from appointments.models import Appointment
from users.models import Patient
from appointments.serializer import AppointmentSerializer, SerializerCreateAppointment, UpdateAppointmentSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from datetime import datetime



class AppointmentList(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema(
            manual_parameters=[],
            security=[],
            responses={'200':AppointmentSerializer}
    )
    def get(self, request):
        appointments = Appointment.objects.all()
        serializer = AppointmentSerializer(appointments, many=True)
        return Response(serializer.data)
    
class AppointmentCreate(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema(
            manual_parameters=[],
            security=[],
            request_body=openapi.Schema(
                type=openapi.TYPE_OBJECT, properties={
                    'date': openapi.Schema(type=openapi.TYPE_STRING, description="La fecha debe ser posterior a la actual, su formato es yyy-mm-dd"),
                    'description': openapi.Schema(type=openapi.TYPE_STRING, description="Descripción de la cita"),
                    'specialty': openapi.Schema(type=openapi.TYPE_NUMBER, description="Especialidad de la cita"),
                    'time': openapi.Schema(type=openapi.TYPE_STRING, description="Hora de la cita, su formato es HH:MM"),
                    'patient_id': openapi.Schema(type=openapi.TYPE_STRING, description='Id del paciente al que pertenece')
                }
            ),
            responses={'200':AppointmentSerializer, '400':"Se ha introducido una fecha anterior a la actual o no existe un paciente con ese id"}
    )
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
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema(
            manual_parameters=[],
            security=[],
            responses={'200':AppointmentSerializer, '404':"Cita con ese ID no encontrada"}
    )
    def get(self, request, *arg, **kwargs):
        pk = self.kwargs.get('pk')
        appointment = get_object_or_404(Appointment, id=pk)
        serializer = AppointmentSerializer(appointment)
        return Response(serializer.data)
    
    @swagger_auto_schema(
            manual_parameters=[],
            security=[],
            responses={'200':"Cita borrada correctamente", '404':"Cita con ese ID no encontrada"}
    )
    def delete(self, request, *arg, **kwargs):
        pk = self.kwargs.get('pk')
        appointment = get_object_or_404(Appointment, id = pk)
        appointment.delete()
        return Response({"message":"Cita con id: " + str(pk) + " borrado correctamente"}, status=status.HTTP_200_OK)
    
    @swagger_auto_schema(
            manual_parameters=[],
            security=[],
            request_body=openapi.Schema(
                type=openapi.TYPE_OBJECT, properties={
                    'date': openapi.Schema(type=openapi.TYPE_STRING, description="La fecha a modificar debe ser posterior a la actual, su formato es yyy-mm-dd"),
                    'description': openapi.Schema(type=openapi.TYPE_STRING, description="Descripción a modificar de la cita"),
                    'specialty': openapi.Schema(type=openapi.TYPE_NUMBER, description="Especialidad a modificar de la cita"),
                    'time': openapi.Schema(type=openapi.TYPE_STRING, description="Hora a modificar de la cita, su formato es HH:MM")
                }
            ),
            responses={'200':AppointmentSerializer, '400':"Bad request o fecha anterior a la fecha actual", "404":"Cita no encontrada"}
    )
    def put(self, request, *args, **kwargs):
        serializer = UpdateAppointmentSerializer(data = request.data)
        pk = self.kwargs.get('pk')
        appointment = get_object_or_404(Appointment, id=pk)
        dateToday = datetime.today().date()
        if serializer.is_valid():
            fields = serializer.validated_data.items()
            for field in fields:
                key = field[0]
                value = field[1]
                if str(key) == "date":
                    if value < dateToday:
                        return Response({"error": "No se puede coger cita con fecha anterior a la actual"}, status=status.HTTP_400_BAD_REQUEST)
                    else:
                        appointment.date = value
                if str(key) == "description":
                    appointment.description = value
                if str(key) == "specialty":
                    appointment.specialty = value
                if str(key) == "time":
                    appointment.time = value
            
            appointment.save()

            return Response(AppointmentSerializer(appointment).data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class AppointmentPatientId(APIView):
    @swagger_auto_schema(
            manual_parameters=[],
            security=[],
            responses={'200':AppointmentSerializer, '404':"Citasno encontradas para ese paciente"}
    )
    def get(self, request, *arg, **kwargs):
        pk = self.kwargs.get('pk')
        patient = get_object_or_404(Patient, id = pk)
        appointment = Appointment.objects.filter(patient = patient)
        serializer = AppointmentSerializer(appointment, many=True)
        return Response(serializer.data)