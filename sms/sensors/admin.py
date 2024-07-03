from django.contrib import admin

from .models import SensorsData, Device, Block

admin.site.register(SensorsData)
admin.site.register(Device)
admin.site.register(Block)
