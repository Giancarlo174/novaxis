'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Users, Award, Calendar, Building2 } from 'lucide-react'

/* Duraciones clave ------------------------------------------------------- */
const CYCLE_MS        = 700   // ritmo del “escalera”
const GLOW_DURATION   = 0.32  // debe ser < CYCLE_MS para no solaparse
const COUNT_DURATION  = 1000  // contador numérico (igual que antes)

/* ----------------------------------------------------------------------- */
interface StatItemProps {
  icon: React.ReactNode
  number: number
  label: string
  suffix?: string
  delay?: number
  isActive?: boolean
}

function StatItem ({
  icon,
  number,
  label,
  suffix = '',
  delay = 0,
  isActive = false
}: StatItemProps) {
  const [count, setCount] = useState(0)
  const { ref, inView }   = useInView({ triggerOnce: true, threshold: 0.5 })

  /* ─── Contador numérico (sin cambios) ──────────────────────────────── */
  useEffect(() => {
    if (!inView) return
    const timer = setTimeout(() => {
      const steps     = 60
      const increment = number / steps
      let   current   = 0

      const interval = setInterval(() => {
        current += increment
        if (current >= number) {
          setCount(number)
          clearInterval(interval)
        } else {
          setCount(Math.floor(current))
        }
      }, COUNT_DURATION / steps)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timer)
  }, [inView, number, delay])

  /* ─── Animaciones dependientes de isActive (duración = GLOW_DURATION) */
  const fast = { duration: GLOW_DURATION, ease: 'easeInOut' }

  return (
    <motion.div
      ref={ref}
      className="relative group stats-card"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{
        default : { duration: 0.4, ease: 'easeInOut' },
        opacity : { duration: 0.6, delay: delay / 1000 },
        scale   : { duration: 0.6, delay: delay / 1000 }
      }}
    >
      <motion.div
        className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 xs:p-8 text-center
                   border border-novaxis-secondary/40 overflow-hidden w-full h-full
                   group-hover:border-novaxis-secondary/90
                   group-hover:shadow-[0_0_60px_rgba(107,182,255,0.8)]
                   transition-all duration-300 ease-in-out flex flex-col justify-between"
        animate={{
          boxShadow: isActive
            ? '0 0 60px rgba(107,182,255,0.9)'
            : '0 0 0 rgba(107,182,255,0)'
        }}
        transition={fast}
      >
        {/* Glow BACKGROUND ------------------------------------------------ */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background:
              'linear-gradient(135deg, rgba(107,182,255,0.2), rgba(74,144,226,0.1))'
          }}
          animate={{
            background: isActive
              ? 'linear-gradient(135deg, rgba(107,182,255,0.9), rgba(74,144,226,0.7))'
              : 'linear-gradient(135deg, rgba(107,182,255,0.2), rgba(74,144,226,0.1))'
          }}
          transition={fast}
        />

        {/* Decorative floating shapes ------------------------------------ */}
        <motion.div
          className="absolute top-0 right-0 w-16 xs:w-20 h-16 xs:h-20 bg-novaxis-secondary/20
                     rounded-full -translate-y-8 xs:-translate-y-10 translate-x-8 xs:translate-x-10
                     group-hover:scale-150 group-hover:bg-novaxis-secondary/60
                     group-hover:shadow-[0_0_50px_rgba(107,182,255,0.9)]
                     transition-all duration-300 ease-in-out"
          animate={{
            boxShadow: isActive
              ? '0 0 30px rgba(107,182,255,0.8)'
              : '0 0 0 rgba(107,182,255,0)'
          }}
          transition={fast}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-12 xs:w-16 h-12 xs:h-16 bg-novaxis-secondary/20
                     rounded-full translate-y-6 xs:translate-y-8 -translate-x-6 xs:-translate-x-8
                     group-hover:scale-150 group-hover:bg-novaxis-secondary/60
                     group-hover:shadow-[0_0_40px_rgba(107,182,255,0.9)]
                     transition-all duration-300 ease-in-out"
          animate={{
            boxShadow: isActive
              ? '0 0 25px rgba(107,182,255,0.8)'
              : '0 0 0 rgba(107,182,255,0)'
          }}
          transition={fast}
        />

        {/* CONTENIDO ------------------------------------------------------ */}
        <div className="relative z-10 flex flex-col items-center justify-center flex-1">
          {/* Icono --------------------------------------------------------- */}
          <motion.div
            className="inline-flex items-center justify-center w-12 xs:w-16 h-12 xs:h-16 mb-3 xs:mb-4
                       bg-white rounded-full text-novaxis-primary
                       shadow-lg shadow-novaxis-secondary/50"
            whileHover={{ rotate: 360,
                          boxShadow: '0 0 30px rgba(107,182,255,0.8)' }}
            animate={{
              boxShadow: isActive
                ? '0 10px 25px rgba(0,0,0,0.1), 0 0 25px rgba(107,182,255,0.7)'
                : '0 10px 25px rgba(0,0,0,0.1)'
            }}
            transition={fast}
          >
            <div className="w-6 xs:w-8 h-6 xs:h-8 flex items-center justify-center">
              {icon}
            </div>
          </motion.div>

          {/* Número -------------------------------------------------------- */}
          <motion.div
            className="font-bold text-white mb-2"
            style={{
              fontSize: 'clamp(1.75rem, 7vw, 2.5rem)'
            }}
            animate={{
              textShadow: isActive
                ? '0 0 45px rgba(255,255,255,1)'
                : '0 0 0 rgba(255,255,255,0)',
              filter: isActive
                ? 'brightness(2) contrast(1.5)'
                : 'brightness(1) contrast(1)'
            }}
            transition={fast}
          >
            {count.toLocaleString()}{suffix}
          </motion.div>

          {/* Label --------------------------------------------------------- */}
          <div className="text-sm xs:text-base lg:text-lg font-medium text-novaxis-light text-center leading-tight px-2">
            {label}
          </div>
        </div>

        {/* Animated border (mismo) --------------------------------------- */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-transparent"
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
  )
}

