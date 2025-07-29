import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'

// Usar fuentes del sistema para evitar problemas de red en Vercel
const systemFonts = {
  sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif'],
  mono: ['ui-monospace', 'SFMono-Regular', '"SF Mono"', 'Consolas', '"Liberation Mono"', 'Menlo', 'monospace']
}

export const metadata: Metadata = {
  title: 'Novaxis - Construyendo el Futuro',
  description: 'Soluciones innovadoras para tu empresa. Construyendo futuro con tecnología de vanguardia.',
  keywords: 'Novaxis, tecnología, innovación, soluciones empresariales',
  authors: [{ name: 'Novaxis Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#4A90E2',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'Novaxis - Construyendo el Futuro',
    description: 'Soluciones innovadoras para tu empresa',
    type: 'website',
    locale: 'es_ES',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" style={{ fontFamily: systemFonts.sans.join(', ') }}>
      <body style={{ fontFamily: systemFonts.sans.join(', ') }}>
        {children}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#4A90E2',
              color: '#fff',
              borderRadius: '10px',
              padding: '16px',
            },
            success: {
              iconTheme: {
                primary: '#ffffff',
                secondary: '#4A90E2',
              },
            },
            error: {
              iconTheme: {
                primary: '#ffffff',
                secondary: '#ef4444',
              },
              style: {
                background: '#ef4444',
              },
            },
          }}
        />
      </body>
    </html>
  )
}
