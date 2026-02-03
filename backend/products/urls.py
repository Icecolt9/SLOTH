# products/urls.py
from django.urls import path
from .views import ProductDetailView
from .views import ShopProductSectionsView
from .views import ProductCreateView, ProductCRUDView, CustomerShopProductsView
from .views import AddToCartView, CartListView

urlpatterns = [
    path("sections/", ShopProductSectionsView.as_view(), name="shop-product-sections"),
    path("", ProductCreateView.as_view(), name="product-create"),
    path("products/<int:pk>/", ProductCRUDView.as_view()),
    
    path(
        "shops/<int:shop_id>/products/",
        CustomerShopProductsView.as_view(),
        name="customer-shop-products"
    ),
    path("<int:id>/detail/", ProductDetailView.as_view(), name="product-detail"),

    path("cart/add/", AddToCartView.as_view(), name="add-to-cart"),
    path("cart/", CartListView.as_view(), name="cart-list")

    

]
