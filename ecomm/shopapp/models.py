from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.text import slugify
from django.conf import settings

# Create your models here.
class Product(models.Model):
    CATEGORY = (("Eatables","EATABLES"),
                ("Drinks","DRINKS"),
                ("Meals","MEALS"),
                )
    name = models.CharField(max_length=100)
    slug = models.SlugField(blank=True,null=True)
    image = models.ImageField(upload_to="img")
    description = models.TextField(blank=True,null=True)
    price = models.DecimalField(max_digits=10,decimal_places=2)
    category = models.CharField(max_length=15,choices=CATEGORY,blank=True,null=True)
    ispopular = models.BooleanField(default=False) 
    def __str__(self):
        return self.name
    

    def save(self,*args,**kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
            unique_slug = self.slug
            counter = 1

            if Product.objects.filter(slug = unique_slug).exists():
                unique_slug = f'{self.slug} - {counter}'
                counter += 1
            
            self.slug = unique_slug
        super().save(*args,**kwargs)
         

class Cart(models.Model):
    
    cart_code = models.CharField(max_length=11,unique=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,blank=True,null=True)
    paid = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True,blank=True,null=True)
    modified_at= models.DateTimeField(auto_now=True,blank=True,null=True)

    def __str__(self):
        return self.cart_code

class CartItem(models.Model):

    cart = models.ForeignKey(Cart,related_name='items',on_delete=models.CASCADE)
    product = models.ForeignKey(Product,on_delete= models.CASCADE)
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} x {self.product.name} in cart {self.cart.id} "
    

    

class Transactions(models.Model):
    # ref = models.CharField(max_length=25)
    order_id = models.CharField(max_length=50, unique=True, null=True, blank=True)  # Store Razorpay order ID
    cart = models.ForeignKey(Cart,on_delete=models.CASCADE,related_name="transactions")
    amount =  models.DecimalField(max_digits=10,decimal_places=2)
    currency = models.CharField(max_length=10,default="INR")
    status = models.CharField(max_length=20,default="pending")
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,blank=True)
    created_at = models.DateTimeField(null=True)
    modified_at = models.DateTimeField(null=True)
    
    def __str__(self):
        return f"Transaction {self.order_id} - {self.status}"
    

class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    cart = models.OneToOneField(Cart, on_delete=models.CASCADE)
    transaction = models.OneToOneField(Transactions, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, default="pending")
    created_at = models.DateTimeField(null=True)
    modified_at = models.DateTimeField(null=True)

    def user_full_name(self):
        return f"{self.user.first_name} {self.user.last_name}"

    def ordered_items(self):
        return self.cart.items.all()
