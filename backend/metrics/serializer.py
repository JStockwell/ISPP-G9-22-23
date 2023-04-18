from rest_framework import serializers
from metrics.models import Metric, Measure, MetricInfo

class UpdateMeasureSerializer(serializers.Serializer):
    value = serializers.FloatField()

class UpdateMetricSerializer(serializers.Serializer):
    min_value = serializers.FloatField(required=False)
    max_value = serializers.FloatField(required=False)
    favorite = serializers.BooleanField(required=False)

class CreateSerializerMetric(serializers.Serializer):
    name = serializers.CharField(max_length=50)
    unit = serializers.CharField(max_length=100)
    min_value = serializers.FloatField()
    max_value = serializers.FloatField()
    patient_id = serializers.FloatField()

class CreateSerializerMeasure(serializers.Serializer):
    value = serializers.FloatField()
    metric_id = serializers.IntegerField()
    patient_id = serializers.IntegerField()

class MetricInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MetricInfo
        fields = ["id", "name", "unit"]

class MetricSerializer(serializers.ModelSerializer):
    info = MetricInfoSerializer(read_only=True)
    patient_id = serializers.FloatField()
    class Meta:
        model = Metric
        fields = ['id', 'min_value', 'max_value', 'info', 'patient_id', 'favorite']

class MeasureSerializer(serializers.ModelSerializer):
    metric = MetricSerializer()
    patient_id = serializers.FloatField()

    class Meta:
        model = Measure
        fields = ["id","date","value","metric","patient_id"]

