from django.urls import path
from .views import ShopProfileView
from .views import ShopListView
from .views import RiderMeView

urlpatterns = [
    path("shop-profile/", ShopProfileView.as_view(), name="shop-profile"),
    path("shops/", ShopListView.as_view(), name="shop-list"),
    path("rider/me/", RiderMeView.as_view(), name="rider-me"),

]
