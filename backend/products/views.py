from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import ProductSection, Product
from .models import CartItem
from .serializers import ProductSerializer, ProductSectionSerializer, CartItemSerializer
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
        product = get_object_or_404(Product, pk=pk)

        
        product.name = request.data.get("name", product.name)
        product.price = request.data.get("price", product.price)
        product.description = request.data.get("description", product.description)


        if "full_description" in request.data:
            product.full_description = request.data["full_description"]

        if "quantity" in request.data:
            product.quantity = request.data["quantity"]

        product.save()

        return Response(
            ProductSerializer(product).data,
            status=status.HTTP_200_OK
        )



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
    
class ProductDetailView(APIView):
    """
    GET /api/products/<id>/detail/
    Returns full product info (gallery, quantity, availability, etc)
    """

    def get(self, request, id):
        product = get_object_or_404(Product, id=id)
        serializer = ProductSerializer(product)
        return Response(serializer.data, status=status.HTTP_200_OK)
    



class AddToCartView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        product_id = request.data.get("product_id")

        product = get_object_or_404(Product, id=product_id)

        cart_item, created = CartItem.objects.get_or_create(
            user=request.user,
            product=product
        )

        if not created:
            return Response(
                {"detail": "Product already in cart"},
                status=status.HTTP_200_OK
            )

        return Response(
            {"detail": "Product added to cart"},
            status=status.HTTP_201_CREATED
        )

#Get Cart Stuff

class CartListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        cart_items = CartItem.objects.filter(user=request.user).select_related("product")
        serializer = CartItemSerializer(cart_items, many=True)
        return Response(serializer.data)
