# productos/views.py

from rest_framework import generics, permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Q
from django.http import JsonResponse

from .models import Categoria, Producto, Banner
from .serializers import (
    CategoriaSerializer,
    ProductoSerializer,
    BannerSerializer
)

# ----------------------
# CATEGORÍAS
# ----------------------
class CategoriaListView(generics.ListAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    permission_classes = [permissions.AllowAny]


# ----------------------
# PRODUCTOS LISTA + FILTROS
# ----------------------
class ProductoListView(generics.ListAPIView):
    serializer_class = ProductoSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = Producto.objects.all()

        categoria = self.request.query_params.get('categoria')
        search = self.request.query_params.get('search')

        if categoria:
            queryset = queryset.filter(categoria__nombre=categoria)

        if search:
            queryset = queryset.filter(
                Q(nombre__icontains=search) |
                Q(descripcion__icontains=search)
            )

        return queryset


# ----------------------
# PRODUCTO DETALLE
# ----------------------
class ProductoDetailView(generics.RetrieveAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    permission_classes = [permissions.AllowAny]


# ----------------------
# PRODUCTOS DESTACADOS
# ----------------------
@api_view(['GET'])
def productos_destacados(request):
    productos = Producto.objects.filter(destacado=True)[:8]
    serializer = ProductoSerializer(productos, many=True)
    return Response(serializer.data)


# ----------------------
# BANNERS
# ----------------------
class BannerListView(generics.ListAPIView):
    queryset = Banner.objects.filter(activo=True)
    serializer_class = BannerSerializer
    permission_classes = [permissions.AllowAny]


# ----------------------
# HEARTBEAT (Keep-Alive)
# ----------------------
# NOTA: Esta función debe estar FUERA de cualquier clase, pegada al margen izquierdo.
def heartbeat(request):
    """
    Vista simple para mantener la conexión activa (keep-alive).
    Solo devuelve un estado 200 OK.
    """
    return JsonResponse({'status': 'alive'}, status=200)