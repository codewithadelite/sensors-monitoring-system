import json
from datetime import datetime

import paho.mqtt.client as mqtt
from django.conf import settings

from sensors.types import SensorsData
from sensors.utils import save_sensor_data, get_device, publish_metrics_to_websocket_clients

MQTT_TOPIC = "sensors/data/"


def on_log(client, userdata, level, buf):
    print(buf)


def on_connect(client, userdata, flags, reason_code, properties):
    print(f"Connected with result code {reason_code}")
    # Subscribing in on_connect() means that if we lose the connection and
    # reconnect then subscriptions will be renewed.
    client.subscribe(MQTT_TOPIC)


def on_message(client, userdata, msg):
    data = json.loads(msg.payload)
    temperature = data['temperature']
    humidity = data['humidity']
    water_level = data['water_level']
    timestamp = data['timestamp']

    # Parse the ISO 8601 string into a datetime object
    dt_object = datetime.strptime(timestamp, '%Y-%m-%dT%H:%M:%S.%f%z')
    # Format the datetime object into '%H:%M:%S' format
    formatted_time = dt_object.strftime('%H:%M:%S')
    print(formatted_time)
    data['timestamp'] = formatted_time

    # Publish data to websocket clients

    publish_metrics_to_websocket_clients(data)

    # Save data to the database
    save_sensor_data(
        data=SensorsData(temperature, humidity, water_level, timestamp),
        device=get_device(1)
    )


def on_disconnect(client, userdata, rc):
    if rc != 0:
        print("Unexpected disconnection.", rc)


client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)
client.on_log = on_log
client.on_connect = on_connect
client.on_disconnect = on_disconnect
client.on_message = on_message
client.tls_set(ca_certs="C:/Users/adeli/OneDrive/Plocha/emqxsl-ca.crt")
client.username_pw_set(username=settings.MQTT_USERNAME, password=settings.MQTT_PASSWORD)
client.connect(host=settings.MQTT_BROKER, port=settings.MQTT_PORT, keepalive=60)
