import json
from unittest import mock

from django.urls import reverse
from rest_framework import status

from sms.mqtt import MQTT_TOPIC
from ..models import SensorsData


@mock.patch("sensors.views.client.publish", autospec=True)
def test_sensor_data_post(mock_publish, api_client):
    # Given
    url = reverse("metrics")
    data = {
        "temperature": 20.0,
        "humidity": 12.0,
        "water_level": 21.0,
        "timestamp": "1985-09-25 17:45:30.005"
    }
    mock_publish.return_value = (2, 3)  # rc = 2, mid = 3

    # When
    response = api_client.post(url, data, format="json")

    # Then
    mock_publish.assert_called_once_with(topic=MQTT_TOPIC, payload=json.dumps(data))
    assert response.status_code == status.HTTP_200_OK
    assert response.data == {"message": "Transferred", "code": 2}


@mock.patch("sensors.views.get_last_sensors_data", autospec=True)
def test_can_get_sensor_data(mock_get_last_sensors_data, api_client):
    # Given
    url = reverse("metrics")
    data = SensorsData(temperature=20.0, humidity=12.0, water_level=21.0)
    mock_get_last_sensors_data.return_value = data

    # When
    response = api_client.get(url, format="json")

    # Then
    mock_get_last_sensors_data.assert_called_once_with()
    assert response.status_code == status.HTTP_200_OK
    assert response.data == {"temperature": 20.0, "humidity": 12.0, "water_level": 21.0}
