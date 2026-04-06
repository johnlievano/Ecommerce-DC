import { Facebook, Instagram, Linkedin, Youtube, MessageCircle, Quote } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#009045] text-white mt-auto flex flex-col font-sans border-t-[8px] border-yellow-400">
      {/* PARTE SUPERIOR: INFORMACIÓN */}
      <div className="container mx-auto px-4 md:px-8 py-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Contactanos */}
          <div>
            <h3 className="text-xl font-bold mb-4 pb-2 border-b border-[#007a3a]">Contáctanos</h3>
            <p className="mb-2 text-green-50">Desde celular a nivel nacional</p>
            <p className="font-bold text-yellow-300 text-lg mb-4">601 486 5000</p>
            <p className="text-sm mb-4 text-green-50">Opción 1: Ventas<br />Opción 3: Posventa</p>
            <p className="mb-2 text-green-50">Línea Whatsapp</p>
            <p className="font-bold text-yellow-300 text-lg">311 2281010</p>
          </div>

          {/* Nosotros */}
          <div>
            <h3 className="text-xl font-bold mb-4 pb-2 border-b border-[#007a3a]">Nosotros</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-yellow-300 transition-colors">Quiénes somos</a></li>
              <li><a href="#" className="hover:text-yellow-300 transition-colors">Nuestra Historia</a></li>
              <li><a href="#" className="hover:text-yellow-300 transition-colors">Negocios Institucionales</a></li>
              <li><a href="#" className="hover:text-yellow-300 transition-colors">Sostenibilidad</a></li>
              <li><a href="#" className="hover:text-yellow-300 transition-colors">Noticias</a></li>
              <li><a href="#" className="hover:text-yellow-300 transition-colors">Trabaja con nosotros</a></li>
            </ul>
          </div>

          {/* Legales & Servicios */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-xl font-bold mb-4 pb-2 border-b border-[#007a3a]">Legales</h3>
              <ul className="space-y-2 text-sm text-green-50">
                <li><a href="#" className="hover:text-yellow-300 transition-colors">Aviso de privacidad</a></li>
                <li><a href="#" className="hover:text-yellow-300 transition-colors">Políticas</a></li>
                <li><a href="#" className="hover:text-yellow-300 transition-colors">Términos</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 pb-2 border-b border-[#007a3a]">Servicios</h3>
              <ul className="space-y-2 text-sm text-green-50">
                <li><a href="#" className="hover:text-yellow-300 transition-colors">Domicilios</a></li>
                <li><a href="#" className="hover:text-yellow-300 transition-colors">Retiro en tienda</a></li>
              </ul>
            </div>
          </div>

          {/* Club & Social */}
          <div>
            <h3 className="text-xl font-bold mb-4 pb-2 border-b border-[#007a3a]">Club Delicias</h3>
            <ul className="space-y-2 mb-6">
              <li><a href="#" className="hover:text-yellow-300 transition-colors">Inscríbete</a></li>
              <li><a href="#" className="hover:text-yellow-300 transition-colors">Beneficios</a></li>
            </ul>
            <div className="flex space-x-3 mt-4">
              <a href="#" className="bg-white text-[#009045] p-2 rounded-full hover:bg-yellow-300 hover:text-white transition"><Facebook size={18} /></a>
              <a href="#" className="bg-white text-[#009045] p-2 rounded-full hover:bg-yellow-300 hover:text-white transition"><Instagram size={18} /></a>
              <a href="#" className="bg-white text-[#009045] p-2 rounded-full hover:bg-yellow-300 hover:text-white transition"><Linkedin size={18} /></a>
              <a href="#" className="bg-white text-[#009045] p-2 rounded-full hover:bg-yellow-300 hover:text-white transition"><Youtube size={18} /></a>
              <a href="#" className="bg-white text-[#009045] p-2 rounded-full hover:bg-yellow-300 hover:text-white transition"><MessageCircle size={18} /></a>
            </div>
          </div>
        </div>
      </div>

      {/* PARTE INFERIOR: LOGO FLOTANTE Y COPYRIGHT */}
      <div className="relative bg-[#007a3a] pt-16 pb-6 mt-auto shadow-inner">
        {/* LOGO CENTRAL FLOTANTE */}
        <div className="absolute left-1/2 transform -translate-x-1/2 -top-12 z-20">
            <div className="bg-white p-1 rounded-full border-[6px] border-[#007a3a] shadow-xl hover:scale-105 transition-transform w-28 h-28 flex items-center justify-center overflow-hidden">
                <img src="/icons/DC.png" alt="Logo Footer" className="w-full h-full object-cover" />
            </div>
        </div>

        {/* COPYRIGHT */}
        <div className="container mx-auto px-4 text-center flex flex-col gap-2 relative z-10">
            <p className="text-sm font-medium">© 2026 Delicias Colombianas. Todos los derechos reservados.</p>
            <p className="text-xs opacity-70 flex items-center justify-center gap-1 text-yellow-300">
                <Quote size={10} /> Calidad y Tradición <Quote size={10} />
            </p>
        </div>
      </div>
    </footer>
  )
}