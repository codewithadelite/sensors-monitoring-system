from django.urls import re_path
from .consumers import SensorsConsumer


urlpatterns = [
    re_path(r'metrics/', SensorsConsumer.as_asgi())
]

