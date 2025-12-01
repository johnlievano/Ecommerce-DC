// src/app/layout.js

import './globals.css'
import { ClientWrapper } from './ClientWrapper' // ⬅️ Ahora sí encontrará este archivo

export const metadata = { 
  title: 'Delicias Colombianas',
  description: 'Sabores auténticos de Colombia.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="antialiased">
        {/* Usamos el Wrapper que acabamos de crear */}
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  )
}