from django.contrib import admin
from .models import ProductSection, Product, ProductImage


@admin.register(ProductSection)
class ProductSectionAdmin(admin.ModelAdmin):
    list_display = ("id", "shop", "name")
    search_fields = ("name",)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "section", "price", "quantity")
    search_fields = ("name",)
    list_filter = ("section",)


@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = ("id", "product")