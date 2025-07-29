'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

interface LogoProps {
  className?: string
  width?: number
  height?: number
  isScrolled?: boolean
  onClick?: () => void
}

export default function Logo({ className = '', width = 140, height = 70, isScrolled = false, onClick }: LogoProps) {
  const [screenWidth, setScreenWidth] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }

    // Configurar el tamaño inicial
    setScreenWidth(window.innerWidth)
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Responsivo: tamaños más pequeños para pantallas extra pequeñas
  const getResponsiveSize = () => {
    if (screenWidth < 400) {
      // Pantallas muy pequeñas: usar clamp para máximo 40px de alto
      return {
        width: Math.min((isScrolled ? width * 0.4 : width * 0.5), 70),
        height: Math.min((isScrolled ? height * 0.4 : height * 0.5), 40)
      }
    } else if (screenWidth < 640) {
      // Pantallas pequeñas: reducir moderadamente
      return {
        width: (isScrolled ? width * 0.7 : width * 0.8),
        height: (isScrolled ? height * 0.7 : height * 0.8)
      }
    }
    // Tamaño por defecto para pantallas más grandes
    return {
      width: (isScrolled ? width * 0.85 : width),
      height: (isScrolled ? height * 0.85 : height)
    }
  }

  const { width: responsiveWidth, height: responsiveHeight } = getResponsiveSize()

  return (
    <div 
      className={`flex items-center ${className}`} 
      style={{ minWidth: 'fit-content' }}
      onClick={onClick}
    >
      <div className="relative">
        <Image
          src="/logo.png"
          alt="Novaxis Logo"
          width={responsiveWidth}
          height={responsiveHeight}
          className="object-contain drop-shadow-lg transition-all duration-300 ease-out"
          priority
        />
      </div>
      {/* Texto que aparece solo cuando se hace scroll */}
      <AnimatePresence>
        {isScrolled && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ 
              duration: 0.3,
              ease: 'easeOut'
            }}
            className="ml-3 text-xl font-heading font-bold text-novaxis-primary drop-shadow-md"
          >
            Novaxis
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}
