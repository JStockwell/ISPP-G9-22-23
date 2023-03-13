from rest_framework import serializers
from metrics.models import Metric, Measure
from users.models import Patient
from users.serializer import PatientSerializer

class CreateSerializerMeasureListNameFromUser(serializers.Serializer):
    id = serializers.IntegerField()

class SerializerMetricName(serializers.ModelSerializer):
    class Meta:
        model = Metric
        fields = ["name"]
    #name = serializers.CharField(max_length=50)

class CreateSerializerMetric(serializers.Serializer):
    name = serializers.CharField(max_length=50)
    unit = serializers.CharField(max_length=100)
    min_value = serializers.FloatField()
    max_value = serializers.FloatField()

class CreateSerializerMeasure(serializers.Serializer):
    #date = serializers.DateTimeField(format = "%Y-%m-%d %H:%M:%S", input_formats=['%Y-%m-%d %H:%M:%S'])
    value = serializers.FloatField()
    metric_id = serializers.IntegerField()
    patient_id = serializers.IntegerField()

class MetricSerializer(serializers.ModelSerializer):
    class Meta:
        model = Metric
        fields = "__all__"

class MeasureSerializer(serializers.ModelSerializer):
    metric = MetricSerializer(many=False)
    user = PatientSerializer(many=False)

    class Meta:
        model = Measure
        fields = "__all__"