from rest_framework import serializers
from .models import Product,Cart,CartItem,Transactions,Order
from django.contrib.auth import get_user_model


User = get_user_model()


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["id","name","slug","image","description","category","price","ispopular"]


class DetailedProductSerializer(serializers.ModelSerializer):
    similar_product = serializers.SerializerMethodField()
    class Meta:
        model = Product
        fields = ["id","name","price","slug","image","description","similar_product"]

    def get_similar_product(self,product):
        products = Product.objects.filter(category = product.category).exclude(id = product.id)
        serializer = ProductSerializer(products,many=True)
        return serializer.data
    
class SimpleCartSerializer(serializers.ModelSerializer):
    num_of_items = serializers.SerializerMethodField()
    class Meta:
        model = Cart
        fields = ["id","cart_code","num_of_items"]
    
    def get_num_of_items(self,cart):
        num_of_items = 0
        for item in cart.items.all():
            num_of_items += item.quantity
        return num_of_items



class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only = True)
    total = serializers.SerializerMethodField()
    class Meta:
        model = CartItem
        fields = ["id","quantity","product","total"]
    
    def get_total(self,cartitem):
        total = cartitem.product.price * cartitem.quantity
        return total

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(read_only = True,many = True)
    sum_total = serializers.SerializerMethodField()
    num_of_items = serializers.SerializerMethodField()
    class Meta:
        model = Cart
        fields = ["id","cart_code","items","sum_total","num_of_items","created_at","modified_at"]

    def get_sum_total(self,cart):
        sum_total = 0
        for item in cart.items.all():
            sum_total += item.product.price * item.quantity
        return sum_total
    
    def get_num_of_items(self,cart):
        num_of_items = 0
        for item in cart.items.all():
            num_of_items += item.quantity
        return num_of_items
    
class NewCartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only = True)
    order_id = serializers.SerializerMethodField()
    order_date = serializers.SerializerMethodField()
    
    class Meta:
        model = CartItem
        fields = ["id","product","quantity","order_id","order_date"]
    
    def get_order_id(self,cartitem):
        order_id = cartitem.cart.cart_code
        return order_id

    def get_order_date(self,cartitem):
        order_date = cartitem.cart.modified_at
        return order_date
    
class UserSerializer(serializers.ModelSerializer):
    items = serializers.SerializerMethodField()
    class Meta:
        model = get_user_model()
        fields = ["id","username","first_name","last_name","email","phone","items"]
    
    def get_items(self,user):
        cartitems = CartItem.objects.filter(cart__user =user,cart__paid = True)[:10]
        serializer = NewCartItemSerializer(cartitems,many=True)
        return serializer.data  
    


class TransactionSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    cart = CartSerializer()
    class Meta:
        model = Transactions
        fields = ["id","order_id","cart","amount","currency","status","user","created_at","modified_at"]

    

class OrderSerializer(serializers.ModelSerializer):
    user_full_name = serializers.SerializerMethodField()
    ordered_items = serializers.SerializerMethodField()
    transaction = TransactionSerializer()   # <<< makes it an object now

    class Meta:
        model = Order
        fields = ['id', 'user', 'user_full_name', 'ordered_items', 'transaction', 'status', 'created_at',"modified_at"]
        
    def get_user_full_name(self, obj):
        return f"{obj.user.first_name} {obj.user.last_name}"

    def get_ordered_items(self, obj):
        # Assuming Cart has related items as 'items'
        def get_ordered_items(self, obj):
            return [{"item_name": item.product.name,"quantity": item.quantity,"price": item.product.price} for item in obj.cart.items.all()]


