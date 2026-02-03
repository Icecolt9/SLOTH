from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User
from profiles.models import (
    CustomerProfile,
    ShopProfile,
    RiderProfile
)


class SignupView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        role = request.data.get("role")

        if not email or not password or not role:
            return Response(
                {"error": "Email, password, and role are required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if User.objects.filter(email=email).exists():
            return Response(
                {"error": "Email already exists"},
                status=status.HTTP_400_BAD_REQUEST
            )

        user = User.objects.create_user(
            email=email,
            password=password,
            role=role
        )

        if role == "customer":
            CustomerProfile.objects.create(user=user)

        elif role == "shop":
            ShopProfile.objects.create(
                user=user,
                shop_name=request.data.get("shop_name", ""),
                description=request.data.get("description", "")
            )

        elif role == "rider":
            RiderProfile.objects.create(
                user=user,
                full_name=request.data.get("full_name", ""),                     
                vehicle_type=request.data.get("vehicle_type", "")
            )

        else:
            user.delete()
            return Response(
                {"error": "Invalid role"},
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response(
            {"message": "User and profile created successfully"},
            status=status.HTTP_201_CREATED
        )



class LoginView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        user = authenticate(request, email=email, password=password)
        if user is None:
            return Response({"error": "Invalid credentials"}, status=400)

        refresh = RefreshToken.for_user(user)

        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "role": user.role
        })
