import { AuthProvider } from '../context/AuthContext'
import { CartProvider } from '../context/CartContext'
import Footer from '../layout/Footer'
import './globals.css'

import './globals.css'
import { ClientWrapper } from './ClientWrapper' // ⬅️ Ahora sí encontrará este archivo

export const metadata = { 
  title: 'Delicias Colombianas',
  description: 'Sabores auténticos de Colombia.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      {/* Añadimos flexbox para asegurar que el footer siempre se quede abajo */}
      <body className="antialiased flex flex-col min-h-screen">
        <AuthProvider>
          <CartProvider>
            {/* El main toma todo el espacio disponible empujando el footer hacia abajo */}
            <main className="flex-grow">
              {children}
            </main>
            {/* Colocamos el Footer al final */}
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}