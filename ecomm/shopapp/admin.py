from django.contrib import admin
from .models import Product,Cart,CartItem,Transactions,Order
# Register your models here.

admin.site.register([Product,Cart,CartItem,Transactions,Order])
