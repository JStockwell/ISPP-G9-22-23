from rest_framework import serializers
from diary_entries.models import PhysicalEntry, MentalEntry

class PhysicalEntrySerializer(serializers.ModelSerializer):
    body_parts = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = PhysicalEntry
        fields = "__all__"


class MentalEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = MentalEntry
        fields = "__all__"