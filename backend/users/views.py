from rest_framework.views import APIView
from users.models import Patient, Medic
from users.serializer import PatientSerializer, MedicSerializer, CreateSerializer, UpdateUserSerializer
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate
from datetime import datetime

class PatientList(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema(
        manual_parameters=[],
        security=[],
        responses={'200': PatientSerializer})
    def get(self, request):
        patients = Patient.objects.all()
        serializer = PatientSerializer(patients, many=True)
        return Response(serializer.data)

class PatientCreate(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [AllowAny]
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
        responses={'200': "Token e id del paciente", "400": "Ya existe un usuario con ese nombre de usuario o email o la fecha de nacimiento es incorrecta"})
    def post(self, request):
        serializer = CreateSerializer(data = request.data)
        dateToday = datetime.now()
        
        if serializer.is_valid():
            tel = serializer.data["tel"]
            birthdate = serializer.data["birthdate"]
            password = serializer.data["password"]
            first_name = serializer.data["first_name"]
            last_name = serializer.data["last_name"]
            username = serializer.data["username"]
            email = serializer.data["email"]
            fecha_dt = datetime.strptime(birthdate, '%Y-%m-%d')

            if(User.objects.filter(username = username).exists()):
                return Response({"error":"Ya existe un usuario con ese nombre de usuario"}, status=status.HTTP_400_BAD_REQUEST)
            if(User.objects.filter(email = email).exists()):
                return Response({"error":"Ya existe un usuario con ese email"}, status=status.HTTP_400_BAD_REQUEST)
            if fecha_dt > dateToday:
                return Response({"error": "La fecha de nacimiento debe ser anterior a la actual"}, status=status.HTTP_400_BAD_REQUEST)
            
            user = User(username = username, email = email, first_name = first_name, last_name = last_name)
            user.set_password(password)
            patient = Patient(tel=tel, birthdate=birthdate)

            user.save()
            patient.user = user
            patient.save()

            token, _ = Token.objects.get_or_create(user=user)

            return Response({"token":token.key, "patient id": patient.id}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

class PatientId(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
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
    
    @swagger_auto_schema(
        manual_parameters=[],
        security=[],
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT, properties={
                'first_name': openapi.Schema(type=openapi.TYPE_STRING, description='Nombre a modificar, máximo 150 caracteres'),
                'last_name': openapi.Schema(type=openapi.TYPE_STRING, description='Apellidos a modificar, máximo 150 caracteres'),
                'tel': openapi.Schema(type=openapi.TYPE_STRING, description='Teléfono a modificar'),
                'birthdate': openapi.Schema(type=openapi.TYPE_STRING, description='Fecha de nacimiento a modificar, formato YYYY-MM-DD'),
                'premium_account': openapi.Schema(type=openapi.TYPE_BOOLEAN, description='Status de cuenta a modificar'),
            }
        ),
        responses={'200': PatientSerializer, "400": "Ya existe un usuario con ese nombre de usuario o email o la fecha de nacimiento es posterior a la fecha actual", "404": "Paciente no encontrado"})
    def put(self, request, *args, **kwargs):
        serializer = UpdateUserSerializer(data = request.data)
        pk = self.kwargs.get('pk')
        patient = get_object_or_404(Patient, id=pk)
        user = patient.user
        dateToday = datetime.today().date()
        if serializer.is_valid():
            fields = serializer.validated_data.items()
            for field in fields:
                key = field[0]
                value = field[1]
                if str(key) == "tel": 
                    patient.tel = value
                if str(key) == "birthdate":
                    if(value > dateToday):
                        return Response({"error": "La fecha de nacimiento debe ser anterior a la actual"}, status=status.HTTP_400_BAD_REQUEST)
                    else:
                        patient.birthdate = value
                if str(key) == "first_name":
                    user.first_name  = value
                if str(key) == "last_name":
                    user.last_name  = value
                if str(key) == "premium_account": 
                    patient.premium_account = value
            
            user.save()
            patient.save()

            return Response(PatientSerializer(patient).data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MedicList(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema(
        manual_parameters=[],
        security=[],
        responses={'200': MedicSerializer})
    def get(self, request):
        medics = Medic.objects.all()
        serializer = MedicSerializer(medics, many=True)
        return Response(serializer.data)


class MedicCreate(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [AllowAny]
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
        responses={'200': "Token e id del médico", "400": "Ya existe un usuario con ese nombre de usuario o email o la fecha de nacimiento es incorrecta"})
    def post(self, request):
        serializer = CreateSerializer(data = request.data)
        dateToday = datetime.now()
        
        if serializer.is_valid():
            tel = serializer.data["tel"]
            birthdate = serializer.data["birthdate"]
            password = serializer.data["password"]
            first_name = serializer.data["first_name"]
            last_name = serializer.data["last_name"]
            username = serializer.data["username"]
            email = serializer.data["email"]
            fecha_dt = datetime.strptime(birthdate, '%Y-%m-%d')

            if(User.objects.filter(username = username).exists()):
                return Response({"error":"Ya existe un usuario con ese nombre de usuario"}, status=status.HTTP_400_BAD_REQUEST)
            if(User.objects.filter(email = email).exists()):
                return Response({"error":"Ya existe un usuario con ese email"}, status=status.HTTP_400_BAD_REQUEST)
            if(fecha_dt > dateToday):
                return Response({"error": "La fecha de nacimiento debe ser anterior a la actual"}, status=status.HTTP_400_BAD_REQUEST)
            
            user = User(username = username, email = email, first_name = first_name, last_name = last_name)
            user.set_password(password)
            medic = Medic(tel=tel, birthdate=birthdate)

            user.save()
            medic.user = user
            medic.save()

            token, _ = Token.objects.get_or_create(user=user)

            return Response({"token":token.key, "medic id": medic.id}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

class MedicId(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
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
    
    @swagger_auto_schema(
        manual_parameters=[],
        security=[],
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT, properties={
                'first_name': openapi.Schema(type=openapi.TYPE_STRING, description='Nombre a modificar, máximo 150 caracteres'),
                'last_name': openapi.Schema(type=openapi.TYPE_STRING, description='Apellidos a modificar, máximo 150 caracteres'),
                'tel': openapi.Schema(type=openapi.TYPE_STRING, description='Teléfono a modificar'),
                'birthdate': openapi.Schema(type=openapi.TYPE_STRING, description='Fecha de nacimiento a modificar, formato YYYY-MM-DD'),
                'premium_account': openapi.Schema(type=openapi.TYPE_BOOLEAN, description='Status de cuenta a modificar'),
            }
        ),
        responses={'200': MedicSerializer, "400": "Ya existe un usuario con ese nombre de usuario o email o la fecha de nacimiento es posterior a la fecha actual", "404":"Médico no encontrado"})
    def put(self, request, *args, **kwargs):
        serializer = UpdateUserSerializer(data = request.data)
        pk = self.kwargs.get('pk')
        medic = get_object_or_404(Medic, id=pk)
        user = medic.user
        dateToday = datetime.today().date()
        if serializer.is_valid():
            fields = serializer.validated_data.items()
            for field in fields:
                key = field[0]
                value = field[1]
                if str(key) == "tel": 
                    medic.tel = value
                if str(key) == "birthdate":
                    if(value > dateToday):
                        return Response({"error": "La fecha de nacimiento debe ser anterior a la actual"}, status=status.HTTP_400_BAD_REQUEST)
                    else:
                        medic.birthdate = value
                if str(key) == "first_name":
                    user.first_name  = value
                if str(key) == "last_name":
                    user.last_name  = value
                if str(key) == "premium_account": 
                    medic.premium_account = value
            
            user.save()
            medic.save()

            return Response(MedicSerializer(medic).data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class LoginView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [AllowAny]
    @swagger_auto_schema(
        manual_parameters=[],
        security=[],
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT, properties={
                'username': openapi.Schema(type=openapi.TYPE_STRING, description='Nombre de usuario, no debe existir previamente'),
                'password': openapi.Schema(type=openapi.TYPE_STRING, description='Contraseña')
            }
        ),
        responses={'200': "Token e id del médico", "401": "Credenciales inválidos"})
    def post(self, request, format=None):
        # Get the username and password from the request data
        username = request.data.get('username')
        password = request.data.get('password')

        # Authenticate the user using Django's built-in authentication
        user = authenticate(request, username=username, password=password)

        # If authentication fails, return an error response
        if not user:
            return Response({'error': 'Credenciales inválidos'}, status=status.HTTP_401_UNAUTHORIZED)

        # If authentication succeeds, create a new token or retrieve an existing one
        token, _ = Token.objects.get_or_create(user=user)


        try:
            patient = Patient.objects.get(user_id=user.id)
        except Patient.DoesNotExist:
            medic = Medic.objects.get(user_id=user.id)
            # Return the token as a response
            return Response({'token': token.key, "medic id":medic.id})
        
        return Response({'token': token.key, "patient id":patient.id})
        
class LogoutView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema(
        manual_parameters=[],
        security=[],
        responses={'200': "Sesión cerrada"})

    def get(self, request):
        request.user.auth_token.delete()
        return Response({'message': 'Sesión cerrada'},status=status.HTTP_200_OK)
    
class AssignationPatients(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        manual_parameters=[],
        security=[],
        responses={'200': "Asignación creada", "400":"Esa asignación ya existe", "404": "Médico o paciente no encontrado"})
    def post(self, request, *args, **kwargs):
        medic_id = self.kwargs.get('pk_medic')
        medic = get_object_or_404(Medic, id=medic_id)
        code = self.kwargs.get('code')
        patient = get_object_or_404(Patient, code=code)

        if(medic.patients.contains(patient)):
           return Response({'error': 'Esa asignación ya existe'},status=status.HTTP_400_BAD_REQUEST)
        medic.patients.add(patient)
        medic.save()
        return Response({'message': 'Nueva asignación creada'},status=status.HTTP_200_OK)

    @swagger_auto_schema(
        manual_parameters=[],
        security=[],
        responses={'200': "Asignación borrada", "400":"Esa asignación no existe", "404": "Médico o paciente no encontrado"})
    def delete(self, request, *args, **kwargs):
        medic_id = self.kwargs.get('pk_medic')
        medic = get_object_or_404(Medic, id=medic_id)
        code = self.kwargs.get('code')
        patient = get_object_or_404(Patient, code=code)

        if(medic.patients.contains(patient)):
            medic.patients.remove(patient)
            medic.save()
            return Response({'message': 'Relación borrada'},status=status.HTTP_200_OK)
        return Response({'message': 'Esa relación no existe'},status=status.HTTP_400_BAD_REQUEST)
    

class PatientsOfMedic(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema(
        manual_parameters=[],
        security=[],
        responses={'200': PatientSerializer, "404": "Médico o paciente no encontrado"})
    def get(self, request, *args, **kwargs):
        medic_id = self.kwargs.get('pk_medic')
        medic = get_object_or_404(Medic, id=medic_id)
        patients = medic.patients.all()
        serializer = PatientSerializer(patients, many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)