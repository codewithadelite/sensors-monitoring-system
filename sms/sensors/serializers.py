from rest_framework import serializers

from .models import SensorsData


class SensorsDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = SensorsData
        fields = ("temperature", "humidity", "water_level")


class LineChartSensorsDataSerializer(serializers.ModelSerializer):
    timestamp = serializers.SerializerMethodField()

    class Meta:
        model = SensorsData
        fields = ("temperature", "humidity", "water_level", "timestamp")

    def get_timestamp(self, obj):
        return obj["timestamp"].strftime('%H:%M:%S')  # Format timestamp to only show minutes and seconds
