from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import ProductSection, Product
from .serializers import ProductSerializer, ProductSectionSerializer
from rest_framework import status

from .models import ProductSection, Product
from .serializers import ProductSectionSerializer
from profiles.models import ShopProfile

class ShopProductSectionsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        shop_profile = request.user.shopprofile  # assuming 1-to-1
        sections = ProductSection.objects.filter(shop=shop_profile)
        serializer = ProductSectionSerializer(sections, many=True)
        return Response(serializer.data)

    def post(self, request):
        shop_profile = request.user.shopprofile
        name = request.data.get("name")
        section, created = ProductSection.objects.get_or_create(
            shop=shop_profile, name=name
        )
        serializer = ProductSectionSerializer(section)
        return Response(serializer.data)
    

class ProductCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        shop = ShopProfile.objects.get(user=request.user)

        header = request.data.get("header")
        name = request.data.get("name")
        price = request.data.get("price")
        description = request.data.get("description", "")

        section, _ = ProductSection.objects.get_or_create(
            shop=shop,
            name=header
        )

        Product.objects.create(
            section=section,
            name=name,
            price=price,
            description=description,
            image=request.FILES.get("image"),
        )

        return Response({"message": "Product created"}, status=status.HTTP_201_CREATED)
    

class ProductCRUDView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        product = Product.objects.get(pk=pk)
        product.name = request.data.get("name", product.name)
        product.price = request.data.get("price", product.price)
        product.description = request.data.get("description", product.description)
        product.save()
        return Response({"message": "Product updated successfully"})


class CustomerShopProductsView(APIView):
    """
    Public endpoint
    Returns:
    {
      shop: {...},
      sections: [
        { id, name, products: [...] }
      ]
    }
    """

    def get(self, request, shop_id):
        try:
            shop = ShopProfile.objects.get(id=shop_id)
        except ShopProfile.DoesNotExist:
            return Response(
                {"detail": "Shop not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        sections = (
            ProductSection.objects
            .filter(shop=shop)
            .prefetch_related("products")
        )

        section_serializer = ProductSectionSerializer(sections, many=True)

        return Response({
            "shop": {
                "id": shop.id,
                "shop_name": shop.shop_name,
                "description": shop.description,
                "image": shop.image.url if shop.image else None,
            },
            "sections": section_serializer.data
        })