# 🥐 Ecommerce Delicias Colombianas

![Status](https://img.shields.io/badge/Status-En%20Desarrollo-green)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)

Una plataforma de comercio electrónico moderna y completa, diseñada para la venta de productos tradicionales colombianos. Este proyecto combina un frontend de alto rendimiento construido con **Next.js** y un backend robusto en **Django**.

El diseño destaca por una estética "Retail Moderno/Vintage" con colores corporativos vibrantes, animaciones fluidas y una experiencia de usuario (UX) optimizada para móviles y escritorio.

## 📸 Capturas de Pantalla
*(Aquí puedes subir tus imágenes a una carpeta /screenshots en tu repo y enlazarlas)*

| Inicio | Carrito | Detalle de Producto |
|:---:|:---:|:---:|
| ![Home](https://via.placeholder.com/200x100?text=Home) | ![Cart](https://via.placeholder.com/200x100?text=Cart) | ![Detail](https://via.placeholder.com/200x100?text=Detail) |

## 🛠️ Tecnologías Utilizadas

### Frontend (Cliente)
* **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
* **Lenguaje:** JavaScript / React
* **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
* **Iconos:** [Lucide React](https://lucide.dev/)
* **Estado Global:** React Context API (Para Carrito y Autenticación)

### Backend (Servidor)
* **Framework:** [Django](https://www.djangoproject.com/)
* **API:** Django REST Framework
* **Base de Datos:** SQLite (Desarrollo) / PostgreSQL (Producción - *Opcional*)
* **Imágenes:** Django Media Static serving

## ✨ Características Principales

* 🛒 **Carrito de Compras Persistente:** Gestión de estado global para agregar, eliminar y modificar cantidades de productos en tiempo real.
* 🔍 **Buscador y Filtros:** Filtrado dinámico por categorías (Carnes, Lácteos, Panadería, etc.) y búsqueda por nombre.
* 📱 **Diseño Responsive:** Interfaz totalmente adaptada a dispositivos móviles con menú hamburguesa y navegación táctil.
* ⚡ **Vistas Rápidas:** Modales interactivos para ver detalles del producto sin salir de la página principal.
* 🔐 **Autenticación:** Sistema de Login y Registro de usuarios (integrado con backend Django).
* 🎨 **UI/UX Personalizada:** Componentes visuales únicos (Headers curvos, efectos de glassmorphism, botones interactivos).

## 🚀 Instalación y Puesta en Marcha

Sigue estos pasos para ejecutar el proyecto en tu entorno local.

### Prerrequisitos
* Node.js (v18 o superior)
* Python (v3.10 o superior)
* Git

### 1. Clonar el Repositorio

```bash
git clone [https://github.com/tu-usuario/Ecommerce-DC.git](https://github.com/tu-usuario/Ecommerce-DC.git)
cd Ecommerce-DC

2. Configurar el Backend (Django)
Navega a la carpeta del servidor:

cd backend
# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# Migraciones
python manage.py migrate

# Ejecutar servidor
python manage.py runserver

El backend correrá en http://127.0.0.1:8000

3. Configurar el Frontend (Next.js)
Abre una nueva terminal y navega a la carpeta del cliente:

cd frontend
# Instalar dependencias
npm install

# Ejecutar entorno de desarrollo
npm run dev

El frontend correrá en http://localhost:3000

📂 Estructura del Proyecto

Ecommerce-DC/
├── backend/                # Código fuente Django
│   ├── api/                # Endpoints y Serializers
│   ├── media/              # Imágenes de productos subidas
│   └── manage.py
├── frontend/               # Código fuente Next.js
│   ├── src/
│   │   ├── app/            # Rutas (Page, Layout)
│   │   ├── components/     # UI Reutilizable (Footer, Navbar, Cards)
│   │   ├── context/        # Lógica global (CartContext, AuthContext)
│   │   └── services/       # Conexión con API (apiService.js)
│   └── public/             # Assets estáticos
└── README.md

🤝 Contribución
Haz un Fork del proyecto.

Crea tu rama de funcionalidad (git checkout -b feature/AmazingFeature).

Haz Commit de tus cambios (git commit -m 'Add some AmazingFeature').

Haz Push a la rama (git push origin feature/AmazingFeature).

Abre un Pull Request.

✒️ Autores
John Esteban - Trabajo Inicial & Desarrollo Full Stack

© 2025 Delicias Colombianas. Calidad y Tradición.
### Tip PRO para VS Code:
Una vez lo pegues, para ver cómo va quedando realmente (sin ver el código), presiona las teclas:
`Ctrl` + `Shift` + `V`

Eso abrirá la **Vista Previa** y ahí deberías ver los títulos en negrita, las listas con puntos y todo bien organizado.