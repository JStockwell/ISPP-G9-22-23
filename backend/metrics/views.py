from metrics.models import Metric, Measure, MetricInfo
from users.models import Patient
from metrics.serializer import MetricSerializer, MeasureSerializer, CreateSerializerMetric, CreateSerializerMeasure, MetricInfoSerializer, UpdateMetricSerializer, UpdateMeasureSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

# Views from Metric
class MetricList(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema(
            manual_parameters=[],
            security=[],
            responses={'200':MetricSerializer}
    )
    def get(self, request):
        metrics = Metric.objects.all()
        serializer = MetricSerializer(metrics, many=True)
        
        return Response(serializer.data)

class MetricListInfo(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema(
            manual_parameters=[],
            security=[],
            responses={'200':MetricInfoSerializer}
    )
    def get(self, request):
        metrics_info = MetricInfo.objects.all()
        serializer = MetricInfoSerializer(metrics_info, many=True)
        return Response(serializer.data)
    
class NotUsedMetricInfoByPatient(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema(
            manual_parameters=[],
            security=[],
            responses={'200':MetricInfoSerializer, '404': "No se ha encontrado el paciente"}
    )
    def get(self, request, *arg, **kwargs):
        pk = self.kwargs.get('pk')
        patient = get_object_or_404(Patient, id=pk)
        metrics = Metric.objects.filter(patient = patient)
        metrics_info = [metric.info for metric in metrics]
        metrics_info = list(dict.fromkeys(metrics_info))
        all_metrics_info = list(MetricInfo.objects.all())
        serializer = MetricInfoSerializer([x for x in all_metrics_info if x not in metrics_info], many=True)
        return Response(serializer.data)

class MetricCreate(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema(
            manual_parameters=[],
            security=[],
            request_body=openapi.Schema(
                type=openapi.TYPE_OBJECT, properties={
                    'name': openapi.Schema(type=openapi.TYPE_STRING, description="nombre de la métrica, debe ser único"),
                    'unit': openapi.Schema(type=openapi.TYPE_STRING, description="Unidad en la que se mide la métrica"),
                    'min_value': openapi.Schema(type=openapi.TYPE_NUMBER, description="Valor mínimo que puede tomar la métrica en un caso normal"),
                    'max_value': openapi.Schema(type=openapi.TYPE_NUMBER, description="Valor máximo que puede tomar la métrica en un caso normal"),
                    'patient_id': openapi.Schema(type=openapi.TYPE_STRING, description='Id del paciente al que pertenece')
                }
            ),
            responses={'200':MetricSerializer, '400':"Se ha introducido un par min/max value ilegal o el paciente no existe, o la metric info no se ha encontrado"}
    )
    def post(self, request):
        serializer = CreateSerializerMetric(data = request.data)
        if serializer.is_valid():
            name = serializer.data['name']
            unit = serializer.data['unit']
            min_value = serializer.data['min_value']
            max_value = serializer.data['max_value']
            patient_id = serializer.data["patient_id"]

            patient = get_object_or_404(Patient, id=patient_id)

            if min_value > max_value:
                return Response({"error":"El valor mínimo no puede ser mayor que el valor máximo"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                try:
                    metricInfo = MetricInfo.objects.get(name=name, unit=unit)
                except:
                    return Response({"error":"La unidad y el nombre de métrica debe corresponder a alguna info de métrica guardada"}, status=status.HTTP_400_BAD_REQUEST)
                metric = Metric(min_value = min_value, max_value = max_value, patient=patient, info = metricInfo)
                metric.save()
                return Response({"metric_id":metric.id,"name":name,"unit":unit,"min_value":metric.min_value, 
                                 "max_value":metric.max_value,"patient_id":patient.id}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MetricId(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
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
        metric = get_object_or_404(Metric, id=pk)
        metric.delete()
        return Response({"message":"Métrica con id: " +str(pk) + " borrado correctamente"}, status=status.HTTP_200_OK)
    
    @swagger_auto_schema(
            manual_parameters=[],
            security=[],
            request_body=openapi.Schema(
                type=openapi.TYPE_OBJECT, properties={
                    'min_value': openapi.Schema(type=openapi.TYPE_NUMBER, description="Valor mínimo a modificar que puede tomar la métrica en un caso normal"),
                    'max_value': openapi.Schema(type=openapi.TYPE_NUMBER, description="Valor máximo a modificar que puede tomar la métrica en un caso normal"),
                }
            ),
            responses={'200':MetricSerializer, '400':"Se ha introducido un par min/max value ilegal o el paciente no existe, o la metric info no se ha encontrado", "404": "Métrica no encontrada"}
    )
    def put(self, request, *args, **kwargs):
        serializer = UpdateMetricSerializer(data = request.data)
        pk = self.kwargs.get('pk')
        metric = get_object_or_404(Metric, id=pk)
        if serializer.is_valid():
            fields = serializer.validated_data.keys()
            min_value = None
            max_value = None
            for field in fields:
                if str(field) == "min_value":
                    min_value = serializer.validated_data[field]
                if str(field) == "max_value":
                    max_value = serializer.data[field]
            
            if min_value == None:
                min_value = metric.min_value
            if max_value == None:
                max_value = metric.max_value

            if min_value > max_value:
                return Response({"error":"El valor mínimo no puede ser mayor que el valor máximo"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                metric.max_value = max_value
                metric.min_value = min_value
                metric.save()
                return Response({"metric_id":metric.id, "max_value":metric.max_value, "min_value": metric.min_value, "patient_id": metric.patient.id,
                                 "name": metric.info.name, "unit":metric.info.unit}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


#Views from Measure
class MeasureList(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
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
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema(
            manual_parameters=[],
            security=[],
            request_body=openapi.Schema(
                type=openapi.TYPE_OBJECT, properties={
                    'value': openapi.Schema(type=openapi.TYPE_STRING, description="Valor medido para una métrica concreta"),
                    'metric': openapi.Schema(type="foreign key", description="Clave ajena para relacionar la medida con una métrica"),
                    'patient': openapi.Schema(type="foreign key", description="Clave ajena para relacionar la medida con un paciente")
                }
            ),
            responses={'200':MeasureSerializer, '400':"Bad request"}
    )
    def post(self, request):
        serializer = CreateSerializerMeasure(data = request.data)
        if serializer.is_valid():
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
                    measure = Measure(value = value, metric=metric, patient=patient)
                    measure.save()
                    return Response({"measure_id":measure.id,"value":measure.value,"metric_id":metric.id, "patient_id":patient.id}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MeasureId(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
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
    

    @swagger_auto_schema(
            manual_parameters=[],
            security=[],
            request_body=openapi.Schema(
                type=openapi.TYPE_OBJECT, properties={
                    'value': openapi.Schema(type=openapi.TYPE_STRING, description="Valor medido a modificar para una métrica concreta"),
                }
            ),
            responses={'200':MeasureSerializer, '400':"Bad request", "404": "Métrica no encontrada"}
    )
    def put(self, request, *args, **kwargs):
        serializer = UpdateMeasureSerializer(data = request.data)
        pk = self.kwargs.get('pk')
        measure = get_object_or_404(Measure, id=pk)
        if serializer.is_valid():
            measure.value = serializer.validated_data["value"]
            measure.save()
            return Response({"measure_id":measure.id,"value":measure.value,"metric_id":measure.metric.id, "patient_id":measure.patient.id}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MetricPatientId(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema(
            manual_parameters=[],
            security=[],
            responses={'200':MetricSerializer, '404':"Paciente con ese ID no encontrado"}
    )
    def get(self, request, *arg, **kwargs):
        pk = self.kwargs.get('pk')
        patient = get_object_or_404(Patient, id = pk)
        metrics = Metric.objects.filter(patient = patient)
        serializer = MetricSerializer(metrics, many=True)
        return Response(serializer.data)
    
class MeasurePatientId(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema(
            manual_parameters=[],
            security=[],
            responses={'200':MetricSerializer, '404':"Paciente con ese ID no encontrado"}
    )
    def get(self, request, *arg, **kwargs):
        pk = self.kwargs.get('pk')
        patient = get_object_or_404(Patient, id = pk)
        measures = Measure.objects.filter(patient = patient).order_by("-date")
        serializer = MeasureSerializer(measures, many=True)
        return Response(serializer.data)
    
    
    
class LatestMeasurePatientIdMetricId(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema(
            manual_parameters=[],
            security=[],
            responses={'200':MetricSerializer, '404':"Paciente o métrica con ese ID no encontrado"}
    )
    def get(self, request, *arg, **kwargs):
        patient_pk = self.kwargs.get('patient_pk')
        metric_pk = self.kwargs.get("metric_pk")
        patient = get_object_or_404(Patient, id = patient_pk)
        metric = get_object_or_404(Metric, id = metric_pk)
        measures = Measure.objects.filter(patient = patient, metric = metric).order_by("-date")[:10]
        serializer = MeasureSerializer(measures, many=True)
        return Response(serializer.data)