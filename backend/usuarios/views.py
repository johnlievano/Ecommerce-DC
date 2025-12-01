# usuarios/views.py

from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from .models import Perfil
from .serializers import UserSerializer, UserRegistrationSerializer

# ---------------------------
#  REGISTRO DE USUARIO
# ---------------------------
class UserRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [permissions.AllowAny]


# ---------------------------
#  PERFIL DE USUARIO
# ---------------------------
class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        # Retorna el usuario autenticado actual
        return self.request.user


# ---------------------------
#  LOGIN
# ---------------------------
@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    user = authenticate(username=username, password=password)
    
    if user is not None:
        login(request, user) # Esto crea la sesión (cookie)
        serializer = UserSerializer(user)
        return Response({
            'user': serializer.data,
            'message': 'Login exitoso'
        })
    
    return Response(
        {'error': 'Credenciales inválidas'}, 
        status=status.HTTP_400_BAD_REQUEST
    )


# ---------------------------
#  LOGOUT
# ---------------------------
@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def logout_view(request):
    logout(request) # Cierra la sesión y limpia la cookie
    return Response({'message': 'Logout exitoso'})