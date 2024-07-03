import json

from channels.generic.websocket import AsyncWebsocketConsumer


class SensorsConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add('sensors_metrics', self.channel_name)
        await self.accept()

    async def disconnect(self, code):
        await self.channel_layer.group_discard('sensors_metrics', self.channel_name)

    async def send_sensors_metrics(self, event):
        await self.send(text_data=json.dumps(event['sensors_metrics']))
