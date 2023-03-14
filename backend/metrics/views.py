from metrics.models import Metric, Measure
from users.models import Patient
from django.contrib.auth.models import User
from metrics.serializer import MetricSerializer, MeasureSerializer, CreateSerializerMetric, CreateSerializerMeasure, CreateSerializerMeasureListNameFromUser, SerializerMetricName
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from drf_yasg.utils import swagger_auto_schema
from drf_yasg.openapi import Parameter
from drf_yasg import openapi

# Views from Metric
class MetricList(APIView):
    @swagger_auto_schema(
            manual_parameters=[],
            security=[],
            responses={'200':MetricSerializer}
    )
    def get(self, request):
        metrics = Metric.objects.all()
        serializer = MetricSerializer(metrics, many=True)
        return Response(serializer.data)

class MetricListName(APIView):
    def get(self, request):
        metrics = Metric.objects.all().order_by('name')
        serializer = SerializerMetricName(metrics, many=True)
        return Response(serializer.data)

class MetricCreate(APIView):
    @swagger_auto_schema(
            manual_parameters=[],
            security=[],
            request_body=openapi.Schema(
                type=openapi.TYPE_OBJECT, properties={
                    'name': openapi.Schema(type=openapi.TYPE_STRING, description="nombre de la métrica, debe ser único"),
                    'unit': openapi.Schema(type=openapi.TYPE_STRING, description="Unidad en la que se mide la métrica"),
                    'min_value': openapi.Schema(type=openapi.TYPE_NUMBER, description="Valor mínimo que puede tomar la métrica en un caso normal"),
                    'max_value': openapi.Schema(type=openapi.TYPE_NUMBER, description="Valor máximo que puede tomar la métrica en un caso normal")
                }
            ),
            responses={'200':MetricSerializer, '400':"Ya existe una métrica con ese nombre, o se ha introducido un par min/max value ilegal"}
    )
    def post(self, request):
        serializer = CreateSerializerMetric(data = request.data)
        if serializer.is_valid():
            name = serializer.data['name']
            unit = serializer.data['unit']
            min_value = serializer.data['min_value']
            max_value = serializer.data['max_value']

            if Metric.objects.filter(name = name).exists():
                return Response({"error":"Ya existe una métrica con ese nombre"}, status=status.HTTP_400_BAD_REQUEST)
            if min_value > max_value:
                return Response({"error":"El valor mínimo no puede ser mayor que el valor máximo"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                metric = Metric(name = name, unit = unit, min_value = min_value, max_value = max_value)
                metric.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MetricId(APIView):
    @swagger_auto_schema(
            manual_parameters=[],
            security=[],
            responses={'200':MetricSerializer, '404':"Métrica con ese ID no encontrada"}
    )
    def get(self, request, *args, **kwargs):
        pk = self.kwargs.get('pk')
        metric = get_object_or_404(Metric, id=pk)
        serializer = MetricSerializer(metric)
        return Response(serializer.data)

    @swagger_auto_schema(
            manual_parameters=[],
            security=[],
            responses={'200':"Métrica borrada correctamente", '404':"Métrica con ese ID no encontrada"}
    )
    def delete(self, request, *args, **kwargs):
        pk = self.kwargs.get('pk')
        patient = get_object_or_404(Metric, id=pk)
        patient.delete()
        return Response({"message":"Métrica con id: " +str(pk) + " borrado correctamente"}, status=status.HTTP_200_OK)

#Views from Measure
class MeasureList(APIView):
    @swagger_auto_schema(
            manual_parameters=[],
            security=[],
            responses={'200':MeasureSerializer}
    )
    def get(self, request):
        measures = Measure.objects.all()
        serializer = MeasureSerializer(measures, many=True)
        return Response(serializer.data)

class MeasureCreate(APIView):
    @swagger_auto_schema(
            manual_parameters=[],
            security=[],
            request_body=openapi.Schema(
                type=openapi.TYPE_OBJECT, properties={
                    'date': openapi.Schema(type=openapi.TYPE_STRING, description="Fecha en la que se realiza la medida"),
                    'value': openapi.Schema(type=openapi.TYPE_STRING, description="Valor medido para una métrica concreta"),
                    'metric': openapi.Schema(type="foreign key", description="Clave ajena para relacionar la medida con una métrica"),
                    'user': openapi.Schema(type="foreign key", description="Clave ajena para relacionar la medida con un paciente")
                }
            ),
            responses={'200':MeasureSerializer, '400':"Bad request"}
    )
    def post(self, request):
        serializer = CreateSerializerMeasure(data = request.data)
        if serializer.is_valid():
                #date = serializer.data["date"]
                value = serializer.data["value"]
                metric_id = serializer.data["metric_id"]
                patient_id = serializer.data["patient_id"]

                if not Patient.objects.filter(id = patient_id).exists():
                    return Response({"error":"No existe ningun paciente con ese id"}, status=status.HTTP_400_BAD_REQUEST)
                if not Metric.objects.filter(id = metric_id).exists():
                    return Response({"error":"No existe ninguna métrica con dicho id"}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    patient = get_object_or_404(Patient, id=patient_id)
                    metric = get_object_or_404(Metric, id=metric_id)
                    measure = Measure(value = value, metric=metric, user=patient)
                    measure.save()
                    return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MeasureId(APIView):
    @swagger_auto_schema(
            manual_parameters=[],
            security=[],
            responses={'200':MeasureSerializer, '404':"Medida con ese ID no encontrada"}
    )
    def get(self, request, *arg, **kwargs):
        pk = self.kwargs.get('pk')
        measeure = get_object_or_404(Measure, id = pk)
        serializer = MeasureSerializer(measeure)
        return Response(serializer.data)

    @swagger_auto_schema(
        manual_parameters=[],
        security=[],
        responses={'200':"Medida borrada correctamente", '404':"Medida con ese ID no encontrada"}
    )
    def delete(self, request, *arg, **kwargs):
        pk = self.kwargs.get('pk')
        measeure = get_object_or_404(Measure, id = pk)
        measeure.delete()
        return Response({"message":"Medida con id: " + str(pk) + " borrado correctamete"}, status=status.HTTP_200_OK)

class MeasureLatestByUser(APIView):
    def get(self, request, *arg, **kwargs):
        mesasures = Measure.objects.all()
        pk = self.kwargs.get('pk')
        patient = get_object_or_404(Patient, id = pk)
        measuresListByPatient = Measure.objects.filter(user = patient)
        measuresListByPatientOrder = sorted(measuresListByPatient, key=lambda measure : measure.date)
        measures = measuresListByPatientOrder[:10]
        serializer = MeasureSerializer(measures, many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)