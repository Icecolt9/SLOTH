from rest_framework import serializers
from .models import ProductSection, Product, ProductImage, CartItem


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ["id", "image"]


class ProductSerializer(serializers.ModelSerializer):
    gallery = ProductImageSerializer(many=True, read_only=True)
    is_available = serializers.ReadOnlyField()

    class Meta:
        model = Product
        fields = [
            "id",
            "section",
            "name",
            "description",
            "full_description",
            "price",
            "quantity",
            "is_available",
            "image",
            "gallery",
            "created_at",
        ]


class ProductSectionSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = ProductSection
        fields = ["id", "name", "products"]


class CartItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source="product.name", read_only=True)
    product_image = serializers.ImageField(source="product.image", read_only=True)

    class Meta:
        model = CartItem
        fields = ["id", "product", "product_name", "product_image"]
