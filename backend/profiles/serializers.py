# profiles/serializers.py
from rest_framework import serializers
from .models import RiderProfile

class RiderProfileSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source="user.email", read_only=True)

    class Meta:
        model = RiderProfile
        fields = [
            "id",
            "full_name",
            "email",
            "vehicle_type",
        ]
