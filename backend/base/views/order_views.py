from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.serializer import ProductSerializer
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
       # (1) Create order

       order = Order.Objects.create(
           user = user,
           paymentMethod=data['paymentMethod'],
           taxPrice=data['taxPrice'],
           ShippingPrice=data['shippingPrice'],
           totalPrice=data['totalPrice']

       )
    
    return Response('ORDER')




