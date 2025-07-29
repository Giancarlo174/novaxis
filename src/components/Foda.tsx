'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  TrendingUp, 
  Shield, 
  Target,
  Star
} from 'lucide-react'

interface FODAItemProps {
  title: string
  items: string[]
  icon: React.ReactNode
  color: string
  bgGradient: string
  borderColor: string
  delay: number
}

function FODAItem({ title, items, icon, color, bgGradient, borderColor, delay }: FODAItemProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <motion.div
      ref={ref}
      className="group relative"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      whileHover={{ y: -10, scale: 1.02 }}
    >
      <motion.div
        className={`relative h-full p-6 rounded-2xl backdrop-blur-sm border overflow-hidden
                   group-hover:shadow-2xl transition-all duration-300 ${borderColor} ${bgGradient}`}
        whileHover={{ boxShadow: '0 25px 50px rgba(0,0,0,0.15)' }}
      >
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -translate-y-10 translate-x-10" />
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8" />
        
        {/* Header with icon and title */}
        <div className="relative z-10 mb-6">
          <motion.div
            className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4 ${color}`}
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            {icon}
          </motion.div>
          
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <div className={`w-12 h-1 rounded-full ${color.replace('bg-', 'bg-opacity-80 bg-')}`} />
        </div>

        {/* Content list */}
        <div className="relative z-10 space-y-3">
          {items.map((item, index) => (
            <motion.div
              key={index}
              className="flex items-start space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.4, delay: delay + 0.1 + (index * 0.1) }}
            >
              <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${color}`} />
              <p className="text-white text-sm leading-relaxed font-medium">{item}</p>
            </motion.div>
          ))}
        </div>

        {/* Animated border */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-transparent opacity-50"
          style={{
            background: `linear-gradient(45deg, transparent, ${color.includes('emerald') ? '#10b981' : 
                        color.includes('blue') ? '#3b82f6' : 
                        color.includes('amber') ? '#f59e0b' : '#ef4444'}, transparent) border-box`,
            mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
            maskComposite: 'subtract'
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>
    </motion.div>
  )
}

export default function Stats() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  const scrollToContact = () => {
    const element = document.getElementById('contacto')
    if (element) {
      const headerOffset = 100
      const elementPosition = element.offsetTop
      const offsetPosition = elementPosition - headerOffset

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      })
    }
  }

  const fodaData = [
    {
      title: 'Fortalezas',
      items: [
        '15+ años de experiencia consolidada en el mercado panameño',
        'Equipo especializado de 500+ profesionales',
        'Portafolio diversificado: edificaciones, infraestructura, restauraciones',
        'Tecnología de vanguardia en gestión de proyectos',
        'Certificaciones internacionales de calidad',
        'Red de proveedores confiables y establecida'
      ],
      icon: <Star className="w-8 h-8" />,
      color: 'bg-emerald-500',
      bgGradient: 'bg-gradient-to-br from-emerald-500/40 to-emerald-600/25',
      borderColor: 'border-emerald-400/50',
      delay: 0
    },
    {
      title: 'Oportunidades',
      items: [
        'Crecimiento del sector construcción en Panamá',
        'Proyectos de infraestructura gubernamental',
        'Expansión hacia mercados centroamericanos',
        'Demanda creciente de construcción sostenible',
        'Inversión extranjera en desarrollo inmobiliario',
        'Digitalización de procesos constructivos'
      ],
      icon: <TrendingUp className="w-8 h-8" />,
      color: 'bg-blue-500',
      bgGradient: 'bg-gradient-to-br from-blue-500/40 to-blue-600/25',
      borderColor: 'border-blue-400/50',
      delay: 0.2
    },
    {
      title: 'Debilidades',
      items: [
        'Dependencia del mercado local panameño',
        'Competencia con empresas internacionales',
        'Necesidad de mayor presencia digital',
        'Procesos internos en continua optimización',
        'Capacitación constante en nuevas tecnologías',
        'Gestión de costos en proyectos complejos'
      ],
      icon: <Target className="w-8 h-8" />,
      color: 'bg-amber-500',
      bgGradient: 'bg-gradient-to-br from-amber-500/40 to-amber-600/25',
      borderColor: 'border-amber-400/50',
      delay: 0.4
    },
    {
      title: 'Amenazas',
      items: [
        'Fluctuaciones económicas regionales',
        'Cambios en regulaciones de construcción',
        'Competencia de empresas multinacionales',
        'Variabilidad en costos de materiales',
        'Impacto de fenómenos naturales',
        'Escasez de mano de obra especializada'
      ],
      icon: <Shield className="w-8 h-8" />,
      color: 'bg-red-500',
      bgGradient: 'bg-gradient-to-br from-red-500/40 to-red-600/25',
      borderColor: 'border-red-400/50',
      delay: 0.6
    }
  ]

  return (
    <section className="relative py-20 bg-gradient-to-br from-novaxis-primary via-novaxis-secondary to-novaxis-dark overflow-hidden">
      {/* Animated Background Elements */}
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
        
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${((i * 37) % 100)}%`,
              top: `${((i * 67) % 100)}%`
            }}
            animate={{ y: [0, -50, 0], opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container-custom px-4">
        {/* Header */}
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
            Análisis FODA
          </motion.h2>
          <p className="text-xl text-novaxis-light max-w-3xl mx-auto">
            Evaluación integral de nuestra posición en el mercado de la construcción,
            identificando nuestras fortalezas, oportunidades, debilidades y amenazas
          </p>
        </motion.div>

        {/* FODA Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {fodaData.map((item, index) => (
            <FODAItem key={index} {...item} />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
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
              ¿Quieres formar parte de nuestro crecimiento estratégico?
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
