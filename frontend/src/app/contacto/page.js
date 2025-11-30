'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import LoadingSpinner from '../../components/LoadingSpinner'

// 1. IMPORTAR ICONOS (Lucide React)
import { 
  ShoppingCart, User, MapPin, Clock, Phone, Mail, 
  Facebook, Instagram, Youtube, Quote, Menu, X, LogIn, LogOut,
  Send, MessageSquare, CheckCircle
} from 'lucide-react'

// Componente de Onda (Decorativo para el footer) - Eliminado si no se usa o reemplazado por estilo CSS
// Se elimina WaveDivider para consistencia con el diseño de Home/Productos

export default function Contacto() {
  const [formData, setFormData] = useState({ nombre: '', email: '', telefono: '', mensaje: '' })
  const [enviado, setEnviado] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false) // Estado menú móvil

  const { user, logout } = useAuth()
  const { getCartItemsCount } = useCart()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setEnviado(true)
    setTimeout(() => setEnviado(false), 3000)
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-800">
      
      {/* --- HEADER (Idéntico a Home/Productos) --- */}
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

      {/* --- CONTENIDO PRINCIPAL --- */}
      <main className="container mx-auto px-4 py-12 pt-48 pb-32">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          
          {/* Formulario */}
          <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-10 border border-gray-100 hover:-translate-y-1 transition-transform duration-300">
            <h2 className="text-3xl font-black text-gray-800 mb-6 flex items-center gap-3">
              <MessageSquare className="text-[#009045]" size={32} /> Envíanos un mensaje
            </h2>
            
            {enviado && (
              <div className="bg-green-50 text-[#009045] p-4 rounded-xl mb-6 font-bold border border-green-200 flex items-center gap-3">
                <CheckCircle size={24} /> ¡Mensaje enviado! Pronto te contactaremos.
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-2">Nombre Completo</label>
                <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-5 py-3 focus:border-[#009045] focus:bg-white transition-all outline-none font-medium" placeholder="Tu nombre" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-2">Correo Electrónico</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-5 py-3 focus:border-[#009045] focus:bg-white transition-all outline-none font-medium" placeholder="tucorreo@ejemplo.com" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-2">Teléfono</label>
                <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-5 py-3 focus:border-[#009045] focus:bg-white transition-all outline-none font-medium" placeholder="+57 300..." />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-2">Mensaje</label>
                <textarea rows="4" name="mensaje" value={formData.mensaje} onChange={handleChange} className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-5 py-3 focus:border-[#009045] focus:bg-white transition-all outline-none resize-none font-medium" placeholder="¿Cómo podemos ayudarte?" required></textarea>
              </div>
              <button type="submit" className="w-full bg-[#009045] hover:bg-[#007a3a] text-white py-4 rounded-full font-black text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 mt-2 flex items-center justify-center gap-2">
                <Send size={20} /> ENVIAR MENSAJE
              </button>
            </form>
          </div>

          {/* Info Cards */}
          <div className="space-y-6">
             {/* Card Contacto */}
             <div className="bg-[#009045] rounded-[2.5rem] p-10 text-white shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-bl-full transition-transform group-hover:scale-110"></div>
                <h3 className="text-2xl font-black mb-6">Información Directa</h3>
                <div className="space-y-6">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl"><Phone size={24} /></div>
                      <div><p className="text-sm opacity-80 font-bold">Teléfono</p><p className="text-lg font-black">+57 1 234 5678</p></div>
                   </div>
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl"><Mail size={24} /></div>
                      <div><p className="text-sm opacity-80 font-bold">Email</p><p className="text-lg font-black">info@delicias.com</p></div>
                   </div>
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl"><MapPin size={24} /></div>
                      <div><p className="text-sm opacity-80 font-bold">Ubicación</p><p className="text-lg font-black">Bogotá, Colombia</p></div>
                   </div>
                </div>
             </div>

             {/* Card Horario */}
             <div className="bg-yellow-400 rounded-[2.5rem] p-10 text-[#009045] shadow-xl relative overflow-hidden group">
                <h3 className="text-2xl font-black mb-6 flex items-center gap-2"><Clock size={28} /> Horario de Atención</h3>
                <div className="space-y-3 font-bold text-lg">
                   <div className="flex justify-between border-b border-[#009045]/20 pb-2"><span className="opacity-80">Lunes - Viernes</span><span>8:00 AM - 6:00 PM</span></div>
                   <div className="flex justify-between border-b border-[#009045]/20 pb-2"><span className="opacity-80">Sábados</span><span>9:00 AM - 2:00 PM</span></div>
                   <div className="flex justify-between text-red-600"><span className="opacity-80">Domingos</span><span>Cerrado</span></div>
                </div>
             </div>
          </div>

        </div>
      </main>

      {/* --- FOOTER (Idéntico a Home/Productos) --- */}
      <footer className="bg-[#009045] text-white pt-16 relative overflow-hidden font-sans border-t-[8px] border-yellow-400">
        <div className="container mx-auto px-4 pb-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-1 flex justify-center lg:justify-start">
              <img src="/icons/shop_footer.png" alt="Tienda Delicias Colombianas" className="w-full h-full object-contain max-w-[250px] drop-shadow-xl transform hover:scale-110 transition-transform cursor-pointer" />
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
            <div className="hidden lg:block lg:w-1/3"></div>
            <div className="lg:-mt-20 relative z-30 lg:w-1/3 flex justify-center">
              <div className="bg-white p-1 rounded-full border-[6px] border-[#007a3a] shadow-xl hover:scale-105 transition-transform w-24 h-24 md:w-32 md:h-32 flex items-center justify-center overflow-hidden">
                  <img src="/icons/DC.png" alt="Logo Footer" className="w-full h-full object-cover" />
              </div>
            </div>
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