from django.urls import path
from .views import ShopProfileView
from .views import ShopListView

urlpatterns = [
    path("shop-profile/", ShopProfileView.as_view(), name="shop-profile"),
    path("shops/", ShopListView.as_view(), name="shop-list"),

]
