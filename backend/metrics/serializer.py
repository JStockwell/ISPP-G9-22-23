from rest_framework import serializers
from metrics.models import Metric, Measure
from users.serializers import PatientSerializer

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