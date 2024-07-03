import pytest
from rest_framework.test import APIClient

from sensors.models import Device, Block


@pytest.fixture
def block():
    return Block.objects.create(name="HOUSE1")


@pytest.fixture
def device(block):
    return Device.objects.create(name="DHCP", number=201, block=block)


@pytest.fixture
def api_client():
    return APIClient()
