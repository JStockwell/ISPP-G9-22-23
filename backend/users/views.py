from rest_framework.views import APIView
from users.models import Patient, Medic
from users.serializer import PatientSerializer, MedicSerializer, CreateSerializer
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404


class PatientList(APIView):
    def get(self, request):
        patients = Patient.objects.all()
        serializer = PatientSerializer(patients, many=True)
        return Response(serializer.data)


class PatientCreate(APIView):
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
    def get(self, request, *args, **kwargs):
        pk = self.kwargs.get('pk')
        patient = get_object_or_404(Patient, id=pk)
        serializer = PatientSerializer(patient)
        return Response(serializer.data)
    
    def delete(self, request, *args, **kwargs):
        pk = self.kwargs.get('pk')
        patient = get_object_or_404(Patient, id=pk)
        patient.delete()
        return Response({"message":"Paciente con id: " +str(pk) +" borrado correctamente"}, status=status.HTTP_200_OK)


class MedicList(APIView):
    def get(self, request):
        medics = Medic.objects.all()
        serializer = MedicSerializer(medics, many=True)
        return Response(serializer.data)


class MedicCreate(APIView):
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
    def get(self, request, *args, **kwargs):
        pk = self.kwargs.get('pk')
        medic = get_object_or_404(Medic, id=pk)
        serializer = MedicSerializer(medic)
        return Response(serializer.data)
    
    def delete(self, request, *args, **kwargs):
        pk = self.kwargs.get('pk')
        medic = get_object_or_404(Medic, id=pk)
        medic.delete()
        return Response({"message":"Médico con id: " +str(pk) +" borrado correctamente"}, status=status.HTTP_200_OK)

