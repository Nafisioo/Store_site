from django.shortcuts import render
from rest_framework import viewsets
from .models import Product
from .serializers import ProductSerializer
from rest_framework.response import Response
from rest_framework.decorators import action


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

@action(detail=False, methods=['get'])
def popular(self, request):
        popular_products = self.queryset.order_by('-views')[:5]
        serializer = self.get_serializer(popular_products, many=True)
        return Response(serializer.data)


