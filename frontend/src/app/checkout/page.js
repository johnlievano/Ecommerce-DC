'use client'
import { useState, useEffect } from 'react'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import LoadingSpinner from '../../components/LoadingSpinner'

// 1. IMPORTAR ICONOS (Lucide React)
import { 
  ShoppingCart, User, MapPin, Clock, Phone, Mail, 
  Facebook, Instagram, Youtube, Quote, Menu, X, LogIn, LogOut,
  CreditCard, Banknote, Truck, CheckCircle, ShieldCheck, ArrowRight, Home,
  Box, Sun, Cloud
} from 'lucide-react'

const DJANGO_BASE_URL = 'http://127.0.0.1:8000';
const DJANGO_MEDIA_PATH = '/media/';

// --- MODAL DE ÉXITO DE COMPRA ---
const OrderSuccessModal = ({ isOpen, onClose, total }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-[2.5rem] max-w-md w-full p-8 text-center shadow-2xl relative animate-slide-up border-t-8 border-[#009045]">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-[#009045]" strokeWidth={3} />
        </div>
        <h2 className="text-3xl font-black text-gray-800 mb-2">¡Pedido Recibido!</h2>
        <p className="text-gray-500 font-medium mb-8">
          Gracias por tu compra. Hemos enviado la confirmación a tu correo electrónico.
        </p>
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
           <p className="text-xs text-gray-500 uppercase font-bold mb-1">Total Pagado</p>
           <p className="text-2xl font-black text-[#009045]">${total.toLocaleString()}</p>
        </div>
        <Link href="/">
          <button onClick={onClose} className="w-full bg-[#009045] text-white font-bold py-4 rounded-full hover:bg-[#007a3a] transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
            <Home size={20} /> Volver al Inicio
          </button>
        </Link>
      </div>
    </div>
  )
}

