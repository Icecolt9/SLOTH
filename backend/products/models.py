from django.db import models
from profiles.models import ShopProfile
# Create your models here.

class ProductSection(models.Model):
    shop = models.ForeignKey(
        ShopProfile,
        on_delete=models.CASCADE,
        related_name="sections"
    )
    name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.shop.shop_name} - {self.name}"


class Product(models.Model):
    section = models.ForeignKey(
        ProductSection,
        on_delete=models.CASCADE,
        related_name="products"
    )
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to="product_images/", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name