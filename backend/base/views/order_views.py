from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.serializer import ProductSerializer, OrderItemSerializer, OrderSerializer, ShippingAddressSerializer
from base.models import Product, Order, OrderItem, ShippingAddress
from base.products import products

from rest_framework import status

@api_view(['POST'])
@permission_classes(['IsAuthenticated'])
def addOrderItem(request):
    user = request.user
    data = request.data
    
    orderItem = data['orderItem']
    
    if orderItem and len('orderItems') == 0:
        return Response({'detail': 'No Order Items'}, status = status.HTTP_400_BAD_REQUEST)
    else:
        
        
       # (1) Create Order
        order = Order.Objects.create(
           user = user,
           paymentMethod=data['paymentMethod'],
           taxPrice=data['taxPrice'],
           ShippingPrice=data['shippingPrice'],
           totalPrice=data['totalPrice'],

       )

        # (2) Shipping Address.         
        shipping = ShippingAddress.Objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            postalCode=data['shippingAddress']['postalCode'],
            country=data['shippingAddress']['country']
            
        )
        
        # (3) Create order items adn set order to orderItem relationship.
        for i in orderItem:
            product = Product.objects.get(_id=i['product'])

            item = OrderItem.object.create(
                product=product,
                order=order,
                name=product.name,
                qty=i['qty'],
                price=i['price'],
                image=product.image.url,
            )
            # (4) update stock.
            product.countInStock -= item.qty
            product.save()
    serializer = OrderSerializer(order, many=True)
        
    return Response('ORDER')




