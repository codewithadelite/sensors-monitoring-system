from django.db import models
from django.utils import timezone

from core.models import BaseModel


class Block(BaseModel):
    name = models.CharField(max_length=255)

    def __str__(self) -> str:
        return str(self.name)


class Device(BaseModel):
    name = models.CharField(max_length=255)
    number = models.IntegerField(null=False)
    block = models.ForeignKey(Block, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return str(self.name)


class SensorsData(BaseModel):
    id = models.BigAutoField(primary_key=True)
    temperature = models.FloatField()
    humidity = models.FloatField()
    water_level = models.FloatField()
    device = models.ForeignKey(Device, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(default=timezone.now())

    def __str__(self) -> str:
        return f"Temperature: {self.temperature}, Humidity: {self.humidity}, Water Level: {self.water_level}"
