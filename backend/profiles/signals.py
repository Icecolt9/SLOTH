from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from accounts.models import User
from .models import CustomerProfile, ShopProfile, RiderProfile


@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if not created:
        return

    if instance.role == "customer":
        CustomerProfile.objects.get_or_create(user=instance)

    elif instance.role == "shop":
        ShopProfile.objects.get_or_create(user=instance)

    elif instance.role == "rider":
        RiderProfile.objects.get_or_create(user=instance)
