import datetime
from dataclasses import dataclass


@dataclass
class SensorsData:
    temperature: float
    humidity: float
    water_level: float
    timestamp: datetime
