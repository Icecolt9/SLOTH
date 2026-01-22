# products/urls.py
from django.urls import path
from .views import ShopProductSectionsView
from .views import ProductCreateView, ProductCRUDView, CustomerShopProductsView

urlpatterns = [
    path("sections/", ShopProductSectionsView.as_view(), name="shop-product-sections"),
    path("", ProductCreateView.as_view(), name="product-create"),
    path("products/<int:pk>/", ProductCRUDView.as_view()),
    
    path(
        "shops/<int:shop_id>/products/",
        CustomerShopProductsView.as_view(),
        name="customer-shop-products"
    ),
]
