from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from .models import ShopProfile
from .models import RiderProfile
from .serializers import RiderProfileSerializer

class ShopProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        try:
            profile = ShopProfile.objects.get(user=user)
            data = {
                "shop_name": profile.shop_name,
                "description": profile.description,
                "category": profile.category,
                "image": profile.image.url if profile.image else None,
            }
            return Response(data)
        except ShopProfile.DoesNotExist:
            return Response({"error": "Profile not found"}, status=404)

    def patch(self, request):
        user = request.user
        profile, created = ShopProfile.objects.get_or_create(user=user)

        profile.shop_name = request.data.get("shop_name", profile.shop_name)
        profile.description = request.data.get("description", profile.description)
        profile.category = request.data.get("category", profile.category)

        if request.FILES.get("image"):
            profile.image = request.FILES["image"]

        profile.save()
        return Response({"message": "Profile updated successfully"})
    

class ShopListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        category = request.GET.get("category")

        if category:
            shops = ShopProfile.objects.filter(category__iexact=category)
        else:
            shops = ShopProfile.objects.all()

        data = [
            {
                "id": shop.id,
                "shop_name": shop.shop_name,
                "description": shop.description,
                "image": shop.image.url if shop.image else "",
                "category": shop.category,
            }
            for shop in shops
        ]
        return Response(data)

class RiderMeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            rider_profile = RiderProfile.objects.get(user=request.user)
            serializer = RiderProfileSerializer(rider_profile)
            return Response(serializer.data)
        except RiderProfile.DoesNotExist:
            return Response({"error": "Rider profile not found"}, status=404)