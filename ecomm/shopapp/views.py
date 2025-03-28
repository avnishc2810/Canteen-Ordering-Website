from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Product,Cart,CartItem,Transactions
from .serializers import ProductSerializer,DetailedProductSerializer,CartItemSerializer,CartSerializer,SimpleCartSerializer,UserSerializer
from rest_framework import status
from decimal import Decimal
import uuid 
from django.conf import settings
import razorpay
import time 

BASE_URL = "http://localhost:5173"

# Create your views here.
@api_view(["GET"])
def products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products,many=True)
    return Response(serializer.data ) 

@api_view(["GET"])
def product_detail(request,slug):
    product = Product.objects.get(slug = slug)
    serializer = DetailedProductSerializer(product)
    return Response(serializer.data)


@api_view(["POST"])
def add_item(request):
    try:
        cart_code = request.data.get("cart_code")
        cart, created  =  Cart.objects.get_or_create(cart_code = cart_code)

        product_id = request.data.get("product_id")
        

        product = Product.objects.get(id = product_id)
        cartitem,created = CartItem.objects.get_or_create(cart = cart,product = product)
        cartitem.quantity = 1
        cartitem.save()

        serialzier = CartItemSerializer(cartitem)

        return Response({"data":serialzier.data,"message" : "Cart Created Successfully"},status=201)
    except Exception as e:
        return Response({"error" : str(e)},status=400) 
    

@api_view(["GET"])
def product_in_cart(request):
    cart_code = request.query_params.get("cart_code")
    product_id = request.query_params.get("product_id")

    cart = Cart.objects.get(cart_code = cart_code)
    product = Product.objects.get(id = product_id)

    product_exits_in_cart = CartItem.objects.filter(cart = cart , product = product).exists()

    return Response({'product_in_cart': product_exits_in_cart})


@api_view(["GET"])
def get_cart_stat(request):
    cart_code = request.query_params.get("cart_code")
    cart = Cart.objects.get(cart_code = cart_code,paid = False)
    serializer = SimpleCartSerializer(cart)
    return Response(serializer.data)


@api_view(["GET"])
def get_cart(request):
    cart_code = request.query_params.get("cart_code")
    cart = Cart.objects.get(cart_code = cart_code,paid = False)
    serializer = CartSerializer(cart)
    return Response(serializer.data)

@api_view(["PATCH"])
def update_quantity(request):
    try:
        cartitem_id = request.data.get("item_id")
        quantity = int(request.data.get("quantity"))
        cartitem = CartItem.objects.get(id=cartitem_id)
        cartitem.quantity = quantity
        cartitem.save()
        serializer = CartItemSerializer(cartitem)
        return Response({"data":serializer.data,"message":"Cart updated successfully"})

    except Exception as e:
        return Response({"error":str(e)},status=400)
    

@api_view(["POST"])
def delete_cartitem(request):
    cartitem_id = request.data.get("item_id")
    cartitem = CartItem.objects.get(id = cartitem_id)
    cartitem.delete()
    return Response({"message":"Item deleted successfully"},status=status.HTTP_204_NO_CONTENT)



@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_username(request):
    user = request.user
    return Response({"username":user.username})


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def user_info(request):
    user = request.user
    serializer = UserSerializer(user)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])  # Ensure the user is logged in
def initiate_payment(request):
    try:
        cart_code = request.data.get("cart_code")  # Get cart code from request
        cart = Cart.objects.get(cart_code=cart_code)  # Fetch cart from DB
        user = request.user

        redirect_url = f"{BASE_URL}/payment-status"

        # Calculate total amount
        amount = sum(item.quantity * item.product.price for item in cart.items.all())
        tax = Decimal("0.0075") * amount  # 0.75% tax
        total_amount = (amount + tax) * 100  # Convert to paise (Razorpay format)
        total_amount = int(total_amount)  # Ensure it's an integer

        currency = "INR"

        # Initialize Razorpay client
        client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_SECRET))

        # Create Razorpay order
        payment = client.order.create({
            "amount": total_amount,  # Amount in paise
            "currency": currency,
            "payment_capture": 1,  # Auto capture payment
            "receipt": str(uuid.uuid4())  # Unique identifier for Razorpay
        })

        # Store transaction in database
        transaction = Transactions.objects.create(
            # ref=str(uuid.uuid4()),  # Use UUID as a unique reference for internal tracking
            order_id=payment["id"],  # Store Razorpay order ID
            cart=cart,
            amount=total_amount / 100,  # Store actual amount in DB
            currency=currency,
            user=user,
            status="pending"
        )

        return Response({
            "order_id": payment["id"],  # Use Razorpay's order ID
            "amount": payment["amount"],  # Amount in paise
            "currency": payment["currency"],
            "razorpay_key": settings.RAZORPAY_KEY_ID,
            "redirect_url": redirect_url,
        })

    except Cart.DoesNotExist:
        return Response({"error": "Cart not found"}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=400)



@api_view(["POST"])
def payment_callback(request):
    # print("Raw request body:", request.body.decode("utf-8"))  # Debug raw request
    # print("Request method:", request.method)  # Check method (GET or POST)
    # print("Request GET params:", request.GET)  # Debug GET parameters
    # print("Request POST data:", request.POST)  # Debug POST data
    # print("Request data:", request.data)  # Debug DRF request.data

    # return Response({"message": "Debugging logs added!"}, status=200)
    try:
        # Use POST or request.data instead of GET
        razorpay_payment_id = request.GET.get('razorpay_payment_id')
        razorpay_order_id = request.GET.get('razorpay_order_id')
        razorpay_signature = request.GET.get('razorpay_signature')


        if not (razorpay_payment_id and razorpay_order_id and razorpay_signature):
            return Response({"message": "Invalid request parameters"}, status=400)

        # Fetch transaction based on order_id
        try:
            transaction = Transactions.objects.get(order_id=razorpay_order_id)  # Use order_id, not ref
        except Transactions.DoesNotExist:
            return Response({"message": "Transaction not found"}, status=404)

        # Verify signature
        client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_SECRET))
        params_dict = {
            'razorpay_payment_id': razorpay_payment_id,
            'razorpay_order_id': razorpay_order_id,
            'razorpay_signature': razorpay_signature
        }
        
        try:
            client.utility.verify_payment_signature(params_dict)
            transaction.status = "completed"
            transaction.save()

            # Mark cart as paid
            cart = transaction.cart
            cart.paid = True
            cart.user = request.user
            cart.save()
            
            time.sleep(2)

            return Response({"message": "Payment Successful!", 'subMessage': "Your payment has been verified successfully!"})
        except razorpay.errors.SignatureVerificationError:
            return Response({"message": "Payment Verification failed!", 'subMessage': "Signature verification failed!"}, status=400)

    except Exception as e:
        return Response({"message": "An error occurred", "error": str(e)}, status=500)