
# Register your models here.
from django.contrib import admin
from .models import CustomerProfile, ShopProfile, RiderProfile


@admin.register(CustomerProfile)
class CustomerProfileAdmin(admin.ModelAdmin):
    list_display = ("id", "user")
    search_fields = ("user__email",)


@admin.register(ShopProfile)
class ShopProfileAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "shop_name")
    search_fields = ("user__email", "shop_name")


@admin.register(RiderProfile)
class RiderProfileAdmin(admin.ModelAdmin):
    list_display = ("id", "full_name", "user", "vehicle_type")
    search_fields = ("full_name", "user__email")
