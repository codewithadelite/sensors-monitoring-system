from typing import List

from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.shortcuts import get_object_or_404
from django.utils import timezone

from .models import SensorsData, Device
from .types import SensorsData as SensorsDataType


def get_device(device_id: int) -> Device:
    return get_object_or_404(Device, pk=device_id)


def save_sensor_data(data: SensorsDataType, device: Device) -> SensorsData:
    return SensorsData.objects.create(
        device=device,
        temperature=data.temperature,
        humidity=data.humidity,
        water_level=data.water_level,
        timestamp=data.timestamp,
    )


def get_last_sensors_data() -> SensorsData:
    return SensorsData.objects.all().last()


def get_line_chart_sensors_data() -> List[SensorsData]:
    now = timezone.now()
    one_hour_ago = now - timezone.timedelta(hours=1)
    return SensorsData.objects.all().values(
        "temperature", "humidity", "water_level", "timestamp"
    )[:30]


def publish_metrics_to_websocket_clients(data) -> None:
    chanel_layer = get_channel_layer()
    return async_to_sync(chanel_layer.group_send)(
        "sensors_metrics", {"type": "send_sensors_metrics", "sensors_metrics": data}
    )
