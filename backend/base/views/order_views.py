from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.serializer import ProductSerializer, OrderSerializer, ShippingAddressSerializer
from base.models import Product, Order, OrderItem, ShippingAddress
# from base.products import products


from rest_framework import status

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data
    
    orderItems = data['orderItems']
    
    if orderItems and len( orderItems ) == 0:
        return Response({'detail': 'No Order Items'}, status = status.HTTP_400_BAD_REQUEST)
    else:
        
        
       # (1) Create Order
        order = Order.objects.create(
           user = user,
           paymentMethod=data['paymentMethod'],
           taxPrice=data['taxPrice'],
           shippingPrice=data['shippingPrice'],
           totalPrice=data['totalPrice'],

       )

        # (2) Shipping Address.         
        shipping = ShippingAddress.objects.create(
            order=order,
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            postalCode=data['shippingAddress']['postalCode'],
            country=data['shippingAddress']['country']
            
        )
        
        # (3) Create order items adn set order to orderItem relationship.
        for i in orderItems:
            product = Product.objects.get(_id=i['product'])

            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=i['qty'],
                price=i['price'],
                image=product.image.url,
            )
            # (4) Update stock.
            product.countInStock -= int(item.qty)
            product.save()
            
        serializer = OrderSerializer(order, many=False) 
        return Response(serializer.data)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):
    user = request.user
    try:
        order = Order.objects.get(_id=pk)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order,many=False)
            return Response(serializer.data)
        else:
            return Response({'detail': 'Not authorized to view this order.'},
                    status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail': 'Order does not exists.'},
                        status=status.HTTP_400_BAD_REQUEST)


