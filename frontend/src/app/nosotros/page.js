'use client'
import { useState, useEffect } from 'react'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import Link from 'next/link'
import LoadingSpinner from '../../components/LoadingSpinner'
import ScrollReveal from '../../components/ScrollReveal'

// 1. IMPORTAR ICONOS (Lucide React)
import { 
  ShoppingCart, User, MapPin, Clock, Phone, Mail, 
  Facebook, Instagram, Youtube, Quote, Menu, X, LogIn, LogOut,
  Heart, Star, ShieldCheck, Users, ChefHat, Sparkles, Smile,
  History, TrendingUp, Globe, Award
} from 'lucide-react'

export default function Nosotros() {
  const [loading, setLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false) // Estado menú móvil

  const { getCartItemsCount } = useCart()
  const { user, logout } = useAuth()

  useEffect(() => {
    setTimeout(() => setLoading(false), 800)
  }, [])

  // Datos actualizados con iconos Lucide
  const valores = [
    { icon: <History size={48} />, titulo: "Tradición", descripcion: "Recetas de la abuela, intactas.", color: "bg-[#741b47]" }, 
    { icon: <ShieldCheck size={48} />, titulo: "Calidad", descripcion: "Ingredientes 100% seleccionados.", color: "bg-[#2062af]" }, 
    { icon: <Heart size={48} />, titulo: "Pasión", descripcion: "Amor en cada bocado.", color: "bg-[#c27803]" }, 
    { icon: <Users size={48} />, titulo: "Unión", descripcion: "Apoyamos al agro local.", color: "bg-[#e69138]" } 
  ]

  const equipo = [
    { nombre: "María G.", puesto: "Fundadora", desc: "La mente maestra detrás del sabor.", icon: <ChefHat size={48} className="text-[#009045]" /> },
    { nombre: "Carlos R.", puesto: "Calidad", desc: "Nada sale sin su aprobación.", icon: <ShieldCheck size={48} className="text-[#009045]" /> },
    { nombre: "Ana M.", puesto: "Innovación", desc: "Creando el futuro dulce.", icon: <Sparkles size={48} className="text-[#009045]" /> }
  ]

  const hitos = [
    { año: "1990", evento: "El Inicio", detalle: "Una pequeña cocina en Bogotá.", icon: <Quote size={24}/> },
    { año: "2005", evento: "Expansión", detalle: "Llegamos a todo el país.", icon: <TrendingUp size={24}/> },
    { año: "2023", evento: "Digital", detalle: "¡Lanzamos nuestra tienda online!", icon: <Globe size={24}/> }
  ]

  if (loading) return <LoadingSpinner text="Conociendo nuestra historia..." />

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

      {/* --- HERO SECTION --- */}
      <div className="bg-[#009045] pt-48 pb-32 relative text-center text-white overflow-hidden rounded-br-[4rem] md:rounded-br-[8rem] shadow-xl z-20">
         <div className="container mx-auto px-4 relative z-10">
            <ScrollReveal>
              <span className="bg-yellow-400 text-[#009045] px-4 py-1 rounded-full font-black text-sm mb-6 inline-flex items-center gap-2 transform -rotate-2 shadow-lg">
                <Award size={16} /> DESDE 1990
              </span>
              <h1 className="text-5xl md:text-7xl font-black mb-6 drop-shadow-lg leading-tight">
                Nuestra Historia <br/><span className="text-yellow-300">Sabe a Colombia</span>
              </h1>
              <p className="text-xl md:text-2xl font-medium max-w-3xl mx-auto text-green-100 leading-relaxed">
                Más de 30 años amasando tradición, horneando sueños y entregando felicidad en cada paquete.
              </p>
            </ScrollReveal>
         </div>
         {/* Decoración Fondo */}
         <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      </div>

      <main className="container mx-auto px-4 py-20 -mt-10 relative z-20">
        
        {/* --- VALORES (Tarjetas de Colores) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {valores.map((valor, index) => (
            <ScrollReveal key={index} className={`delay-${index * 100}`}>
              <div className={`${valor.color} rounded-[2rem] p-8 text-center text-white shadow-xl hover:-translate-y-2 transition-transform duration-300 group min-h-[250px] flex flex-col justify-center items-center`}>
                <div className="mb-4 transform group-hover:scale-110 transition-transform bg-white/20 p-4 rounded-full backdrop-blur-sm">
                  {valor.icon}
                </div>
                <h3 className="text-2xl font-black mb-2">{valor.titulo}</h3>
                <p className="font-medium opacity-90">{valor.descripcion}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* --- HISTORIA (Línea de Tiempo) --- */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-800 mb-2">El Camino Recorrido</h2>
            <div className="w-20 h-2 bg-yellow-400 mx-auto rounded-full"></div>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Línea Central */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-200 h-full rounded-full"></div>
            
            <div className="space-y-12">
              {hitos.map((hito, index) => (
                <ScrollReveal key={index}>
                  <div className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                      <div className="bg-white p-6 rounded-[2rem] shadow-lg border-2 border-gray-100 hover:border-[#009045] transition-colors group relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5">{hito.icon}</div>
                        <span className="text-[#009045] font-black text-2xl block mb-1 group-hover:scale-110 transition-transform origin-right">{hito.año}</span>
                        <h4 className="text-xl font-bold text-gray-800 mb-2">{hito.evento}</h4>
                        <p className="text-gray-600 font-medium">{hito.detalle}</p>
                      </div>
                    </div>
                    {/* Punto Central */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-yellow-400 border-4 border-white rounded-full shadow-md z-10"></div>
                    <div className="w-1/2"></div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* --- EQUIPO (Avatar Cards) --- */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-800 mb-2">La Familia</h2>
            <p className="text-gray-500 font-bold text-lg">Manos expertas, corazones apasionados.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {equipo.map((miembro, index) => (
              <ScrollReveal key={index} className={`delay-${index * 100}`}>
                <div className="bg-white rounded-[2.5rem] p-8 text-center shadow-xl border-b-8 border-[#009045] hover:-translate-y-2 transition-transform group">
                  <div className="w-32 h-32 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border-4 border-white group-hover:bg-green-100 transition-colors">
                    {miembro.icon}
                  </div>
                  <h3 className="text-2xl font-black text-gray-800">{miembro.nombre}</h3>
                  <span className="bg-yellow-100 text-[#009045] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-4 inline-block mt-2">
                    {miembro.puesto}
                  </span>
                  <p className="text-gray-600 font-medium">{miembro.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

      </main>

      {/* --- FOOTER (Estándar) --- */}
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