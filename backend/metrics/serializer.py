from rest_framework import serializers
from metrics.models import Metric, Measure
from users.serializer import PatientSerializer

class CreateSerializerMetric(serializers.Serializer):
    name = serializers.CharField(max_length=50)
    unit = serializers.CharField(max_length=100)
    min_value = serializers.FloatField()
    max_value = serializers.FloatField()

class CreateSerializerMeasure(serializers.Serializer):
    date = serializers.DateField()
    value = serializers.FloatField()
    metricName = serializers.CharField(max_length=50)
    tlf = serializers.CharField(max_length=20)

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