from rest_framework.views import APIView
from users.models import Patient, Medic
from users.serializer import PatientSerializer, MedicSerializer, CreateSerializer
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from drf_yasg.utils import swagger_auto_schema
from drf_yasg.openapi import Parameter
from drf_yasg import openapi

class PatientList(APIView):
    @swagger_auto_schema(
        manual_parameters=[],
        security=[],
        responses={'200': PatientSerializer})
    def get(self, request):
        patients = Patient.objects.all()
        serializer = PatientSerializer(patients, many=True)
        return Response(serializer.data)


class PatientCreate(APIView):
    @swagger_auto_schema(
        manual_parameters=[],
        security=[],
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT, properties={
                'username': openapi.Schema(type=openapi.TYPE_STRING, description='Nombre de usuario, no debe existir previamente'),
                'password': openapi.Schema(type=openapi.TYPE_STRING, description='Contraseña'),
                'first_name': openapi.Schema(type=openapi.TYPE_STRING, description='Nombre, máximo 150 caracteres'),
                'last_name': openapi.Schema(type=openapi.TYPE_STRING, description='Apellidos, máximo 150 caracteres'),
                'email': openapi.Schema(type=openapi.TYPE_STRING, description='Email, no debe existir previamente'),
                'tel': openapi.Schema(type=openapi.TYPE_STRING, description='Teléfono'),
                'birthdate': openapi.Schema(type=openapi.TYPE_STRING, description='Fecha de nacimiento, formato YYYY-MM-DD'),
            }
        ),
        responses={'200': PatientSerializer, "400": "Ya existe un usuario con ese nombre de usuario o email"})
    def post(self, request):
        serializer = CreateSerializer(data = request.data)
        
        if serializer.is_valid():
            tel = serializer.data["tel"]
            birthdate = serializer.data["birthdate"]
            password = serializer.data["password"]
            first_name = serializer.data["first_name"]
            last_name = serializer.data["last_name"]
            username = serializer.data["username"]
            email = serializer.data["email"]

            if(User.objects.filter(username = username).exists()):
                return Response({"error":"Ya existe un usuario con ese nombre de usuario"}, status=status.HTTP_400_BAD_REQUEST)
            elif(User.objects.filter(email = email).exists()):
                return Response({"error":"Ya existe un usuario con ese email"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                user = User(username = username, email = email, first_name = first_name, last_name = last_name)
                user.set_password(password)
                patient = Patient(tel=tel, birthdate=birthdate)

                user.save()
                patient.user = user
                patient.save()

                return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

class PatientId(APIView):
    @swagger_auto_schema(
        manual_parameters=[],
        security=[],
        responses={'200': PatientSerializer, "404": "Paciente con ese ID no encontrado"})
    def get(self, request, *args, **kwargs):
        pk = self.kwargs.get('pk')
        patient = get_object_or_404(Patient, id=pk)
        serializer = PatientSerializer(patient)
        return Response(serializer.data)
    
    @swagger_auto_schema(
        manual_parameters=[],
        security=[],
        responses={'200': "Paciente borrado correctamente", "404": "Paciente con ese ID no encontrado"})
    def delete(self, request, *args, **kwargs):
        pk = self.kwargs.get('pk')
        patient = get_object_or_404(Patient, id=pk)
        patient.delete()
        return Response({"message":"Paciente con id: " +str(pk) +" borrado correctamente"}, status=status.HTTP_200_OK)


class MedicList(APIView):
    @swagger_auto_schema(
        manual_parameters=[],
        security=[],
        responses={'200': MedicSerializer})
    def get(self, request):
        medics = Medic.objects.all()
        serializer = MedicSerializer(medics, many=True)
        return Response(serializer.data)


class MedicCreate(APIView):
    @swagger_auto_schema(
        manual_parameters=[],
        security=[],
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT, properties={
                'username': openapi.Schema(type=openapi.TYPE_STRING, description='Nombre de usuario, no debe existir previamente'),
                'password': openapi.Schema(type=openapi.TYPE_STRING, description='Contraseña'),
                'first_name': openapi.Schema(type=openapi.TYPE_STRING, description='Nombre, máximo 150 caracteres'),
                'last_name': openapi.Schema(type=openapi.TYPE_STRING, description='Apellidos, máximo 150 caracteres'),
                'email': openapi.Schema(type=openapi.TYPE_STRING, description='Email, no debe existir previamente'),
                'tel': openapi.Schema(type=openapi.TYPE_STRING, description='Teléfono'),
                'birthdate': openapi.Schema(type=openapi.TYPE_STRING, description='Fecha de nacimiento, formato YYYY-MM-DD'),
            }
        ),
        responses={'200': MedicSerializer, "400": "Ya existe un usuario con ese nombre de usuario o email"})
    def post(self, request):
        serializer = CreateSerializer(data = request.data)
        
        if serializer.is_valid():
            tel = serializer.data["tel"]
            birthdate = serializer.data["birthdate"]
            password = serializer.data["password"]
            first_name = serializer.data["first_name"]
            last_name = serializer.data["last_name"]
            username = serializer.data["username"]
            email = serializer.data["email"]

            if(User.objects.filter(username = username).exists()):
                return Response({"error":"Ya existe un usuario con ese nombre de usuario"}, status=status.HTTP_400_BAD_REQUEST)
            elif(User.objects.filter(email = email).exists()):
                return Response({"error":"Ya existe un usuario con ese email"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                user = User(username = username, email = email, first_name = first_name, last_name = last_name)
                user.set_password(password)
                medic = Medic(tel=tel, birthdate=birthdate)

                user.save()
                medic.user = user
                medic.save()

                return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

class MedicId(APIView):
    @swagger_auto_schema(
        manual_parameters=[],
        security=[],
        responses={'200': MedicSerializer, "404": "Médico con ese ID no encontrado"})
    def get(self, request, *args, **kwargs):
        pk = self.kwargs.get('pk')
        medic = get_object_or_404(Medic, id=pk)
        serializer = MedicSerializer(medic)
        return Response(serializer.data)
    
    @swagger_auto_schema(
        manual_parameters=[],
        security=[],
        responses={'200': "Médico borrado correctamente", "404": "Médico con ese ID no encontrado"})
    def delete(self, request, *args, **kwargs):
        pk = self.kwargs.get('pk')
        medic = get_object_or_404(Medic, id=pk)
        medic.delete()
        return Response({"message":"Médico con id: " +str(pk) +" borrado correctamente"}, status=status.HTTP_200_OK)

