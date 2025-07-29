'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, Building, Hammer, HardHat } from 'lucide-react'

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const [isShortHeight, setIsShortHeight] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  // Detect short height viewports
  useEffect(() => {
    const checkHeight = () => {
      setIsShortHeight(window.innerHeight <= 800)
    }
    
    checkHeight()
    window.addEventListener('resize', checkHeight)
    return () => window.removeEventListener('resize', checkHeight)
  }, [])

  const scrollToServices = () => {
    const element = document.getElementById('servicios')
    if (element) {
      const headerOffset = 100 // Offset mejorado para el navbar
      const elementPosition = element.offsetTop
      const offsetPosition = elementPosition - headerOffset

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      })
    }
  }

  const scrollToProjects = () => {
    const element = document.getElementById('proyectos')
    if (element) {
      const headerOffset = 100 // Offset mejorado para el navbar
      const elementPosition = element.offsetTop
      const offsetPosition = elementPosition - headerOffset

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      })
    }
  }

  /* Duraciones clave para animaciones (replicadas de Stats.tsx) */
  const CYCLE_MS = 700       // ritmo del "escalera"
  const GLOW_DURATION = 0.32 // debe ser < CYCLE_MS para no solaparse

  /* Estado para la animación de "escalera" */
  const [activeIndex, setActiveIndex] = useState(0)

  /* Efecto escalera – ritmo fijo, sin solaparse */
  useEffect(() => {
    const id = setInterval(
      () => setActiveIndex(prev => (prev + 1) % 4),
      CYCLE_MS
    )
    return () => clearInterval(id)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  }

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  }

  return (
    <motion.section
      ref={heroRef}
      id="inicio"
      className={`relative min-h-screen flex items-start justify-center overflow-visible bg-gradient-to-br from-novaxis-primary via-novaxis-secondary to-novaxis-dark pt-16 xs:pt-18 sm:pt-20 md:pt-24 lg:pt-20 ${isShortHeight ? 'hero-tight' : ''}`}
      style={{ y }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${((i * 47) % 100)}%`,
              top: `${((i * 73) % 100)}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}

          {/* Geometric Shapes - ocultos en pantallas muy pequeñas */}
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 border-2 border-white/10 rounded-full hidden sm:block xl:block"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-24 h-24 border-2 border-white/10 rotate-45 hidden sm:block xl:block"
          animate={{ rotate: 405 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center text-white px-4 xs:px-6 sm:px-8 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto w-full py-2 xs:py-4 sm:py-6 lg:py-12 xl:py-16"
          style={{
            paddingTop: 'clamp(0.5rem, 6vh, 2.5rem)',
            minHeight: 'calc(100vh - 4rem)'
          }}
        >
          {/* Floating Icons */}
        

          {/* Main Title */}
          <motion.h1
            variants={itemVariants}
            className="hero-title font-heading font-bold mb-2 xs:mb-3 md:mb-6 xl:mb-8 leading-tight text-center"
            style={{
              fontSize: 'clamp(1.2rem, 6vw, 2.75rem)',
              lineHeight: '1.1'
            }}
          >
            <span className="block">Construyendo</span>
            <span className="block bg-gradient-to-r from-yellow-300 to-white bg-clip-text text-transparent">
              Panamá
            </span>
            <span className="block">con Novaxis</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="hero-subtitle mb-3 xs:mb-4 md:mb-6 xl:mb-8 font-light opacity-90 max-w-5xl mx-auto text-center px-4"
            style={{
              fontSize: 'clamp(0.875rem, 2vw, 1.5rem)',
              lineHeight: '1.3'
            }}
          >
            Administradora de Proyectos de Construcción de alta calidad en Panamá.
            <span 
              className="hero-subtitle-span block mt-1 xs:mt-2 xl:mt-3 text-novaxis-light"
              style={{
                fontSize: 'clamp(0.75rem, 1.6vw, 1.25rem)'
              }}
            >
              Edificaciones, estructuras, restauraciones, plantas potabilizadoras y acueductos
            </span>
          </motion.p>

          {/* Stats Preview */}
          <motion.div
            variants={itemVariants}
            className="hero-stats grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-2 xs:gap-3 md:gap-6 xl:gap-8 justify-center max-w-5xl mx-auto mb-3 xs:mb-4 md:mb-6 xl:mb-8 px-4"
          >
            {[
              { number: '250+', label: 'Proyectos Concluidos', index: 0 },
              { number: '500+', label: 'Empleados Directos e Indirectos', index: 1 },
              { number: '15+', label: 'Años Fundados', index: 2 },
              { number: '50K+', label: 'Miles de Panameños Beneficiados', index: 3 },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="hero-stat-card relative group"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{
                  default: { duration: 0.4, ease: 'easeInOut' },
                  opacity: { duration: 0.6, delay: index * 0.1 },
                  scale: { duration: 0.6, delay: index * 0.1 }
                }}
              >
                <motion.div
                  className="relative bg-white/10 backdrop-blur-sm rounded-lg p-2 xs:p-3
                           border border-novaxis-secondary/40 overflow-hidden w-full h-full
                           group-hover:border-novaxis-secondary/90
                           group-hover:shadow-[0_0_60px_rgba(107,182,255,0.8)]
                           transition-all duration-300 ease-in-out flex flex-col justify-center items-center"
                  animate={{
                    boxShadow: activeIndex === stat.index
                      ? '0 0 60px rgba(107,182,255,0.9)'
                      : '0 0 0 rgba(107,182,255,0)'
                  }}
                  transition={{ duration: GLOW_DURATION, ease: 'easeInOut' }}
                >
                  {/* Glow BACKGROUND */}
                  <motion.div
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(107,182,255,0.2), rgba(74,144,226,0.1))'
                    }}
                    animate={{
                      background: activeIndex === stat.index
                        ? 'linear-gradient(135deg, rgba(107,182,255,0.9), rgba(74,144,226,0.7))'
                        : 'linear-gradient(135deg, rgba(107,182,255,0.2), rgba(74,144,226,0.1))'
                    }}
                    transition={{ duration: GLOW_DURATION, ease: 'easeInOut' }}
                  />

                  {/* Decorative floating shapes */}
                  <motion.div
                    className="absolute top-0 right-0 w-6 h-6 bg-novaxis-secondary/20
                             rounded-full -translate-y-3 translate-x-3
                             group-hover:scale-150 group-hover:bg-novaxis-secondary/60
                             group-hover:shadow-[0_0_50px_rgba(107,182,255,0.9)]
                             transition-all duration-300 ease-in-out"
                    animate={{
                      boxShadow: activeIndex === stat.index
                        ? '0 0 30px rgba(107,182,255,0.8)'
                        : '0 0 0 rgba(107,182,255,0)'
                    }}
                    transition={{ duration: GLOW_DURATION, ease: 'easeInOut' }}
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 w-4 h-4 bg-novaxis-secondary/20
                             rounded-full translate-y-2 -translate-x-2
                             group-hover:scale-150 group-hover:bg-novaxis-secondary/60
                             group-hover:shadow-[0_0_40px_rgba(107,182,255,0.9)]
                             transition-all duration-300 ease-in-out"
                    animate={{
                      boxShadow: activeIndex === stat.index
                        ? '0 0 25px rgba(107,182,255,0.8)'
                        : '0 0 0 rgba(107,182,255,0)'
                    }}
                    transition={{ duration: GLOW_DURATION, ease: 'easeInOut' }}
                  />

                  {/* CONTENIDO */}
                  <div className="relative z-10 flex flex-col items-center justify-center">
                    {/* Número */}
                    <motion.div
                      className="hero-stat-number font-bold text-yellow-300 mb-0.5 flex items-center justify-center"
                      style={{
                        fontSize: 'clamp(0.875rem, 2.5vw, 2rem)'
                      }}
                      animate={{
                        textShadow: activeIndex === stat.index
                          ? '0 0 25px rgba(255,255,255,1)'
                          : '0 0 0 rgba(255,255,255,0)',
                        filter: activeIndex === stat.index
                          ? 'brightness(2) contrast(1.5)'
                          : 'brightness(1) contrast(1)'
                      }}
                      transition={{ duration: GLOW_DURATION, ease: 'easeInOut' }}
                    >
                      {stat.number}
                    </motion.div>
                    
                    {/* Label */}
                    <div
                      className="hero-stat-label text-novaxis-light leading-tight text-center px-1"
                      style={{
                        fontSize: 'clamp(0.625rem, 1vw, 0.75rem)'
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>

                  {/* Animated border */}
                  <motion.div
                    className="absolute inset-0 rounded-lg border-2 border-transparent"
                    style={{
                      background:
                        'linear-gradient(45deg, transparent, rgba(74,144,226,0.8), rgba(107,182,255,0.8), transparent) border-box',
                      mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                      maskComposite: 'subtract'
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="hero-cta-container flex flex-col sm:flex-row gap-2 sm:gap-3 xl:gap-6 justify-center items-center w-full max-w-lg mx-auto px-4 mb-2 xs:mb-4 md:mb-6 xl:mb-8"
          >
            <motion.button
              onClick={scrollToServices}
              className="group relative w-full sm:flex-1 bg-white text-novaxis-primary font-semibold overflow-hidden shadow-lg hover:shadow-xl transition-all duration-150"
              style={{
                fontSize: 'clamp(0.75rem, 2.8vw, 0.875rem)',
                padding: 'clamp(8px, 3vw, 14px) clamp(12px, 6vw, 20px)',
                borderRadius: 'clamp(20px, 12vw, 32px)'
              }}
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15 }}
            >
              <span className="relative z-10">Conoce nuestros servicios</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-400"
                initial={{ x: '-100%' }}
                whileHover={{ x: '0%' }}
                transition={{ duration: 0.2 }}
              />
            </motion.button>

            <motion.button
              onClick={scrollToProjects}
              className="group w-full sm:flex-1 border-2 border-white text-white font-semibold hover:bg-white hover:text-novaxis-primary transition-all duration-150"
              style={{
                fontSize: 'clamp(0.75rem, 2.8vw, 0.875rem)',
                padding: 'clamp(8px, 3vw, 14px) clamp(12px, 6vw, 20px)',
                borderRadius: 'clamp(20px, 12vw, 32px)'
              }}
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15 }}
            >
              Ver proyectos
              <motion.span
                className="inline-block ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-2 sm:bottom-4 xl:bottom-6 left-1/2 transform -translate-x-1/2 z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <motion.button
            onClick={scrollToServices}
            className="flex flex-col items-center group"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
      
          </motion.button>
        </motion.div>
      </div>

      {/* Background Video Overlay (placeholder) */}
      <div className="absolute inset-0 bg-gradient-to-br from-novaxis-primary/90 via-novaxis-secondary/90 to-novaxis-dark/90" />
    </motion.section>
  )
}