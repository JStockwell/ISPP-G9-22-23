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
        return Response({"message":"Metrica con id: " +str(pk) + "borrado correctamente"}, status=status.HTTP_200_OK)

#Views from Measure
class MeasureList(APIView):
    def get(self, request):
        measures = Measure.objects.all()
        serializer = MeasureSerializer(measures, many=True)
        return Response(serializer.data)

class MeasureCreate(APIView):
    def get_patient_by_tlf(self):
           tlf= self.kwargs.get("tlf")
           return get_object_or_404(Patient, tel=tlf)

    def get_metric_by_name(self):
           metricName= self.kwargs.get("name")
           return get_object_or_404(Metric, name=metricName)

    def post(self, request):
        serializer = CreateSerializerMeasure(data = request.data)
        if serializer.is_valid():
                date = serializer.data["date"]
                value = serializer.data["value"]
                metricName = serializer.data["metricName"]
                tlf = serializer.data['tlf'] #tlf con el que se identifica al paciente

                if not Patient.objects.filter(tel = tlf).exists():
                    return Response({"error":"No existe ningun paciente con ese telefono"}, status=status.HTTP_400_BAD_REQUEST)
                if not Metric.objects.filter(name = metricName).exists():
                    return Response({"error":"No existe ninguna metrica con dicho nombre"}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    #print("encuentra patient y metric")
                    patient = Patient.objects.get(tel=tlf)
                    metric = Metric.objects.get(name=metricName)
                    #print(patient.tel)
                    measeure = Measure(date = date, value = value), 
                    #measeure = Measure(date = date, value = value, name=metric.name, unit=metric.unit, min_value=metric.min_value, max_value=metric.max_value, username=patient.username, password), 
                    measeure.user = patient
                    measeure.save()
                    #metric = Metric.objects.get(name=metricName)
                    #print(metric.name)
                    measeure.metric = metric
                    measeure.save()
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
        return Response({"message":"Measeure con id: " + str(pk) + "borrado correctamete"}, status=status.HTTP_200_OK)
