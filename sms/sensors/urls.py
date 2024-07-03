from django.urls import path

from .views import SensorDataApiView, LineChartSensorDataApiView

urlpatterns = [
    path("metrics/", SensorDataApiView.as_view(), name="metrics"),
    path("analytics/sensor-data/", LineChartSensorDataApiView.as_view(), name="line_chart_sensors_data")
]
