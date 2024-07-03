from channels.routing import URLRouter
from django.urls import re_path

from sensors.websocket_urls import urlpatterns

urlpatterns = [
    re_path(r'sensors/', URLRouter(urlpatterns))
]
