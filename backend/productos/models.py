from django.db import models

# ---------------------------
#   CATEGORÍA
# ---------------------------
class Categoria(models.Model):
    nombre = models.CharField(max_length=100)
    
    def __str__(self):
        return self.nombre


# ---------------------------
#   PRODUCTO
# ---------------------------
class Producto(models.Model):
    nombre = models.CharField(max_length=200)
    descripcion = models.TextField(blank=True, null=True) 
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    stock = models.IntegerField(default=0)
    
    imagen = models.ImageField(upload_to='productos/', null=True, blank=True)

    destacado = models.BooleanField(default=False, verbose_name="Producto Destacado")
    
    def __str__(self):
        return self.nombre


# ---------------------------
#   BANNER (Corregido con Choices)
# ---------------------------

# 🎨 Opciones de Color de Fondo (¡Asegúrate de que estas clases estén en tu safelist de Tailwind!)
COLOR_FONDO_OPCIONES = [
    ('bg-green-600', 'Verde (Principal)'),
    ('bg-amber-600', 'Ámbar (Empanada)'),
    ('bg-red-600', 'Rojo (Oferta)'),
    ('bg-blue-600', 'Azul (Novedad)'),
    ('bg-gray-100', 'Gris Claro (Neutro)'),
]

# 📝 Opciones de Color de Texto (¡Asegúrate de que estas clases estén en tu safelist de Tailwind!)
COLOR_TEXTO_OPCIONES = [
    ('text-white', 'Blanco'),
    ('text-gray-800', 'Gris Oscuro'),
    ('text-green-900', 'Verde Oscuro'),
]

class Banner(models.Model):
    titulo = models.CharField(max_length=100)
    subtitulo = models.CharField(max_length=200)
    tag = models.CharField(max_length=50, default="NUEVO")

    imagen = models.ImageField(upload_to="banners/")

    # CORRECCIÓN: Usamos choices para un control seguro de clases de Tailwind
    color_fondo = models.CharField(
        max_length=50,
        choices=COLOR_FONDO_OPCIONES, # Menú desplegable en el Admin
        default="bg-green-600",
        help_text="Clase de Tailwind. SOLO se permiten las clases de la lista.",
        verbose_name="Color de Fondo"
    )
    
    # CORRECCIÓN: Usamos choices también para el texto
    color_texto = models.CharField(
        max_length=50,
        choices=COLOR_TEXTO_OPCIONES,
        default="text-white",
        verbose_name="Color de Texto"
    )

    texto_boton = models.CharField(max_length=50, default="VER MÁS")
    enlace = models.CharField(max_length=200, default="/productos")

    activo = models.BooleanField(default=True)

    def __str__(self):
        return self.titulo