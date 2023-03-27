from rest_framework.views import APIView
from diary_entries.models import PhysicalEntry, MentalEntry
from diary_entries.serializer import PhysicalEntrySerializer, MentalEntrySerializer, UpdatePhysicalEntrySerializer, UpdateMentalEntrySerializer
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from users.models import Patient
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from datetime import datetime


class MentalEntryList(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        manual_parameters=[],
        security=[],
        responses={'200': MentalEntrySerializer})
    def get(self, request):
        mental_entries = MentalEntry.objects.all()
        serializer = MentalEntrySerializer(mental_entries, many=True)
        return Response(serializer.data)

    def get_by_user(self, request, *args, **kwargs):
        pk = self.kwargs.get('pk')
        patient = get_object_or_404(Patient, id=pk)
        mental_entries = MentalEntry.objects.filter(patient = patient)
        serializer = MentalEntrySerializer(mental_entries, many=True)
        return Response(serializer.data)

class MentalEntryPatientList(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema(
        manual_parameters=[],
        security=[],
        responses={'200': MentalEntrySerializer, '404': "El paciente al que busca no existe"})
    def get(self, request, *args, **kwargs):
        pk = self.kwargs.get('pk')
        patient = get_object_or_404(Patient, id=pk)
        mental_entries = MentalEntry.objects.filter(patient = patient).order_by("-date")
        serializer = MentalEntrySerializer(mental_entries, many=True)
        return Response(serializer.data)

class MentalEntryCreate(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        manual_parameters=[],
        security=[],
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT, properties={
                'date': openapi.Schema(type=openapi.TYPE_STRING, description='Fecha del registro de diario, debe seguir el formato YYYY-MM-DD'),
                'state': openapi.Schema(type=openapi.TYPE_STRING, description='Estado mental del paciente, ha de pertenecer al siguiente grupo ("VG", "G", "F", "B", "VB")'),
                'weather': openapi.Schema(type=openapi.TYPE_STRING, description='Tiempo atmosférico, ha de pertenecer al siguiente grupo ("SNOWY", "RAINY", "CLOUDY", "STORMY", "SUNNY")'),
                'food': openapi.Schema(type=openapi.TYPE_STRING, description='Comida consumida durante el dia, ha de pertenecer al siguiente grupo ("NONE", "FAST", "HEALTHY)'),
                'sleep': openapi.Schema(type=openapi.TYPE_STRING, description='Tipo de sueño, ha de pertenecer al siguiente grupo ("NONE", "DEEP", "LIGHT)'),
                'positive_thoughts': openapi.Schema(type=openapi.TYPE_STRING, description='Pensamientos positivos que haya tenido el paciente'),
                'negative_thoughts': openapi.Schema(type=openapi.TYPE_STRING, description='Pensamientos negativos que haya tenido el paciente'),
                'notes': openapi.Schema(type=openapi.TYPE_STRING, description='Notas adicionales'),
                'patient_id': openapi.Schema(type=openapi.TYPE_STRING, description='Id del paciente al que pertenece'),
            }
        ),
        responses={'200': MentalEntrySerializer, "400": "Comprueba que el formato de la fecha sea válido, que el id de usuario exista y que state, weather, food y sleep se encuentren dentro de los valores proporcionados"})
    def post(self, request):
        serializer = MentalEntrySerializer(data = request.data)
        dateToday = datetime.now()
        
        if(serializer.is_valid() and serializer.is_valid()):
            date = serializer.data["date"]
            state = serializer.data["state"]
            weather = serializer.data["weather"]
            food = serializer.data["food"]
            sleep = serializer.data["sleep"]
            positive_thoughts = serializer.data["positive_thoughts"]
            negative_thoughts = serializer.data["negative_thoughts"]
            notes = serializer.data["notes"]
            patient_id = serializer.data["patient_id"]
            fecha_dt = datetime.strptime(date, '%Y-%m-%d')

            patient = get_object_or_404(Patient, id=patient_id)
            patient_diary_entry_list = MentalEntry.objects.filter(patient = patient)
            for entry in patient_diary_entry_list:
                if(str(entry.date) == date):
                    return Response({"error":"Ya existe una entrada de este tipo de diario en esta fecha para este usuario"}, status=status.HTTP_400_BAD_REQUEST)
            if(fecha_dt > dateToday):
                return Response({"error": "La fecha debe ser anterior a la actual"}, status=status.HTTP_400_BAD_REQUEST)

            mental_entry = MentalEntry(date = date, state = state, weather = weather, food = food, sleep = sleep,
                                      positive_thoughts = positive_thoughts, negative_thoughts = negative_thoughts, notes = notes, patient = patient)

            mental_entry.save()
            
            return Response({"mental_entry_id":mental_entry.id, "date":mental_entry.date, "state":mental_entry.state, "weather": mental_entry.weather,
                             "food":mental_entry.food, "sleep":mental_entry.sleep, "positive_thoughts": mental_entry.positive_thoughts,
                             "negative_thoughts": mental_entry.negative_thoughts, "notes":mental_entry.notes, "patient_id":patient.id}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

class MentalEntryId(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_mental_entry_by_pk(self, pk):
        try:
            return MentalEntry.objects.get(id=pk)
        except(AttributeError):
            return Response({"error":"Esa entrada de diario mental no existe"}, status=status.HTTP_404_NOT_FOUND)
    
    @swagger_auto_schema(
        manual_parameters=[],
        security=[],
        responses={'200': MentalEntrySerializer, "404": "Esa entrada de diario mental no existe"})
    def get(self, request, pk):
        mental_entry = self.get_mental_entry_by_pk(pk)
        serializer = MentalEntrySerializer(mental_entry)
        return Response(serializer.data)
    
    @swagger_auto_schema(
        manual_parameters=[],
        security=[],
        responses={'200': "entrada borrada correctamente", "404": "Esa entrada de diario mental no existe"})
    def delete(self, request, pk):
        mental_entry = self.get_mental_entry_by_pk(pk)
        mental_entry.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    @swagger_auto_schema(
        manual_parameters=[],
        security=[],
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT, properties={
                'date': openapi.Schema(type=openapi.TYPE_STRING, description='Fecha del registro de diario a modificar, debe seguir el formato YYYY-MM-DD'),
                'state': openapi.Schema(type=openapi.TYPE_STRING, description='Estado mental del paciente a modificar, ha de pertenecer al siguiente grupo ("VG", "G", "F", "B", "VB")'),
                'weather': openapi.Schema(type=openapi.TYPE_STRING, description='Tiempo atmosférico, a modificar ha de pertenecer al siguiente grupo ("SNOWY", "RAINY", "CLOUDY", "STORMY", "SUNNY")'),
                'food': openapi.Schema(type=openapi.TYPE_STRING, description='Comida consumida durante el dia a modificar, ha de pertenecer al siguiente grupo ("NONE", "FAST", "HEALTHY)'),
                'sleep': openapi.Schema(type=openapi.TYPE_STRING, description='Tipo de sueño a modificar, ha de pertenecer al siguiente grupo ("NONE", "DEEP", "LIGHT)'),
                'positive_thoughts': openapi.Schema(type=openapi.TYPE_STRING, description='Pensamientos positivos que haya tenido el paciente  a modificar'),
                'negative_thoughts': openapi.Schema(type=openapi.TYPE_STRING, description='Pensamientos negativos que haya tenido el paciente  a modificar'),
                'notes': openapi.Schema(type=openapi.TYPE_STRING, description='Notas adicionales  a modificar')
            }
        ),
        responses={'200': MentalEntrySerializer, "400": "Comprueba que el formato de la fecha sea válido y que state, weather, food y sleep se encuentren dentro de los valores proporcionados", "404":"Entrada no encontrada"})
    def put(self, request, *args, **kwargs):
        serializer = UpdateMentalEntrySerializer(data = request.data)     
        pk = self.kwargs.get('pk')
        entry = get_object_or_404(MentalEntry, id=pk)
        dateToday = datetime.today().date()
        if serializer.is_valid():
            fields = serializer.validated_data.items()
            for field in fields:
                key = field[0]
                value = field[1]
                if str(key) == "date":
                    if value > dateToday:
                        return Response({"error": "La fecha debe ser anterior a la actual"}, status=status.HTTP_400_BAD_REQUEST)
                    else:
                        entry.date = value
                if str(key) == "notes":
                    entry.notes = value
                if str(key) == "state":
                    entry.state = value
                if str(key) == "weather":
                    entry.weather = value
                if str(key) == "food":
                    entry.food = value
                if str(key) == "sleep":
                    entry.sleep = value
                if str(key) == "positive_thoughts":
                    entry.positive_thoughts = value
                if str(key) == "negative_thoughts":
                    entry.negative_thoughts = value
            
            entry.save()

            return Response(MentalEntrySerializer(entry).data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class PhysicalEntryList(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        manual_parameters=[],
        security=[],
        responses={'200': PhysicalEntrySerializer})
    def get(self, request):
        physical_entry = PhysicalEntry.objects.all()
        serializer = PhysicalEntrySerializer(physical_entry, many=True)
        return Response(serializer.data)
    
class PhysicalEntryPatientList(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        manual_parameters=[],
        security=[],
        responses={'200': PhysicalEntrySerializer, '404': "El paciente al que busca no existe"})
    def get(self, request, *args, **kwargs):
        pk = self.kwargs.get('pk')
        patient = get_object_or_404(Patient, id=pk)
        physical_entries = PhysicalEntry.objects.filter(patient = patient).order_by("-date")
        serializer = PhysicalEntrySerializer(physical_entries, many=True)
        return Response(serializer.data)


class PhysicalEntryCreate(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        manual_parameters=[],
        security=[],
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT, properties={
                'date': openapi.Schema(type=openapi.TYPE_STRING, description='Fecha del registro de diario, debe seguir el formato YYYY-MM-DD'),
                'state': openapi.Schema(type=openapi.TYPE_STRING, description='Estado mental del paciente, ha de pertenecer al siguiente grupo ("VG", "G", "F", "B", "VB")'),
                'body_parts': openapi.Schema(type=openapi.TYPE_STRING, description='Lista de partes del cuerpo que duelen al paciente, ha de pertenecer al siguiente grupo ("HEAD", "TORSO", "RIGHT_ARM", "LEFT_ARM", "RIGHT_LEG", "LEFT_LEG")'),
                'notes': openapi.Schema(type=openapi.TYPE_STRING, description='Notas adicionales'),
                'patient_id': openapi.Schema(type=openapi.TYPE_STRING, description='Id del paciente al que pertenece'),
                "done_exercise": openapi.Schema(type=openapi.TYPE_BOOLEAN, description='Ha hecho ejercicio'),
            }
        ),
        responses={'200': PhysicalEntrySerializer, "400": "Comprueba que el formato de la fecha sea válido, que el id de usuario exista y que body_parts se encuentren dentro de los valores proporcionados"})
    def post(self, request):
        serializer = PhysicalEntrySerializer(data = request.data)
        dateToday = datetime.now()
        
        if (serializer.is_valid()):
            date = serializer.data["date"]
            state = serializer.data["state"]
            body_parts = serializer.data["body_parts"]
            notes = serializer.data["notes"]
            patient_id = serializer.data["patient_id"]
            done_exercise = serializer.data["done_exercise"]
            fecha_dt = datetime.strptime(date, '%Y-%m-%d')

            patient = get_object_or_404(Patient, id=patient_id)
            patient_diary_entry_list = PhysicalEntry.objects.filter(patient = patient)
            for entry in patient_diary_entry_list:
                if(str(entry.date) == date):
                    return Response({"error":"Ya existe una entrada de este tipo de diario en esta fecha para este usuario"}, status=status.HTTP_400_BAD_REQUEST)
            if(fecha_dt > dateToday):
                return Response({"error": "La fecha debe ser anterior a la actual"}, status=status.HTTP_400_BAD_REQUEST)

            physical_entry = PhysicalEntry(date = date, state = state, body_parts = body_parts, notes = notes, patient = patient, done_exercise=done_exercise)

            physical_entry.save()

            return Response({"physical_entry_id":physical_entry.id, "date":physical_entry.date, "state":physical_entry.state,
                             "notes":physical_entry.notes, "done_exercise": physical_entry.done_exercise, "patient_id":patient.id, "body_parts":physical_entry.body_parts}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

class PhysicalEntryId(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_physical_entry_by_pk(self, pk):
        try:
            return PhysicalEntry.objects.get(id=pk)
        except(AttributeError):
            return Response({"error":"Esa entrada de diario físico no existe"}, status=status.HTTP_404_NOT_FOUND)

    @swagger_auto_schema(
        manual_parameters=[],
        security=[],
        responses={'200': PhysicalEntrySerializer, "404": "Esa entrada de diario físico no existe"})
    def get(self, request, pk):
        physical_entry = self.get_physical_entry_by_pk(pk)
        serializer = PhysicalEntrySerializer(physical_entry)
        return Response(serializer.data)
    
    @swagger_auto_schema(
        manual_parameters=[],
        security=[],
        responses={'200': "Entrada borrada correctamente", "404": "Esa entrada de diario físico no existe"})
    def delete(self, request, pk):
        physical_entry = self.get_physical_entry_by_pk(pk)
        physical_entry.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @swagger_auto_schema(
        manual_parameters=[],
        security=[],
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT, properties={
                'date': openapi.Schema(type=openapi.TYPE_STRING, description='Fecha del registro de diario a modificar, debe seguir el formato YYYY-MM-DD'),
                'state': openapi.Schema(type=openapi.TYPE_STRING, description='Estado mental del paciente a modificar, ha de pertenecer al siguiente grupo ("VG", "G", "F", "B", "VB")'),
                'body_parts': openapi.Schema(type=openapi.TYPE_STRING, description='Lista de partes del cuerpo que duelen al paciente a modificar, ha de pertenecer al siguiente grupo ("HEAD", "TORSO", "RIGHT_ARM", "LEFT_ARM", "RIGHT_LEG", "LEFT_LEG")'),
                'notes': openapi.Schema(type=openapi.TYPE_STRING, description='Notas adicionales a modificar'),
                "done_exercise": openapi.Schema(type=openapi.TYPE_BOOLEAN, description='Ha hecho ejercicio (a modificar)'),
            }
        ),
        responses={'200': PhysicalEntrySerializer, "400": "Comprueba que el formato de la fecha sea válido y que body_parts se encuentren dentro de los valores proporcionados", "404":"Entrada no encontrada"})
    def put(self, request, *args, **kwargs):
        serializer = UpdatePhysicalEntrySerializer(data = request.data)     
        pk = self.kwargs.get('pk')
        entry = get_object_or_404(PhysicalEntry, id=pk)
        dateToday = datetime.today().date()
        if serializer.is_valid():
            fields = serializer.validated_data.items()
            for field in fields:
                key = field[0]
                value = field[1]
                if str(key) == "date":
                    if value > dateToday:
                        return Response({"error": "La fecha debe ser anterior a la actual"}, status=status.HTTP_400_BAD_REQUEST)
                    else:
                        entry.date = value
                if str(key) == "body_parts":
                    entry.body_parts = value
                if str(key) == "notes":
                    entry.notes = value
                if str(key) == "done_exercise":
                    entry.done_exercise = value
                if str(key) == "state":
                    entry.state = value
            
            entry.save()

            return Response(PhysicalEntrySerializer(entry).data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)