/* ----------------------------------------------------------------------- */
export default function Stats () {
  const [activeIndex, setActiveIndex] = useState(0)
  const { ref, inView }              = useInView({ triggerOnce: true, threshold: 0.2 })

  /* Función de scroll mejorada ---------------------------------------- */
  const scrollToContact = () => {
    const element = document.getElementById('contacto')
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

  /* Efecto escalera – ritmo fijo, sin solaparse ------------------------ */
  useEffect(() => {
    if (!inView) return
    const id = setInterval(
      () => setActiveIndex(prev => (prev + 1) % 4),
      CYCLE_MS
    )
    return () => clearInterval(id)
  }, [inView])

  const stats = [
    { icon: <Building2  className="w-8 h-8" />, number: 250, label: 'Proyectos Concluidos', suffix: '+', delay: 0   },
    { icon: <Users      className="w-8 h-8" />, number: 500, label: 'Empleados Directos e Indirectos', suffix: '+', delay: 300 },
    { icon: <Calendar   className="w-8 h-8" />, number: 15 , label: 'Años Fundados', suffix: '+', delay: 600 },
    { icon: <Award      className="w-8 h-8" />, number: 50 , label: 'Miles de Panameños Beneficiados', suffix: 'K+', delay: 900 }
  ]

  return (
    <section className="relative py-20 bg-gradient-to-br
                        from-novaxis-primary via-novaxis-secondary to-novaxis-dark
                        overflow-hidden">
      {/* Fondo animado (igual) ------------------------------------------ */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 border border-white/10 rounded-full"
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-24 h-24 border border-white/10 rotate-45"
          animate={{ rotate: 405, scale: [1, 1.3, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />
        {/* Partículas flotantes (igual) ---------------------------------- */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${((i * 37) % 100)}%`,
              top : `${((i * 67) % 100)}%`
            }}
            animate={{ y: [0, -50, 0], opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              delay : i * 0.2
            }}
          />
        ))}
      </div>

      {/* Contenido principal -------------------------------------------- */}
      <div className="relative z-10 container-custom px-4">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl md:text-6xl font-heading font-bold text-white mb-4"
            animate={inView
              ? { backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }
              : {}}
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              background: 'linear-gradient(90deg, #ffffff, #ffd700, #ffffff)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Números que Respaldan Nuestra Experiencia
          </motion.h2>
          <p className="text-xl text-novaxis-light max-w-2xl mx-auto">
            Nuestra trayectoria en el sector de la construcción está respaldada por años de experiencia y proyectos exitosos en todo Panamá
          </p>
        </motion.div>

        <div className="stats-section-grid grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xs:gap-8 pb-10">
          {stats.map((stat, i) => (
            <StatItem key={i} {...stat} isActive={activeIndex === i} />
          ))}
        </div>

        {/* CTA (sin cambios) -------------------------------------------- */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.button
            onClick={scrollToContact}
            className="group text-novaxis-primary font-semibold
                       shadow-lg hover:shadow-xl transition-all duration-150"
            style={{
              fontSize: 'clamp(0.875rem, 3.2vw, 1rem)',
              padding: 'clamp(10px, 3.5vw, 16px) clamp(16px, 7vw, 24px)',
              borderRadius: 'clamp(24px, 14vw, 36px)',
              backgroundColor: 'white'
            }}
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeInOut' }}
          >
            <span className="mr-2">
              ¿Listo para iniciar tu proyecto de construcción?
            </span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
