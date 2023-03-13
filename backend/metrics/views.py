from metrics.models import Metric, Measure
from users.models import Patient
from django.contrib.auth.models import User
from metrics.serializer import MetricSerializer, MeasureSerializer, CreateSerializerMetric, CreateSerializerMeasure
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

# Views from Metric
class MetricList(APIView):
    def get(self, request):
        metrics = Metric.objects.all()
        serializer = MetricSerializer(metrics, many=True)
        return Response(serializer.data)

class MetricCreate(APIView):
    def post(self, request):
        serializer = CreateSerializerMetric(data = request.data)
        if serializer.is_valid():
            name = serializer.data['name']
            unit = serializer.data['unit']
            min_value = serializer.data['min_value']
            max_value = serializer.data['max_value']

            if Metric.objects.filter(name = name).exists():
                return Response({"error":"Ya existe una metrica con ese nombre"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                metric = Metric(name = name, unit = unit, min_value = min_value, max_value = max_value)
                metric.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MetricId(APIView):
    def get(self, request, *args, **kwargs):
        pk = self.kwargs.get('pk')
        patient = get_object_or_404(Metric, id=pk)
        serializer = MetricSerializer(patient)
        return Response(serializer.data)

    def delete(self, request, *args, **kwargs):
        pk = self.kwargs.get('pk')
        patient = get_object_or_404(Metric, id=pk)
        patient.delete()
        return Response({"message":"Metrica con id: " +str(pk) + " borrado correctamente"}, status=status.HTTP_200_OK)

#Views from Measure
class MeasureList(APIView):
    def get(self, request):
        measures = Measure.objects.all()
        serializer = MeasureSerializer(measures, many=True)
        return Response(serializer.data)

class MeasureCreate(APIView):
    def post(self, request):
        serializer = CreateSerializerMeasure(data = request.data)
        if serializer.is_valid():
                date = serializer.data["date"]
                value = serializer.data["value"]
                metric_id = serializer.data["metric_id"]
                patient_id = serializer.data["patient_id"]

                if not Patient.objects.filter(id = patient_id).exists():
                    return Response({"error":"No existe ningun paciente con ese id"}, status=status.HTTP_400_BAD_REQUEST)
                if not Metric.objects.filter(id = metric_id).exists():
                    return Response({"error":"No existe ninguna metrica con dicho id"}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    patient = get_object_or_404(Patient, id=patient_id)
                    metric = get_object_or_404(Metric, id=metric_id)
                    measure = Measure(date = date, value = value, metric=metric, user=patient)
                    measure.save()
                    return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MeasureId(APIView):
    def get(self, request, *arg, **kwargs):
        pk = self.kwargs.get('pk')
        measeure = get_object_or_404(Measure, id = pk)
        serializer = MeasureSerializer(measeure)
        return Response(serializer.data)

    def delete(self, request, *arg, **kwargs):
        pk = self.kwargs.get('pk')
        measeure = get_object_or_404(Measure, id = pk)
        measeure.delete()
        return Response({"message":"Measure con id: " + str(pk) + " borrado correctamete"}, status=status.HTTP_200_OK)
