# products/serializers.py
from rest_framework import serializers
from .models import ProductSection, Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"


class ProductSectionSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = ProductSection
        fields = ["id", "name", "products"]

