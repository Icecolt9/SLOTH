from django.contrib import admin
from .models import ProductSection, Product


@admin.register(ProductSection)
class ProductSectionAdmin(admin.ModelAdmin):
    list_display = ("id", "shop", "name")
    search_fields = ("name",)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "section", "price")
    search_fields = ("name",)
    list_filter = ("section",)
