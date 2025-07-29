'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'

const navItems = [
  { name: 'Inicio', href: '#inicio' },
  { name: 'Servicios', href: '#servicios' },
  { name: 'Proyectos', href: '#proyectos' },
  { name: 'Sobre nosotros', href: '#sobre-nosotros' },
  { name: 'Contacto', href: '#contacto' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    const handleSectionChange = () => {
      const sections = navItems.map(item => item.href.substring(1))
      const scrollPosition = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    // Ejecutar inmediatamente para configurar el estado inicial
    handleScroll()
    handleSectionChange()

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('scroll', handleSectionChange)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('scroll', handleSectionChange)
    }
  }, [])

  const scrollToSection = (href: string) => {
    const sectionId = href.substring(1)
    
    // Cerrar el menú móvil inmediatamente
    setIsMobileMenuOpen(false)
    
    // Usar requestAnimationFrame para asegurar que el DOM esté actualizado
    requestAnimationFrame(() => {
      const element = document.getElementById(sectionId)
      
      if (element) {
        const headerOffset = 100 // Offset mejorado y consistente con otros botones
        const elementPosition = element.offsetTop
        const offsetPosition = elementPosition - headerOffset

        // Usar scrollTo con smooth behavior
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth'
        })
        
        // Fallback para navegadores que no soporten smooth scroll
        if (!window.CSS || !window.CSS.supports('scroll-behavior', 'smooth')) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }
    })
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: isScrolled 
          ? 'rgba(255, 255, 255, 0.65)' 
          : 'transparent',
        backdropFilter: isScrolled 
          ? 'blur(16px) saturate(120%)' 
          : 'none',
        WebkitBackdropFilter: isScrolled 
          ? 'blur(16px) saturate(120%)' 
          : 'none',
        borderBottom: isScrolled 
          ? '1px solid rgba(255, 255, 255, 0.18)' 
          : '1px solid transparent',
        boxShadow: isScrolled 
          ? '0 8px 32px rgba(0, 0, 0, 0.08)' 
          : 'none',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <div className="container-custom navbar-mobile px-3 xs:px-4 sm:px-6 md:px-8 py-3 xs:py-4">
        <div className="flex items-center justify-between navbar-gap">
          {/* Logo */}
          <div className="min-w-0 flex-shrink-0" style={{ marginRight: 'clamp(8px, 3vw, 16px)' }}>
            <Logo 
              className="cursor-pointer logo-mobile" 
              isScrolled={isScrolled}
              onClick={() => scrollToSection('#inicio')}
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  scrollToSection(item.href)
                }}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-150 cursor-pointer ${
                  activeSection === item.href.substring(1)
                    ? isScrolled 
                      ? 'text-novaxis-primary' 
                      : 'text-white'
                    : isScrolled
                    ? 'text-gray-700 hover:text-novaxis-primary'
                    : 'text-white hover:text-novaxis-light'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                  opacity: { delay: index * 0.1, duration: 0.4 },
                  y: { delay: index * 0.1, duration: 0.4 }
                }}
              >
                {item.name}
                {activeSection === item.href.substring(1) && (
                  <motion.div
                    className={`absolute bottom-0 left-0 right-0 h-0.5 transition-colors duration-150 ${
                      isScrolled ? 'bg-novaxis-primary' : 'bg-white'
                    }`}
                    layoutId="activeIndicator"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* CTA Button */}
          <motion.button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              scrollToSection('#contacto')
            }}
            className="hidden lg:block btn-primary cursor-pointer"
            whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(74, 144, 226, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 400,
              damping: 25,
              opacity: { delay: 0.5, duration: 0.4 },
              x: { delay: 0.5, duration: 0.4 }
            }}
          >
            Contáctanos
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors duration-150 ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.15 }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.15 }}
              className="lg:hidden mt-4 py-4 glass-card rounded-xl shadow-xl shadow-black/10 relative z-50"
            >
              <div className="flex flex-col space-y-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      scrollToSection(item.href)
                    }}
                    className={`px-4 py-3 text-left text-sm font-medium rounded-lg transition-colors duration-150 cursor-pointer ${
                      activeSection === item.href.substring(1)
                        ? 'text-novaxis-primary bg-novaxis-light'
                        : 'text-gray-700 hover:text-novaxis-primary hover:bg-novaxis-light/50'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 400,
                      damping: 25,
                      opacity: { delay: index * 0.1, duration: 0.3 },
                      x: { delay: index * 0.1, duration: 0.3 }
                    }}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.name}
                  </motion.button>
                ))}
                <motion.button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    scrollToSection('#contacto')
                  }}
                  className="mx-4 mt-4 btn-primary text-center cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                    delay: 0.5 
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Contáctanos
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
