'use client'
import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import Link from 'next/link'
import LoadingSpinner from '../components/LoadingSpinner'
import { apiService } from '../services/ApiService'
import ScrollReveal from '../components/ScrollReveal'

// ICONOS PROFESIONALES (Lucide React)
import {
  ShoppingCart, User, MapPin, Clock, Phone, Mail,
  Facebook, Instagram, Youtube, Linkedin, MessageCircle,
  ChevronRight, Utensils, ImageOff, LogIn, LogOut,
  Sun, Cloud, Star, Truck, Tag, Percent, ArrowRight,
  Quote, Menu, X
} from 'lucide-react'

const DJANGO_BASE_URL = 'http://127.0.0.1:8000';
const DJANGO_MEDIA_PATH = '/media/';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false) // Estado del menú móvil

  const { addToCart, getCartItemsCount } = useCart()
  const { user, logout } = useAuth()

  // --- DATOS DEL CARRUSEL (GALERÍA) ---
  const carouselItems = [
    {
      id: 1,
      title: "Tortas Artesanales",
      desc: "Suavidad y dulzura preparada cada mañana.",
      image: "/productos/hero-brownie.png",
      color: "bg-pink-500",
      textColor: "text-pink-100"
    },
    {
      id: 2,
      title: "Combos Familiares",
      desc: "La excusa perfecta para reunir a todos en la mesa.",
      image: "/productos/combo-ejemplo.png",
      color: "bg-orange-500",
      textColor: "text-orange-100"
    },
    {
      id: 3,
      title: "Lácteos Frescos",
      desc: "Sabor de campo directo a tu hogar.",
      image: "/productos/lacteos-ejemplo.png",
      color: "bg-blue-500",
      textColor: "text-blue-100"
    },
  ]

  // Lógica del carrusel automático
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [carouselItems.length])

  // --- CARGA DE PRODUCTOS ---
  const getCategoryColor = (cat) => {
    const map = {
      'Carnes': 'bg-amber-100',
      'Lacteos': 'bg-blue-100',
      'Postres': 'bg-pink-100',
      'Bebidas': 'bg-orange-100',
      'Dulces': 'bg-purple-100',
      'default': 'bg-green-100'
    }
    const key = typeof cat === 'string' ? cat : 'default'
    return map[key] || map['default']
  }

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      setLoading(true)
      try {
        if (!apiService || !apiService.getProducts) throw new Error("ApiService no configurado")
        const data = await apiService.getProducts()

        if (data && Array.isArray(data) && data.length > 0) {
          const transformed = data
            .filter(p => p.destacado === true || p.destacado === 1 || p.destacado === "true")
            .slice(0, 4)
            .map(product => {
              const imageUrl = product.imagen && !product.imagen.includes('http')
                ? `${DJANGO_BASE_URL}${DJANGO_MEDIA_PATH}${product.imagen}`
                : product.imagen;

              return {
                ...product,
                imagen: imageUrl,
                precio: parseFloat(product.precio) || 0,
                bgColor: product.bgColor || getCategoryColor(product.categoria)
              }
            })
          setFeaturedProducts(transformed)
        } else {
          setFeaturedProducts([])
        }
      } catch (error) {
        console.warn("Error API:", error.message)
        setFeaturedProducts([])
      } finally {
        setLoading(false)
      }
    }
    fetchFeaturedProducts()
  }, [])

  const handleAddToCart = (product) => {
    addToCart(product)
  }

  if (loading && featuredProducts.length === 0) {
    return <LoadingSpinner text="Cargando delicias..." />
  }

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">

      {/* --- HEADER --- */}
      <header className="fixed top-2 md:top-4 left-0 right-0 z-50 px-2 md:px-4">
        <div className="container mx-auto bg-[#009045] text-white rounded-2xl md:rounded-full shadow-2xl py-3 px-4 md:px-8 flex flex-wrap justify-between items-center border-b-[4px] border-[#007a3a] relative">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="bg-white p-0 rounded-full border-2 border-yellow-400 group-hover:rotate-12 transition-transform shadow-md w-12 h-12 overflow-hidden">
              <img src="/icons/DC.png" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div className="leading-tight hidden sm:block">
              <h1 className="text-xl font-black tracking-wide">DELICIAS</h1>
              <p className="text-xs text-yellow-300 font-bold">COLOMBIANAS</p>
            </div>
          </Link>

          {/* Menú Desktop */}
          <nav className="hidden lg:flex gap-8 font-black text-lg tracking-wide">
            {['Inicio', 'Productos', 'Nosotros', 'Contacto'].map((item) => (
              <Link
                key={item}
                href={item === 'Inicio' ? '/' : `/${item.toLowerCase()}`}
                className="hover:text-yellow-300 transition-all duration-300 relative group py-2"
              >
                {item.toUpperCase()}
                <span className="absolute bottom-0 left-0 w-0 h-1 bg-yellow-400 rounded-full group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </nav>

          {/* Acciones Derecha */}
          <div className="flex items-center gap-4 md:gap-6 shrink-0">
            {!user ? (
              <div className="hidden md:flex items-center gap-4 font-bold text-base">
                <Link href="/login" className="flex items-center gap-2 hover:text-yellow-300 transition-colors">
                  <LogIn size={18} /> Ingresar
                </Link>
                <Link href="/registro" className="bg-yellow-400 text-[#009045] px-5 py-2 rounded-full font-black hover:bg-white hover:scale-105 shadow-md transition-all">
                  Regístrate
                </Link>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3 font-bold text-sm">
                <div className="flex items-center gap-1 bg-[#007a3a] px-3 py-1 rounded-full">
                  <User size={16} className="text-yellow-300" />
                  <span className="truncate max-w-[100px]">{user.nombre}</span>
                </div>
                <button onClick={logout} className="hover:text-red-300 transition-colors"><LogOut size={18} /></button>
              </div>
            )}

            <Link href="/carrito" className="relative group hover:scale-110 transition-transform">
              <div className="bg-[#007a3a] p-2 md:px-4 md:py-2 rounded-full font-bold hover:bg-yellow-400 hover:text-[#009045] transition-all flex items-center gap-2">
                <ShoppingCart size={20} />
                {getCartItemsCount() > 0 && (
                  <span className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-red-600 text-white text-xs font-black w-5 h-5 md:w-6 md:h-6 flex items-center justify-center rounded-full border-2 border-white">
                    {getCartItemsCount()}
                  </span>
                )}
              </div>
            </Link>

            {/* BOTÓN HAMBURGUESA (MÓVIL) */}
            <button
              className="lg:hidden text-white p-2 hover:text-yellow-300 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* MENÚ DESPLEGABLE MÓVIL */}
          {mobileMenuOpen && (
            <div className="absolute top-full left-0 w-full mt-2 bg-[#009045] rounded-2xl shadow-xl border-t-4 border-yellow-400 overflow-hidden lg:hidden z-50 animate-fade-in">
              <div className="flex flex-col p-4 space-y-2">
                {['Inicio', 'Productos', 'Nosotros', 'Contacto'].map((item) => (
                  <Link
                    key={item}
                    href={item === 'Inicio' ? '/' : `/${item.toLowerCase()}`}
                    className="block py-3 px-4 rounded-xl hover:bg-[#007a3a] font-black text-lg transition-colors border-b border-[#007a3a] last:border-0"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.toUpperCase()}
                  </Link>
                ))}

                {/* Opciones extra para móvil */}
                {!user ? (
                  <div className="flex flex-col gap-2 pt-2 mt-2 border-t border-[#007a3a]">
                    <Link href="/login" className="py-2 px-4 hover:text-yellow-300 font-bold flex items-center gap-2"><LogIn size={18} /> Ingresar</Link>
                    <Link href="/registro" className="py-2 px-4 bg-yellow-400 text-[#009045] rounded-xl font-black text-center">Regístrate</Link>
                  </div>
                ) : (
                  <div className="flex items-center justify-between pt-4 mt-2 border-t border-[#007a3a] px-4">
                    <div className="flex items-center gap-2 font-bold"><User size={18} className="text-yellow-300" /> {user.nombre}</div>
                    <button onClick={logout} className="text-red-300 font-bold text-sm">Salir</button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative bg-[#009045] pt-32 md:pt-44 pb-32 rounded-br-[4rem] md:rounded-br-[8rem] shadow-xl z-20">
        <div className="container mx-auto px-4 relative z-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1 text-center md:text-left space-y-6">
              <ScrollReveal>
                <span className="inline-flex items-center gap-2 bg-yellow-400 text-[#009045] px-4 py-1 rounded-full font-black text-sm mb-4 transform -rotate-2 shadow-lg">
                  <Star size={16} fill="currentColor" /> ¡NUEVOS SABORES!
                </span>
                <h1 className="text-5xl md:text-7xl font-black text-white leading-tight drop-shadow-md">
                  Sabor Irresistible <br />
                  <span className="text-yellow-300">100% Colombiano</span>
                </h1>
                <p className="text-xl text-green-100 max-w-lg mx-auto md:mx-0 font-medium">
                  Descubre la tradición en cada mordida.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Link href="/productos" className="bg-white text-[#009045] px-8 py-4 rounded-full font-black text-lg shadow-lg hover:translate-y-1 transition-all flex items-center gap-2">
                    VER PRODUCTOS <ArrowRight size={20} strokeWidth={3} />
                  </Link>
                </div>
              </ScrollReveal>
            </div>
            <div className="flex-1 flex justify-center items-center relative">
              <div className="absolute w-[400px] h-[400px] bg-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>
              <img src="/productos/hero-brownie.png" alt="Brownie" className="w-full max-w-[500px] object-contain drop-shadow-2xl animate-[bounce_3s_infinite]" />
            </div>
          </div>
        </div>
      </section>

      {/* --- CARRUSEL: GALERÍA DE SABORES --- */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4 mb-10 text-center">
          <h3 className="text-3xl font-black text-[#4a3b32] uppercase tracking-wider flex items-center justify-center gap-3">
            <Utensils className="text-[#009045]" /> Galería de Sabores
          </h3>
        </div>

        <div className="container mx-auto px-4">
          {/* Marco del Carrusel */}
          <div className="relative w-full max-w-5xl mx-auto h-[400px] md:h-[450px] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white ring-4 ring-yellow-400/50">

            {carouselItems.map((item, index) => (
              <div
                key={item.id}
                className={`absolute inset-0 transition-transform duration-700 ease-in-out ${item.color} flex flex-col md:flex-row`}
                style={{ transform: `translateX(${(index - currentSlide) * 100}%)` }}
              >
                {/* Imagen */}
                <div className="w-full md:w-1/2 h-1/2 md:h-full relative bg-white/10 flex items-center justify-center p-6 overflow-hidden">
                  <div className="absolute w-64 h-64 bg-white/20 rounded-full blur-2xl"></div>
                  <img
                    src={item.image}
                    alt={item.title}
                    onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                    className="relative z-10 w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                  />
                  <div className="hidden absolute inset-0 flex-col items-center justify-center text-white/50 z-0">
                    <ImageOff size={64} />
                    <span className="text-sm font-bold mt-2">Imagen no disponible</span>
                  </div>
                </div>

                {/* Texto */}
                <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center items-start p-8 md:p-12 text-white">
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-4">
                    Destacado del Mes
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black mb-4 leading-none">{item.title}</h2>
                  <p className={`text-lg md:text-xl font-medium ${item.textColor} mb-8 leading-relaxed`}>{item.desc}</p>

                  <button className="bg-white text-gray-900 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-yellow-300 transition-colors flex items-center gap-2 group">
                    Ver Detalles <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}

            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-20">
              {carouselItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-3 rounded-full transition-all duration-300 shadow-sm ${currentSlide === index ? 'bg-white w-8' : 'bg-white/40 w-3 hover:bg-white/70'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN FAVORITOS --- */}
      <section className="py-20 bg-[#fffdf7]">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-[#4a3b32] mb-4">
                FAVORITOS <span className="text-[#009045]">DEL PÚBLICO</span>
              </h2>
              <div className="w-24 h-2 bg-yellow-400 mx-auto rounded-full"></div>
            </div>
          </ScrollReveal>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product, index) => (
                <ScrollReveal key={product.id} className={`delay-${index * 100}`}>
                  <div className="group relative bg-white rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border-2 border-transparent hover:border-yellow-400 h-full flex flex-col">
                    <div className={`h-48 ${product.bgColor || 'bg-gray-100'} flex items-center justify-center relative overflow-hidden`}>
                      {product.imagen ? (
                        <img src={product.imagen} alt={product.nombre} className="h-48 w-full object-cover object-center drop-shadow-lg group-hover:scale-110 transition-transform duration-500" />
                      ) : (
                        <div className="flex flex-col items-center text-gray-400 opacity-50"><ImageOff size={48} /></div>
                      )}
                    </div>
                    <div className="p-6 pt-10 text-center flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-black text-[#4a3b32] leading-tight mb-2 group-hover:text-[#009045] transition-colors">{product.nombre}</h3>
                        <p className="text-gray-500 text-sm mb-6 line-clamp-2 font-medium">{product.descripcion}</p>
                      </div>
                      <button onClick={() => handleAddToCart(product)} className="w-full bg-[#009045] text-white font-bold py-3 rounded-xl hover:bg-[#007a3a] transition-colors shadow-[0_4px_0_#006831] active:shadow-none active:translate-y-[4px] flex justify-center items-center gap-2">
                        <ShoppingCart size={18} /> AGREGAR
                      </button>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-red-50 rounded-3xl border-2 border-red-100">
              <p className="text-xl text-red-500 font-bold">No hay productos destacados por ahora.</p>
            </div>
          )}
        </div>
      </section>

      {/* --- PROMOCIONES Y SERVICIOS --- */}
      <section className="bg-[#4a3b32] pt-24 pb-24 relative overflow-visible rounded-tl-[4rem] md:rounded-tl-[8rem] z-10 -mt-10">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <ScrollReveal>
              <div className="bg-[#009045] rounded-[2rem] p-8 text-white h-full flex flex-col justify-between relative overflow-hidden group hover:scale-[1.02] transition-transform shadow-xl min-h-[300px]">
                <div className="absolute top-4 right-4 opacity-20"><Percent size={80} /></div>
                <div>
                  <h3 className="text-2xl font-black mb-4">¡Ofertas del Mes!</h3>
                  <p className="font-medium opacity-90 mb-6">Descuentos especiales en productos seleccionados.</p>
                </div>
                <button className="bg-white text-[#009045] font-bold py-3 px-6 rounded-full w-max hover:bg-yellow-400 transition-colors flex items-center gap-2">
                  VER DESCUENTOS <Tag size={18} />
                </button>
              </div>
            </ScrollReveal>

            <ScrollReveal className="delay-100">
              <div className="bg-yellow-400 rounded-[2rem] p-8 text-[#4a3b32] h-full flex flex-col justify-between relative overflow-hidden group hover:scale-[1.02] transition-transform shadow-xl min-h-[300px]">
                <div>
                  <span className="bg-[#4a3b32] text-yellow-400 text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">POPULAR</span>
                  <h3 className="text-3xl font-black mb-4 leading-none">Catering y Eventos</h3>
                  <p className="font-bold text-lg mb-6">Atendemos tus reuniones empresariales.</p>
                </div>
                <div className="absolute right-4 bottom-20 opacity-50"><Utensils size={80} /></div>
                <button className="bg-[#4a3b32] text-white font-bold py-3 px-6 rounded-full w-full hover:bg-opacity-90 transition-colors mt-auto z-10 relative">
                  COTIZAR AHORA
                </button>
              </div>
            </ScrollReveal>

            <ScrollReveal className="delay-200">
              <div className="bg-[#9c27b0] rounded-[2rem] p-8 text-white h-full flex flex-col justify-between relative overflow-hidden group hover:scale-[1.02] transition-transform shadow-xl min-h-[300px]">
                <div>
                  <h3 className="text-2xl font-black mb-4">Envíos a Domicilio</h3>
                  <p className="font-medium opacity-90 mb-6">Llegamos a la puerta de tu casa en tiempo récord.</p>
                </div>
                <div className="absolute bottom-4 right-4 opacity-20"><Truck size={100} /></div>
                <button className="bg-white text-[#9c27b0] font-bold py-3 px-6 rounded-full w-max hover:bg-yellow-400 hover:text-white transition-colors flex items-center gap-2">
                  PEDIR YA <ChevronRight size={18} />
                </button>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-green-700 text-white py-12 mt-auto">
        <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contactanos */}
          <div>
            <h3 className="text-xl font-bold mb-4 pb-2 border-b border-green-600">Contáctanos</h3>
            <p className="mb-2">Desde celular a nivel nacional</p>
            <p className="font-bold text-yellow-300 text-lg mb-4">601 486 5000</p>
            <p className="text-sm mb-4">Opción 1: Ventas<br />Opción 3: Posventa</p>
            <p className="mb-2">Línea Whatsapp</p>
            <p className="font-bold text-yellow-300 text-lg">311 2281010</p>
          </div>

          {/* Nosotros */}
          <div>
            <h3 className="text-xl font-bold mb-4 pb-2 border-b border-green-600">Nosotros</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-yellow-300">Quiénes somos</a></li>
              <li><a href="#" className="hover:text-yellow-300">Nuestra Historia</a></li>
              <li><a href="#" className="hover:text-yellow-300">Negocios Institucionales</a></li>
              <li><a href="#" className="hover:text-yellow-300">Sostenibilidad</a></li>
              <li><a href="#" className="hover:text-yellow-300">Noticias</a></li>
              <li><a href="#" className="hover:text-yellow-300">Trabaja con nosotros</a></li>
            </ul>
          </div>

          {/* Legales & Servicios (Combined for brevity, can be separated) */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-xl font-bold mb-4 pb-2 border-b border-green-600">Legales</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-yellow-300">Aviso de privacidad</a></li>
                <li><a href="#" className="hover:text-yellow-300">Políticas</a></li>
                <li><a href="#" className="hover:text-yellow-300">Términos y condiciones</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 pb-2 border-b border-green-600">Servicios</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-yellow-300">Domicilios</a></li>
                <li><a href="#" className="hover:text-yellow-300">Retiro en tienda</a></li>
              </ul>
            </div>
          </div>

          {/* Club & Social */}
          <div>
            <h3 className="text-xl font-bold mb-4 pb-2 border-b border-green-600">Club Delicias</h3>
            <ul className="space-y-2 mb-6">
              <li><a href="#" className="hover:text-yellow-300">Inscríbete</a></li>
              <li><a href="#" className="hover:text-yellow-300">Beneficios</a></li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="bg-white text-green-700 p-2 rounded-full hover:bg-yellow-300 transition"><Facebook size={20} /></a>
              <a href="#" className="bg-white text-green-700 p-2 rounded-full hover:bg-yellow-300 transition"><Instagram size={20} /></a>
              <a href="#" className="bg-white text-green-700 p-2 rounded-full hover:bg-yellow-300 transition"><Linkedin size={20} /></a>
              <a href="#" className="bg-white text-green-700 p-2 rounded-full hover:bg-yellow-300 transition"><Youtube size={20} /></a>
              <a href="#" className="bg-white text-green-700 p-2 rounded-full hover:bg-yellow-300 transition"><MessageCircle size={20} /></a>
            </div>
          </div>
        </div>
        <div className="text-center text-sm mt-10 pt-4 border-t border-green-600">
          <p>© 2023 Delicias Colombianas. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}