export default function Checkout() {
  const { cart, getCartTotal, clearCart, getCartItemsCount } = useCart()
  const { user, logout } = useAuth()
  const router = useRouter()
  
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  // Estado del formulario
  const [formData, setFormData] = useState({
    nombre: user?.nombre || '',
    email: user?.email || '',
    telefono: user?.telefono || '',
    direccion: user?.direccion || '',
    ciudad: 'Bogotá',
    notas: ''
  })

  // Estado del método de pago
  const [paymentMethod, setPaymentMethod] = useState('nequi')
  
  // Estado para el total final
  const [lastOrderTotal, setLastOrderTotal] = useState(0)

  useEffect(() => {
    // Si el carrito está vacío, redirigir a productos
    if (cart.length === 0 && !success) {
      router.push('/productos')
    }
  }, [cart, router, success])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulación de envío a API
    try {
        const totalCalculated = getCartTotal() * 1.19 // Total con IVA simulado
        setLastOrderTotal(totalCalculated)
        
        // Aquí iría: await apiService.createOrder({ ...formData, cart, paymentMethod })
        await new Promise(resolve => setTimeout(resolve, 2000)) // Simular espera
        
        setSuccess(true)
        clearCart()
    } catch (error) {
        console.error("Error al crear pedido", error)
    } finally {
        setLoading(false)
    }
  }

  if (loading) return <LoadingSpinner text="Procesando tu pedido..." />

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 flex flex-col">

      {/* --- HEADER --- */}
      <header className="fixed top-2 md:top-4 left-0 right-0 z-50 px-2 md:px-4">
        <div className="container mx-auto bg-[#009045] text-white rounded-2xl md:rounded-full shadow-2xl py-3 px-4 md:px-8 flex flex-wrap justify-between items-center border-b-[4px] border-[#007a3a] relative">
            
            <Link href="/" className="flex items-center gap-2 group shrink-0">
              <div className="bg-white p-0 rounded-full border-2 border-yellow-400 group-hover:rotate-12 transition-transform shadow-md w-12 h-12 overflow-hidden">
                <img src="/icons/DC.png" alt="Logo" className="w-full h-full object-cover" />
              </div>
              <div className="leading-tight hidden sm:block">
                <h1 className="text-xl font-black tracking-wide">DELICIAS</h1>
                <p className="text-xs text-yellow-300 font-bold">COLOMBIANAS</p>
              </div>
            </Link>

            <nav className="hidden lg:flex gap-8 font-black text-lg tracking-wide">
              {['Inicio', 'Productos', 'Nosotros', 'Contacto'].map((item) => (
                <Link key={item} href={item === 'Inicio' ? '/' : `/${item.toLowerCase()}`} className="hover:text-yellow-300 transition-all duration-300 relative group py-2">
                  {item.toUpperCase()}
                  <span className="absolute bottom-0 left-0 w-0 h-1 bg-yellow-400 rounded-full group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4 md:gap-6 shrink-0">
              {!user ? (
                <div className="hidden md:flex items-center gap-4 font-bold text-base">
                  <Link href="/login" className="flex items-center gap-2 hover:text-yellow-300 transition-colors"><LogIn size={18} /> Ingresar</Link>
                  <Link href="/registro" className="bg-yellow-400 text-[#009045] px-5 py-2 rounded-full font-black hover:bg-white hover:scale-105 shadow-md transition-all">Regístrate</Link>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-3 font-bold text-sm">
                  <div className="flex items-center gap-1 bg-[#007a3a] px-3 py-1 rounded-full"><User size={16} className="text-yellow-300"/><span className="truncate max-w-[100px]">{user.nombre}</span></div>
                  <button onClick={logout} className="hover:text-red-300 transition-colors"><LogOut size={18}/></button>
                </div>
              )}
              
              <Link href="/carrito" className="relative group hover:scale-110 transition-transform">
                <div className="bg-[#007a3a] p-2 md:px-4 md:py-2 rounded-full font-bold hover:bg-yellow-400 hover:text-[#009045] transition-all flex items-center gap-2">
                  <ShoppingCart size={20} />
                  {getCartItemsCount() > 0 && <span className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-red-600 text-white text-xs font-black w-5 h-5 md:w-6 md:h-6 flex items-center justify-center rounded-full border-2 border-white">{getCartItemsCount()}</span>}
                </div>
              </Link>

              {/* Botón Móvil */}
              <button 
                className="lg:hidden text-white p-2 hover:text-yellow-300 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>

            {/* Menú Móvil */}
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
                  
                  {!user ? (
                     <div className="flex flex-col gap-2 pt-2 mt-2 border-t border-[#007a3a]">
                        <Link href="/login" className="py-2 px-4 hover:text-yellow-300 font-bold flex items-center gap-2"><LogIn size={18}/> Ingresar</Link>
                        <Link href="/registro" className="py-2 px-4 bg-yellow-400 text-[#009045] rounded-xl font-black text-center">Regístrate</Link>
                     </div>
                  ) : (
                     <div className="flex items-center justify-between pt-4 mt-2 border-t border-[#007a3a] px-4">
                        <div className="flex items-center gap-2 font-bold"><User size={18} className="text-yellow-300"/> {user.nombre}</div>
                        <button onClick={logout} className="text-red-300 font-bold text-sm">Salir</button>
                     </div>
                  )}
                </div>
              </div>
            )}
          </div>
      </header>

      {/* --- HERO TITLE (Estilo Page, sin olas) --- */}
      <section className="relative bg-[#009045] pt-32 md:pt-44 pb-24 rounded-br-[4rem] md:rounded-br-[8rem] shadow-xl z-20">
        <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-md">
               Finalizar <span className="text-yellow-300">Compra</span>
            </h1>
            <p className="text-xl text-green-100 font-medium">
               Estás a un paso de disfrutar.
            </p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12 flex-1 -mt-10 relative z-30">
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            
            {/* --- COLUMNA IZQUIERDA: DATOS Y PAGO --- */}
            <div className="lg:col-span-2 space-y-8">
                
                {/* 1. Datos de Envío */}
                <div className="bg-white rounded-[2.5rem] shadow-xl p-8 border border-gray-100">
                    <h2 className="text-2xl font-black text-gray-800 mb-6 flex items-center gap-3">
                        <span className="bg-[#009045] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                        Datos de Envío
                    </h2>
                    
                    <div className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 ml-2">Nombre Completo</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-3.5 text-gray-400" size={20} />
                                    <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl py-3 pl-12 pr-4 focus:border-[#009045] focus:bg-white transition-all outline-none font-medium" placeholder="Tu nombre" required />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 ml-2">Teléfono</label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-3.5 text-gray-400" size={20} />
                                    <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl py-3 pl-12 pr-4 focus:border-[#009045] focus:bg-white transition-all outline-none font-medium" placeholder="Tu teléfono" required />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 ml-2">Correo Electrónico</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-3.5 text-gray-400" size={20} />
                                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl py-3 pl-12 pr-4 focus:border-[#009045] focus:bg-white transition-all outline-none font-medium" placeholder="tu@email.com" required />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 ml-2">Dirección de Entrega</label>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-3.5 text-gray-400" size={20} />
                                <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl py-3 pl-12 pr-4 focus:border-[#009045] focus:bg-white transition-all outline-none font-medium" placeholder="Calle 123 # 45-67" required />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 ml-2">Notas del Pedido (Opcional)</label>
                            <textarea name="notas" value={formData.notas} onChange={handleChange} className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-5 py-3 focus:border-[#009045] focus:bg-white transition-all outline-none resize-none font-medium" placeholder="Ej: Dejar en portería, timbre dañado..." rows="2"></textarea>
                        </div>
                    </div>
                </div>

                {/* 2. Método de Pago */}
                <div className="bg-white rounded-[2.5rem] shadow-xl p-8 border border-gray-100">
                    <h2 className="text-2xl font-black text-gray-800 mb-6 flex items-center gap-3">
                        <span className="bg-[#009045] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                        Método de Pago
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Opción 1: Nequi / Transferencia */}
                        <div 
                            onClick={() => setPaymentMethod('nequi')}
                            className={`cursor-pointer p-6 rounded-2xl border-2 transition-all flex flex-col items-center text-center gap-3 relative ${paymentMethod === 'nequi' ? 'border-[#009045] bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}
                        >
                            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-1">
                                <CreditCard size={24} />
                            </div>
                            <h3 className="font-bold text-gray-800">Transferencia / Nequi</h3>
                            <p className="text-xs text-gray-500">Paga seguro desde tu celular.</p>
                            {paymentMethod === 'nequi' && <CheckCircle size={20} className="text-[#009045] absolute top-4 right-4" />}
                        </div>

                        {/* Opción 2: Contra Entrega */}
                        <div 
                            onClick={() => setPaymentMethod('contraentrega')}
                            className={`cursor-pointer p-6 rounded-2xl border-2 transition-all flex flex-col items-center text-center gap-3 relative ${paymentMethod === 'contraentrega' ? 'border-[#009045] bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}
                        >
                            <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-1">
                                <Banknote size={24} />
                            </div>
                            <h3 className="font-bold text-gray-800">Pago Contra Entrega</h3>
                            <p className="text-xs text-gray-500">Paga en efectivo al recibir.</p>
                            {paymentMethod === 'contraentrega' && <CheckCircle size={20} className="text-[#009045] absolute top-4 right-4" />}
                        </div>
                    </div>
                </div>

            </div>

            {/* --- COLUMNA DERECHA: RESUMEN (Sticky) --- */}
            <div className="lg:col-span-1">
                <div className="bg-[#009045] rounded-[2.5rem] shadow-2xl p-8 text-white sticky top-32 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-bl-full pointer-events-none"></div>

                    <h2 className="text-2xl font-black mb-6 border-b border-white/20 pb-4 flex items-center gap-2">
                       <Box size={24} /> Tu Pedido
                    </h2>

                    {/* Lista mini de productos CON IMAGENES */}
                    <div className="max-h-60 overflow-y-auto custom-scrollbar mb-6 pr-2 space-y-4">
                        {cart.map((item) => (
                            <div key={item.id} className="flex justify-between items-center text-sm bg-[#007a3a] p-3 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white rounded-lg overflow-hidden flex items-center justify-center shrink-0">
                                       <img 
                                          src={item.imagen && !item.imagen.includes('http') ? `${DJANGO_BASE_URL}${DJANGO_MEDIA_PATH}${item.imagen}` : item.imagen}
                                          alt={item.nombre} 
                                          className="w-full h-full object-cover"
                                       />
                                    </div>
                                    <div className="flex flex-col">
                                       <span className="font-medium truncate max-w-[120px] text-white">{item.nombre}</span>
                                       <span className="text-xs text-green-200">Cant: {item.quantity}</span>
                                    </div>
                                </div>
                                <span className="font-bold">${(item.precio * item.quantity).toLocaleString()}</span>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-4 mb-8 text-green-100 font-medium text-lg border-t border-white/20 pt-4">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span className="text-white font-bold">${getCartTotal().toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Envío</span>
                            <span className="text-yellow-300 font-bold flex items-center gap-1"><Truck size={16}/> Gratis</span>
                        </div>
                        <div className="border-t border-white/20 pt-4 mt-4">
                            <div className="flex justify-between text-3xl font-black text-white">
                                <span>Total</span>
                                <span>${getCartTotal().toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-white text-[#009045] py-4 rounded-full font-black text-lg hover:bg-yellow-400 hover:text-white transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? 'PROCESANDO...' : ( <>CONFIRMAR PEDIDO <CheckCircle size={20} className="group-hover:scale-110 transition-transform" /></> )}
                    </button>

                    <div className="mt-6 flex items-center justify-center gap-2 text-xs text-green-100 opacity-80">
                        <ShieldCheck size={14} /> Tus datos están protegidos con SSL.
                    </div>
                </div>
            </div>

        </form>

        <OrderSuccessModal isOpen={success} onClose={() => setSuccess(false)} total={lastOrderTotal} />

      </main>

      {/* --- FOOTER COMPLETO (Idéntico al de Home) --- */}
      <footer className="bg-[#009045] text-white pt-16 relative overflow-hidden font-sans border-t-[8px] border-yellow-400 mt-auto">
        
        {/* Decoraciones de fondo (Lucide) */}
        <div className="absolute top-10 right-10 text-yellow-300 animate-pulse hidden lg:block opacity-40">
           <Sun size={80} strokeWidth={1.5} />
        </div>
        <div className="absolute top-20 left-10 text-white opacity-20 hidden lg:block">
           <Cloud size={100} fill="currentColor" />
        </div>

        <div className="container mx-auto px-4 pb-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-1 flex justify-center lg:justify-start">
              <img
                src="/icons/shop_footer.png" 
                alt="Tienda Delicias Colombianas"
                className="w-full h-full object-contain max-w-[250px] drop-shadow-xl transform hover:scale-110 transition-transform cursor-pointer"
              />
            </div>
            <div className="lg:col-span-1">
              <h3 className="font-black text-xl mb-6 flex items-center gap-2"><MapPin size={24} className="text-yellow-300" /> Punto de fábrica</h3>
              <div className="space-y-2 font-medium text-green-50"><p className="font-bold text-white">Dirección</p><p>Bogotá - Colombia</p></div>
            </div>
            <div className="lg:col-span-1">
              <h3 className="font-black text-xl mb-6 flex items-center gap-2"><Clock size={24} className="text-yellow-300" /> Horario</h3>
              <div className="space-y-4 font-medium text-green-50"><div><p className="font-bold text-white">Lunes a viernes</p><p>8am - 4pm</p></div></div>
            </div>
            <div className="lg:col-span-1">
              <h3 className="font-black text-xl mb-6 flex items-center gap-2"><Phone size={24} className="text-yellow-300" /> Contacto</h3>
              <div className="space-y-4 font-medium text-green-50"><div><p className="font-bold text-white">Línea nacional</p><p className="text-lg font-black text-yellow-300">018000 514020</p></div></div>
            </div>
            <div className="lg:col-span-1">
              <h3 className="font-black text-xl mb-6 flex items-center gap-2"><Mail size={24} className="text-yellow-300" /> Empleo</h3>
              <div className="font-medium text-green-50"><a href="#" className="underline font-bold text-white hover:text-yellow-300">Enviar hoja de vida</a></div>
            </div>
          </div>
        </div>

        <div className="bg-[#007a3a] py-6 relative z-20 mt-12 lg:mt-0 shadow-lg">
          <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4">
            
            {/* Espacio vacío */}
            <div className="hidden lg:block lg:w-1/3"></div>
            
            {/* Logo Central */}
            <div className="lg:-mt-20 relative z-30 lg:w-1/3 flex justify-center">
              <div className="bg-white p-1 rounded-full border-[6px] border-[#007a3a] shadow-xl hover:scale-105 transition-transform w-24 h-24 md:w-32 md:h-32 flex items-center justify-center overflow-hidden">
                  <img src="/icons/DC.png" alt="Logo Footer" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Redes Sociales */}
            <div className="lg:w-1/3 flex flex-col sm:flex-row items-center justify-end gap-4">
              <span className="font-bold text-sm uppercase">Síguenos</span>
              <div className="flex gap-4">
                <a href="#" className="bg-white text-[#009045] p-2 rounded-full hover:bg-yellow-400 hover:text-white transition-all"><Facebook size={20} /></a>
                <a href="#" className="bg-white text-[#009045] p-2 rounded-full hover:bg-yellow-400 hover:text-white transition-all"><Instagram size={20} /></a>
                <a href="#" className="bg-white text-[#009045] p-2 rounded-full hover:bg-yellow-400 hover:text-white transition-all"><Youtube size={20} /></a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#006831] py-8 text-sm font-medium border-t border-[#00582a]">
          <div className="container mx-auto px-4 text-center flex flex-col gap-2">
             <p>© 2025 Delicias Colombianas</p>
             <p className="text-xs opacity-70 flex items-center justify-center gap-1">
               <Quote size={10} /> Calidad y Tradición <Quote size={10} />
             </p>
          </div>
        </div>
      </footer>
    </div>
  )
}