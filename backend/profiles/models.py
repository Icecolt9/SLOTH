from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL



class CustomerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    address = models.CharField(max_length=255, blank=True)
    gender = models.CharField(max_length=20, blank=True)
    location = models.CharField(max_length=255, blank=True)

class ShopProfile(models.Model):
    CATEGORY_CHOICES = [
        ("clothing", "Clothing"),
        ("food", "Food"),
        ("accessories", "Accessories"),
        ("cosmetics", "Cosmetics"),
        ("technology", "Technology"),
    ]

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    shop_name = models.CharField(max_length=255, blank=True)
    description = models.TextField(blank=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, blank=True)
    image = models.ImageField(upload_to="shop_images/", blank=True, null=True)

    def __str__(self):
        return self.shop_name or self.user.email

class RiderProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    vehicle_type = models.CharField(max_length=50, blank=True)
    license_number = models.CharField(max_length=50, blank=True)



