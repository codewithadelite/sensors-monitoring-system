import pytest
from django.http import Http404
from django.utils import timezone

from ..types import SensorsData
from ..utils import get_device, save_sensor_data


@pytest.mark.django_db
def test_can_get_device(device):
    # Given
    device_id = device.id

    # When
    device_obj = get_device(device_id)

    # Then
    assert device_obj.id == device.id
    assert device_obj.name == device.name
    assert device_obj.block == device.block


@pytest.mark.django_db
def test_get_device_can_raise_not_found_error():
    # Given
    device_id = 9999  # This id doesn't exists.

    # Then
    with pytest.raises(Http404):
        # When
        get_device(device_id)


@pytest.mark.django_db
@pytest.mark.parametrize(
    "temperature, humidity, water_level, timestamp",
    [
        (20.12, 32.00, 42.00, timezone.now()),
        (12.12, 22.00, 52.00, timezone.now()),
        (8.12, 12.00, 32.00, timezone.now())
    ]
)
def test_can_save_sensors_data_to_db(device, temperature, humidity, water_level, timestamp):
    # Given
    sensors_data = SensorsData(temperature, humidity, water_level, timestamp)

    # When
    saved_data = save_sensor_data(data=sensors_data, device=device)

    # Then
    assert saved_data.temperature == temperature
    assert saved_data.humidity == humidity
    assert saved_data.water_level == water_level
    assert saved_data.timestamp == timestamp
