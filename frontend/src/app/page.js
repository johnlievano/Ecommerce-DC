'use client'
import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import Link from 'next/link'
import LoadingSpinner from '../components/LoadingSpinner'
import { apiService } from '../services/ApiService'
import ScrollReveal from '../components/ScrollReveal'

import {
  ShoppingCart, User, LogIn, LogOut,
  Star, Truck, Tag, Percent, ArrowRight,
  Menu, X, Utensils, ImageOff, ChevronRight, XCircle, Heart,
  MapPin, Gift, Search, CreditCard, Box, Quote, MessageCircle
} from 'lucide-react'

const DJANGO_BASE_URL = 'http://127.0.0.1:8000';
const DJANGO_MEDIA_PATH = '/media/';

export default function Home() {
  // --- ESTADOS ---
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [bannerItems, setBannerItems] = useState([]) // Estado para el slider dinámico
  const [loading, setLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentHeroImg, setCurrentHeroImg] = useState(0)
  const [modalOpen, setModalOpen] = useState({ isOpen: false, title: '', desc: '' })

  const { addToCart, getCartItemsCount } = useCart()
  const { user, logout } = useAuth()

  // Rutas actualizadas basadas en los archivos locales
  const heroImages = [
    "/productos/empanada.png",
    "/productos/cafe.png",
    "/productos/chicharron.png",
    "/productos/queso.png"
  ];

  // Rotación cada 10 segundos
  useEffect(() => {
    const heroTimer = setInterval(() => {
      setCurrentHeroImg((prev) => (prev + 1) % heroImages.length)
    }, 10000) 
    return () => clearInterval(heroTimer)
  }, [heroImages.length])

  // Rutas actualizadas para el carrusel
  const carouselItems = [
    { id: 1, title: "Café de Origen", desc: "Aroma y cuerpo del Eje Cafetero directo a tu taza.", image: "/productos/cafe.png", color: "bg-amber-600", textColor: "text-amber-100" },
    { id: 2, title: "Galletas Tradicionales", desc: "El final dulce perfecto para cualquier comida.", image: "/productos/galletas.png", color: "bg-pink-500", textColor: "text-pink-100" },
    { id: 3, title: "Queso Fresco", desc: "Suavidad y sabor de campo auténtico.", image: "/productos/queso.png", color: "bg-blue-500", textColor: "text-blue-100" },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [carouselItems.length])

  useEffect(() => {
    if (bannerItems.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerItems.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [bannerItems])

  // 2. Fetch de Datos (Productos y Banners)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const data = await apiService.getProducts()
        if (data && Array.isArray(data)) {
          const transformed = data
            .filter(p => p.destacado === true || p.destacado === 1 || p.destacado === "true")
            .slice(0, 4)
            .map(product => ({
              ...product,
              imagen: product.imagen && !product.imagen.includes('http')
                ? `${DJANGO_BASE_URL}${DJANGO_MEDIA_PATH}${product.imagen}`
                : product.imagen,
              precio: parseFloat(product.precio) || 0
            }))
          setFeaturedProducts(transformed)
        }


        // B. Cargar Banners (Slider)
        let bannersData = [];
        try {
          // bannersData ahora es el array limpio (Array(1))
          bannersData = await apiService.getBanners();

          // 1. PROCESAR Y APLICAR DATOS
          if (bannersData && bannersData.length > 0) {
            const processedBanners = bannersData.map(b => ({
              ...b,
              // Aseguramos que la URL de la imagen esté completa
              imagen: b.imagen && !b.imagen.includes('http')
                ? `${DJANGO_BASE_URL}${DJANGO_MEDIA_PATH}${b.imagen}`
                : b.imagen,
              // Usamos los campos del modelo
              titulo: b.titulo,
              color_fondo: b.color_fondo,
              color_texto: b.color_texto,
              texto_boton: b.texto_boton,
              enlace: b.enlace
            }));
            setBannerItems(processedBanners);
          } else {
            setBannerItems([]);
          }

        } catch (error) {
          // Si la API falla por completo, el slider se queda vacío pero ya no da 404
          console.error("Error cargando Banners desde API:", error);
          setBannerItems([]);
        }
        // ...

      } catch (error) {
        console.warn("Error API:", error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const openModal = (title, desc) => setModalOpen({ isOpen: true, title, desc })
  const handleAddToCart = (product) => addToCart(product)

  const pasosFunciona = [
    { icon: Search, title: "1. Explora", desc: "Navega por nuestras categorías dulces y antojos." },
    { icon: ShoppingCart, title: "2. Agrega", desc: "Llena tu carrito con tus productos favoritos." },
    { icon: CreditCard, title: "3. Paga Fácil", desc: "Métodos seguros y rápidos de pago online." },
    { icon: Box, title: "4. Recibe", desc: "¡Disfruta del sabor tradicional en tu puerta!" },
  ];

  const testimonios = [
    { name: "Carolina G.", quote: "¡Las empanadas llegaron calientes y crocantes, el sabor es idéntico al de mi abuela!" },
    { name: "Juan P.", quote: "El café de origen tiene un aroma increíble. Mi pedido llegó súper rápido." },
    { name: "Luisa F.", quote: "Dulces deliciosos y muy bien empacados. Me encantó la experiencia." },
  ];

  if (loading && featuredProducts.length === 0) return <LoadingSpinner text="Cargando delicias..." />

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden relative flex flex-col">
      {/* MODAL GLOBAL */}
      {modalOpen.isOpen && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-[2rem] p-8 max-w-sm w-full shadow-2xl border-4 border-yellow-400 relative">
            <div className="flex justify-between items-center mb-4 border-b-2 border-green-100 pb-2">
              <h3 className="text-2xl font-black text-[#4a3b32]">{modalOpen.title}</h3>
              <button onClick={() => setModalOpen({ isOpen: false, title: '', desc: '' })} className="hover:rotate-90 transition-transform">
                <XCircle size={28} className="text-gray-400 hover:text-red-500" />
              </button>
            </div>
            <p className="text-gray-600 font-medium mb-6 leading-relaxed">{modalOpen.desc}</p>
            <button onClick={() => setModalOpen({ isOpen: false, title: '', desc: '' })} className="w-full bg-[#009045] text-white font-black py-3 rounded-xl shadow-lg hover:bg-[#007a3a] transition-colors">Entendido</button>
          </div>
        </div>
      )}

      {/* HEADER */}
      <header className="fixed top-2 md:top-4 left-0 right-0 z-50 px-2 md:px-4">
        <div className="container mx-auto bg-[#009045] text-white rounded-2xl md:rounded-full shadow-2xl py-3 px-4 md:px-8 flex justify-between items-center border-b-[4px] border-[#007a3a]">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-white p-0 rounded-full border-2 border-yellow-400 group-hover:rotate-12 transition-transform shadow-md w-12 h-12 overflow-hidden">
              <img src="/icons/DC.png" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div className="leading-tight hidden sm:block">
              <h1 className="text-xl font-black tracking-wide">DELICIAS</h1>
              <p className="text-xs text-yellow-300 font-bold">COLOMBIANAS</p>
            </div>
          </Link>
          <nav className="hidden lg:flex gap-8 font-black text-lg">
            {['Inicio', 'Productos', 'Nosotros', 'Contacto'].map((item) => (
              <Link key={item} href={item === 'Inicio' ? '/' : `/${item.toLowerCase()}`} className="hover:text-yellow-300 transition-all py-2">{item.toUpperCase()}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/carrito" className="relative bg-[#007a3a] p-2 md:px-4 rounded-full font-bold hover:bg-yellow-400 hover:text-[#009045] transition-all flex items-center gap-2">
              <ShoppingCart size={20} />
              {getCartItemsCount() > 0 && <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">{getCartItemsCount()}</span>}
            </Link>
            <button className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>{mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}</button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative bg-[#009045] pt-44 pb-32 rounded-br-[4rem] md:rounded-br-[8rem] shadow-xl z-10 border-b-8 border-yellow-400">
        <div className="container mx-auto px-4 relative z-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1 text-center md:text-left space-y-6">
              <ScrollReveal>
                <span className="inline-flex items-center gap-2 bg-white text-[#009045] px-5 py-1.5 rounded-full font-black text-sm mb-4 shadow-lg ring-4 ring-yellow-400"><Heart size={16} className="text-red-500" fill="currentColor" /> EL SABOR DE NUESTRA TIERRA</span>
                <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">Sabor Irresistible <br /><span className="text-yellow-300">100% Colombiano</span></h1>
                <p className="text-xl text-green-100 max-w-lg mx-auto md:mx-0 font-medium">Lo mejor de nuestra tradición para alegrar cada uno de tus días.</p>
                <div className="pt-6">
                  {/* Botón mejorado */}
                  <Link href="/productos" className="group bg-yellow-400 text-[#009045] px-10 py-4 rounded-full font-black text-lg shadow-lg hover:bg-yellow-300 hover:scale-105 hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 w-max mx-auto md:mx-0">
                    DESCUBRE EL SABOR <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </ScrollReveal>
            </div>
            <div className="flex-1 flex justify-center items-center relative h-[450px] w-full max-w-[500px]">
              <div className="absolute w-[400px] h-[400px] bg-yellow-400/30 rounded-full blur-3xl animate-pulse"></div>
              {heroImages.map((img, index) => (
                <img key={index} src={img} alt="Hero" className={`absolute w-full h-full object-contain drop-shadow-2xl transition-all duration-1000 ${index === currentHeroImg ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 mb-16 text-center">
          <ScrollReveal>
            <h3 className="text-4xl font-black text-[#4a3b32] flex items-center justify-center gap-4"><Utensils className="text-[#009045]" /> Pide tu Antojo en 4 Pasos</h3>
            <div className="w-32 h-2 bg-yellow-400 mx-auto mt-2 rounded-full"></div>
          </ScrollReveal>
        </div>
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {pasosFunciona.map((paso, i) => (
            <ScrollReveal key={i} className={`delay-${i * 150}`}>
              <div className="bg-[#fffdf7] border-4 border-yellow-100 rounded-[2.5rem] p-8 text-center h-full hover:border-yellow-300 transition-all">
                <div className="bg-yellow-400 text-[#009045] p-6 rounded-full mb-6 inline-block"><paso.icon size={40} /></div>
                <h4 className="text-2xl font-black text-[#4a3b32] mb-3">{paso.title}</h4>
                <p className="text-gray-600 font-medium text-sm leading-relaxed">{paso.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* SECCIÓN FAVORITOS */}
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
                    <div className="h-48 bg-gray-50 flex items-center justify-center relative overflow-hidden">
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

      {/* GALERÍA DE SABORES */}
      <section className="py-24 bg-green-50 overflow-hidden">
        <div className="container mx-auto px-4 mb-12 text-center"><h3 className="text-4xl font-black text-[#4a3b32] flex items-center justify-center gap-4"><Star className="text-yellow-400" fill="currentColor" /> Galería de Sabores</h3><div className="w-32 h-2.5 bg-[#009045] mx-auto mt-2 rounded-full"></div></div>
        <div className="container mx-auto px-4">
          <div className="relative w-full max-w-5xl mx-auto h-[480px] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white ring-8 ring-green-100/50">
            {carouselItems.map((item, index) => (
              <div key={item.id} className={`absolute inset-0 transition-transform duration-700 ease-in-out ${item.color} flex flex-col md:flex-row`} style={{ transform: `translateX(${(index - currentSlide) * 100}%)` }}>
                <div className="w-full md:w-1/2 h-1/2 md:h-full relative bg-white/20 flex items-center justify-center p-10">
                  <img src={item.image} alt={item.title} className="relative z-10 w-full h-full object-contain drop-shadow-2xl" />
                </div>
                <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center items-start p-10 md:p-14 text-white">
                  <div className="bg-white/30 px-5 py-1.5 rounded-full text-xs font-black uppercase mb-5">Recomendado Dulce</div>
                  <h2 className="text-3xl md:text-5xl font-black mb-5 leading-tight">{item.title}</h2>
                  <p className={`text-lg font-medium ${item.textColor} mb-10 leading-relaxed`}>{item.desc}</p>
                  <Link href="/productos" className="bg-white text-gray-900 font-black py-3 px-10 rounded-full shadow-lg hover:bg-yellow-300 transition-all flex items-center gap-2">Ver Detalles <ArrowRight size={18} /></Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROMOCIONES FIJAS (Con borde superior curvo recuperado) */}
      <section className="bg-[#4a3b32] pt-36 pb-32 border-t-8 border-yellow-400 rounded-tl-[4rem] md:rounded-tl-[8rem] relative z-20 -mt-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
          <ScrollReveal>
            <div className="bg-[#009045] rounded-[2.5rem] p-10 border-4 border-[#00a850] min-h-[400px] flex flex-col shadow-xl">
              <Percent size={60} className="mb-4 opacity-50" />
              <h3 className="text-2xl font-black mb-4">Ofertas del Mes</h3>
              <p className="font-medium mb-8">Hasta 20% de descuento en postres tradicionales cada fin de semana.</p>
              <button onClick={() => openModal('Descuentos Activos', 'Aplica el código FINDE20 al hacer checkout para un 20% en postres y 2x1 en bebidas.')} className="mt-auto bg-white text-[#009045] font-black py-3 rounded-xl hover:bg-yellow-300 transition-all">VER DESCUENTOS</button>
            </div>
          </ScrollReveal>
          <ScrollReveal className="delay-150">
            <div className="bg-yellow-400 text-[#4a3b32] rounded-[2.5rem] p-10 border-4 border-white min-h-[400px] flex flex-col shadow-xl">
              <Utensils size={60} className="mb-4 opacity-50" />
              <h3 className="text-3xl font-black mb-4">Catering</h3>
              <p className="font-bold text-lg mb-8">Llevamos pasabocas tradicionales a tus eventos empresariales y fiestas.</p>
              <button onClick={() => openModal('Servicio de Catering', 'Comunícate al WhatsApp: 311 2281010 para cotizaciones personalizadas según tu volumen de invitados.')} className="mt-auto bg-[#4a3b32] text-white font-black py-3 rounded-xl hover:bg-opacity-90 transition-colors">COTIZAR AHORA</button>
            </div>
          </ScrollReveal>
          <ScrollReveal className="delay-300">
            <div className="bg-[#9c27b0] rounded-[2.5rem] p-10 border-4 border-[#b149c4] min-h-[400px] flex flex-col shadow-xl">
              <Truck size={60} className="mb-4 opacity-50" />
              <h3 className="text-2xl font-black mb-4">Envíos Rápidos</h3>
              <p className="font-medium mb-8">Empaques especiales que garantizan frescura en la puerta de tu casa.</p>
              <button onClick={() => openModal('Cobertura de Envíos', 'Entregas garantizadas en Bogotá en menos de 60 minutos. Costo de envío calculado al finalizar la compra.')} className="mt-auto bg-white text-[#9c27b0] font-black py-3 rounded-xl hover:bg-yellow-300 transition-all">VER COBERTURA</button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* TESTIMONIOS (Mejorado con Hover) */}
      <section className="py-24 bg-[#fffdf7]">
        <div className="container mx-auto px-4 mb-16 text-center">
          <ScrollReveal><h3 className="text-4xl font-black text-[#4a3b32] flex items-center justify-center gap-4"><MessageCircle className="text-[#009045]" /> Clientes Felices</h3><div className="w-32 h-2 bg-yellow-400 mx-auto mt-2 rounded-full"></div></ScrollReveal>
        </div>
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonios.map((tes, i) => (
            <ScrollReveal key={i} className={`delay-${i * 150}`}>
              <div className="bg-white rounded-[2.5rem] p-10 shadow-lg border-2 border-transparent hover:border-yellow-400 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 relative cursor-default">
                <Quote className="absolute top-6 left-6 text-yellow-300 opacity-30" size={60} />
                <div className="flex text-yellow-400 mb-6 gap-1 relative z-10"><Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" /></div>
                <p className="text-gray-700 italic mb-8 relative z-10 font-medium">"{tes.quote}"</p>
                <p className="font-black text-[#4a3b32] border-t pt-4 border-gray-100">{tes.name}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* HISTORIA (Imagen Unsplash) */}
      <section className="py-28 bg-white overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-16">
          <ScrollReveal className="flex-1 w-full">
            <div className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white ring-8 ring-green-50 min-h-[350px] relative">
              <img 
                src="/images/herencia.webp" 
                alt="Herencia Colombiana" 
                className="absolute inset-0 w-full h-full object-cover hover:scale-110 transition-transform duration-700" 
              />
            </div>
          </ScrollReveal>
          <ScrollReveal className="flex-1 space-y-6 delay-200">
            <h3 className="text-4xl md:text-5xl font-black text-[#4a3b32]">Dulce Herencia <br /><span className="text-[#009045]">Colombiana</span></h3>
            <p className="text-lg text-gray-700 font-medium">Nacimos del sueño de compartir recetas ancestrales preparadas con amor. Cada bocado es un viaje directo a los hogares más tradicionales de Colombia.</p>
            <Link href="/nosotros" className="bg-[#009045] text-white px-10 py-4 rounded-full font-black text-lg shadow-lg hover:scale-105 transition-transform flex items-center gap-3 w-max">CONOCE NUESTRA HISTORIA <ChevronRight size={20}/></Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}