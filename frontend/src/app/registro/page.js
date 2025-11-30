'use client'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import Link from 'next/link'
import LoadingSpinner from '../../components/LoadingSpinner'

// 1. IMPORTAR ICONOS (Lucide React)
import { 
  ShoppingCart, User, MapPin, Clock, Phone, Mail, 
  Facebook, Instagram, Youtube, Quote, Menu, X, LogIn, LogOut,
  UserPlus, Lock, Map, AlertCircle, ArrowRight
} from 'lucide-react'

export default function Registro() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
    telefono: '',
    direccion: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const { register, user, logout } = useAuth()
  const { getCartItemsCount } = useCart()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }
    
    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }
    
    setLoading(true)
    const result = await register(formData)
    
    if (result.success) {
      window.location.href = '/'
    } else {
      setError(result.error)
    }
    
    setLoading(false)
  }

  if (loading) return <LoadingSpinner text="Creando tu cuenta..." />

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      
      {/* --- HEADER (Reutilizado) --- */}
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
                  <Link href="/login" className="hidden md:block font-bold hover:text-yellow-300 transition-colors">Ingresar</Link>
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
              <button className="lg:hidden text-white p-2 hover:text-yellow-300 transition-colors" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>

            {/* Menú Móvil */}
            {mobileMenuOpen && (
              <div className="absolute top-full left-0 w-full mt-2 bg-[#009045] rounded-2xl shadow-xl border-t-4 border-yellow-400 overflow-hidden lg:hidden z-50 animate-fade-in">
                <div className="flex flex-col p-4 space-y-2">
                  {['Inicio', 'Productos', 'Nosotros', 'Contacto'].map((item) => (
                    <Link key={item} href={item === 'Inicio' ? '/' : `/${item.toLowerCase()}`} className="block py-3 px-4 rounded-xl hover:bg-[#007a3a] font-black text-lg text-white transition-colors border-b border-[#007a3a] last:border-0" onClick={() => setMobileMenuOpen(false)}>
                      {item.toUpperCase()}
                    </Link>
                  ))}
                  {!user ? (
                    <div className="flex flex-col gap-2 pt-2 mt-2 border-t border-[#007a3a]">
                        <Link href="/login" className="py-2 px-4 text-white hover:text-yellow-300 font-bold flex items-center gap-2"><LogIn size={18}/> Ingresar</Link>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between pt-4 mt-2 border-t border-[#007a3a] px-4">
                        <div className="flex items-center gap-2 font-bold text-white"><User size={18} className="text-yellow-300"/> {user.nombre}</div>
                        <button onClick={logout} className="text-red-300 font-bold text-sm">Salir</button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
      </header>

      {/* --- HERO BACKGROUND --- */}
      <div className="bg-[#009045] pt-48 pb-24 relative text-center rounded-br-[4rem] md:rounded-br-[8rem] shadow-xl overflow-hidden">
         <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-md">
              ¡Únete a la Familia!
            </h1>
            <p className="text-green-100 text-xl font-medium max-w-2xl mx-auto">
              Crea tu cuenta hoy y empieza a disfrutar de los auténticos sabores colombianos.
            </p>
         </div>
         {/* Decoración */}
         <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      </div>
      
      <main className="container mx-auto px-4 py-8 -mt-24 relative z-20 flex-1">
        <div className="max-w-2xl mx-auto animate-slide-up">
          
          {/* TARJETA DE REGISTRO */}
          <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 border border-gray-100 relative overflow-hidden">
            
            <div className="absolute top-0 left-0 w-full h-2 bg-yellow-400"></div>

            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-[#009045] text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg border-4 border-white">
                <UserPlus size={32} strokeWidth={2.5} />
              </div>
              <h2 className="text-3xl font-black text-gray-800">Crear Cuenta</h2>
            </div>
            
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-r-xl mb-6 animate-shake font-medium flex items-center gap-3">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-2">Nombre Completo</label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 text-gray-400" size={20} />
                  <input 
                    type="text" 
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl py-3 pl-12 pr-4 focus:border-[#009045] focus:ring-0 focus:bg-white transition-all outline-none font-medium text-gray-700"
                    placeholder="Ej: Pepito Pérez"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-2">Correo Electrónico</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 text-gray-400" size={20} />
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl py-3 pl-12 pr-4 focus:border-[#009045] focus:ring-0 focus:bg-white transition-all outline-none font-medium text-gray-700"
                    placeholder="ejemplo@correo.com"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-2">Teléfono</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-3.5 text-gray-400" size={20} />
                    <input 
                      type="tel" 
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl py-3 pl-12 pr-4 focus:border-[#009045] focus:ring-0 focus:bg-white transition-all outline-none font-medium text-gray-700"
                      placeholder="+57..."
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-2">Contraseña</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-3.5 text-gray-400" size={20} />
                    <input 
                      type="password" 
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl py-3 pl-12 pr-4 focus:border-[#009045] focus:ring-0 focus:bg-white transition-all outline-none font-medium text-gray-700"
                      placeholder="******"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-2">Confirmar Contraseña</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 text-gray-400" size={20} />
                  <input 
                    type="password" 
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl py-3 pl-12 pr-4 focus:border-[#009045] focus:ring-0 focus:bg-white transition-all outline-none font-medium text-gray-700"
                    placeholder="******"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-2">Dirección de Envío</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-3.5 text-gray-400" size={20} />
                  <textarea 
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl py-3 pl-12 pr-4 focus:border-[#009045] focus:ring-0 focus:bg-white transition-all outline-none resize-none font-medium text-gray-700"
                    placeholder="Dirección para recibir tus pedidos..."
                    rows="2"
                  />
                </div>
              </div>
              
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-[#009045] hover:bg-[#007a3a] text-white py-4 rounded-full font-black text-lg tracking-wide transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl mt-4 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? 'CREANDO...' : (<>REGISTRARME AHORA <ArrowRight size={20}/></>)}
              </button>
            </form>
            
            <div className="text-center mt-8 pt-6 border-t border-gray-100">
              <p className="text-gray-600 font-medium">
                ¿Ya tienes cuenta?{' '}
                <Link href="/login" className="text-[#009045] font-black hover:text-yellow-500 transition-colors underline decoration-2 underline-offset-2">
                  Inicia sesión aquí
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* --- FOOTER COMPLETO --- */}
      <footer className="bg-[#009045] text-white pt-12 mt-20 font-sans border-t-[8px] border-yellow-400">
        <div className="container mx-auto px-4 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            
            <div className="lg:col-span-1 flex justify-center lg:justify-start">
              <img src="/icons/shop_footer.png" alt="Tienda Delicias Colombianas" className="w-full h-full object-contain max-w-[200px] drop-shadow-xl transform hover:scale-110 transition-transform cursor-pointer" />
            </div>

            <div className="lg:col-span-1">
              <h3 className="font-black text-lg mb-4 flex items-center gap-2 text-yellow-300"><MapPin size={20} /> Fábrica</h3>
              <div className="text-sm font-medium text-green-50 space-y-1"><p>Carrera 68 D Nº 98-23</p><p>Bogotá - Colombia</p></div>
            </div>

            <div className="lg:col-span-1">
              <h3 className="font-black text-lg mb-4 flex items-center gap-2 text-yellow-300"><Clock size={20} /> Horarios</h3>
              <div className="text-sm font-medium text-green-50 space-y-1"><p>Lunes a Viernes: 8am - 5pm</p></div>
            </div>

            <div className="lg:col-span-1">
              <h3 className="font-black text-lg mb-4 flex items-center gap-2 text-yellow-300"><Phone size={20} /> Contacto</h3>
              <div className="text-sm font-medium text-green-50 space-y-1"><p className="font-bold text-white text-base">018000 514020</p></div>
            </div>

            <div className="lg:col-span-1">
              <h3 className="font-black text-lg mb-4 flex items-center gap-2 text-yellow-300"><Mail size={20} /> Empleo</h3>
              <div className="text-sm font-medium text-green-50 space-y-1"><a href="#" className="underline hover:text-white">Enviar hoja de vida</a></div>
            </div>

          </div>
        </div>

        <div className="bg-[#007a3a] py-6 relative z-20 mt-4 shadow-inner">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
             <div className="flex gap-4">
                <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-yellow-400 hover:text-[#009045] transition-all"><Facebook size={18} /></a>
                <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-yellow-400 hover:text-[#009045] transition-all"><Instagram size={18} /></a>
                <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-yellow-400 hover:text-[#009045] transition-all"><Youtube size={18} /></a>
             </div>
             <div className="text-xs font-bold text-green-100 flex items-center gap-1">
               <Quote size={10} /> Calidad y Tradición <Quote size={10} /> © 2025
             </div>
          </div>
        </div>
      </footer>
    </div>
  )
}