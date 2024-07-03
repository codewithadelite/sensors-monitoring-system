import json

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from sms.mqtt import client, MQTT_TOPIC
from .serializers import SensorsDataSerializer, LineChartSensorsDataSerializer
from .utils import get_last_sensors_data, get_line_chart_sensors_data


class SensorDataApiView(APIView):
    serializer_class = SensorsDataSerializer

    def get(self, request):
        try:
            sensors_data = get_last_sensors_data()
            serializer = self.serializer_class(sensors_data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            print(str(e))
            return Response({"error": "Failed, try again."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        try:
            data = json.dumps(request.data)
            rc, mid = client.publish(topic=MQTT_TOPIC, payload=str(data))
            return Response({"message": "Transferred", "code": rc}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": "Failed, try again."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class LineChartSensorDataApiView(APIView):
    serializer_class = LineChartSensorsDataSerializer

    def get(self, request):
        try:
            sensors_data = get_line_chart_sensors_data()
            serializer = self.serializer_class(sensors_data, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({"error": "Failed, try again." + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
