from django.db import models
from profiles.models import ShopProfile
from django.conf import settings
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

    # BASIC INFO (already used)
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)  # short description
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to="product_images/", blank=True, null=True)

    # 🔹 NEW EXTENDED FIELDS
    full_description = models.TextField(blank=True)
    quantity = models.PositiveIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def is_available(self):
        return self.quantity > 0

    def __str__(self):
        return self.name


class ProductImage(models.Model):
    """
    Gallery images for a product.
    Limit to 5 per product in serializer/view (NOT here).
    """
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="gallery"
    )
    image = models.ImageField(upload_to="product_gallery/")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.product.name} image"



class CartItem(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="cart_items"
    )
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="cart_items"
    )
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "product")  # no duplicates

    def __str__(self):
        return f"{self.user.email} - {self.product.name}"
