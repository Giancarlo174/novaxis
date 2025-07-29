'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Building2, 
  HardHat, 
  Hammer, 
  Droplets, 
  Wrench, 
  Zap,
  TreePine,
  BarChart3,
  Shield,
  ArrowRight
} from 'lucide-react'

interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
  delay?: number
  onQuoteClick: (serviceName: string) => void
}

function ServiceCard({ icon, title, description, delay = 0, onQuoteClick }: ServiceCardProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3
  })

  return (
    <motion.div
      ref={ref}
      className="group relative service-card"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ 
        default: { duration: 0.2 },
        opacity: { duration: 0.6, delay: delay / 1000 },
        y: { duration: 0.6, delay: delay / 1000 }
      }}
    >
      <div className="relative bg-white rounded-2xl p-8 shadow-novaxis hover:shadow-novaxis-xl transition-all duration-200 border border-gray-100 overflow-hidden service-card-content">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-novaxis-light/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        
        {/* Floating elements */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-novaxis-primary/5 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-200" />
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-novaxis-secondary/5 rounded-full translate-y-8 -translate-x-8 group-hover:scale-150 transition-transform duration-200" />
        
        {/* Animated border */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-novaxis-primary via-novaxis-secondary to-novaxis-primary bg-clip-border opacity-0 group-hover:opacity-100 transition-opacity duration-150"
          style={{
            background: 'linear-gradient(45deg, transparent, rgba(74, 144, 226, 0.1), transparent) border-box',
            mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
            maskComposite: 'subtract'
          }}
        />

        <div className="relative z-10 flex flex-col h-full">
          {/* Icon with animation */}
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-gradient-to-br from-novaxis-primary to-novaxis-secondary rounded-xl text-white shadow-lg"
            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            {icon}
          </motion.div>

          {/* Title */}
          <h3 className="text-xl font-heading font-semibold text-gray-800 mb-4 group-hover:text-novaxis-primary transition-colors duration-200">
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 mb-6 leading-relaxed flex-1">
            {description}
          </p>

          {/* CTA Button */}
          <div className="mt-auto">
            <motion.button
              onClick={() => onQuoteClick(title)}
              className="group/btn inline-flex items-center bg-novaxis-primary/10 text-novaxis-primary font-medium hover:bg-novaxis-primary hover:text-white transition-all duration-150"
              style={{
                fontSize: 'clamp(0.875rem, 3.2vw, 1rem)',
                padding: 'clamp(8px, 2.5vw, 12px) clamp(12px, 5vw, 18px)',
                borderRadius: 'clamp(20px, 12vw, 28px)'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15 }}
            >
              <span>Cotizar</span>
              <motion.div
                className="ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-novaxis-primary/0 via-novaxis-primary/5 to-novaxis-secondary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 blur-xl" />
      </div>
    </motion.div>
  )
}

export default function Services() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

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

  const openWhatsApp = (serviceName: string) => {
    const phoneNumber = '50769604824' // +507 6960-4824 sin espacios ni símbolos
    const message = `Hola, me interesa cotizar el servicio de ${serviceName}. ¿Podrían brindarme más información?`
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
  }

  const services = [
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "Edificaciones",
      description: "Construcción de edificios residenciales, comerciales e industriales con los más altos estándares de calidad y seguridad.",
      delay: 0
    },
    {
      icon: <HardHat className="w-8 h-8" />,
      title: "Estructuras",
      description: "Diseño y construcción de estructuras de concreto, acero y madera para proyectos de cualquier escala y complejidad.",
      delay: 100
    },
    {
      icon: <Hammer className="w-8 h-8" />,
      title: "Restauraciones",
      description: "Restauración y rehabilitación de edificaciones históricas y modernas, preservando su valor arquitectónico y funcional.",
      delay: 200
    },
    {
      icon: <Droplets className="w-8 h-8" />,
      title: "Plantas Potabilizadoras",
      description: "Construcción de plantas de tratamiento de agua potable con tecnología de vanguardia para comunidades y empresas.",
      delay: 300
    },
    {
      icon: <Wrench className="w-8 h-8" />,
      title: "Acueductos",
      description: "Diseño y construcción de sistemas de acueductos para garantizar el suministro de agua a comunidades urbanas y rurales.",
      delay: 400
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Infraestructura Eléctrica",
      description: "Instalación de sistemas eléctricos industriales y residenciales con tecnología moderna y certificaciones internacionales.",
      delay: 500
    },
    {
      icon: <TreePine className="w-8 h-8" />,
      title: "Obras Ambientales",
      description: "Proyectos de construcción sostenible y obras de mitigación ambiental comprometidos con el ecosistema panameño.",
      delay: 600
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Gestión de Proyectos",
      description: "Administración integral de proyectos de construcción desde la planificación hasta la entrega final con metodologías certificadas.",
      delay: 700
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Control de Calidad",
      description: "Supervisión y control de calidad en todas las fases del proyecto garantizando el cumplimiento de normas técnicas panameñas.",
      delay: 800
    }
  ]

  return (
    <section id="servicios" className="section-padding bg-gray-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Geometric shapes */}
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 border border-novaxis-primary/10 rounded-full"
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-48 h-48 border border-novaxis-secondary/10 rotate-45"
          animate={{ rotate: 405, scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* Floating dots */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-novaxis-primary/20 rounded-full"
            style={{
              left: `${((i * 43) % 100)}%`,
              top: `${((i * 61) % 100)}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + (i % 2),
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container-custom">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl md:text-6xl font-heading font-bold gradient-text mb-6"
            animate={inView ? {
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            } : {}}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Nuestros Servicios
          </motion.h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ofrecemos servicios integrales de construcción e ingeniería civil que impulsan el desarrollo de la infraestructura panameña
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              delay={service.delay}
              onQuoteClick={openWhatsApp}
            />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.button
            onClick={scrollToContact}
            className="group bg-novaxis-primary text-white font-semibold shadow-novaxis hover:shadow-novaxis-xl transition-all duration-150"
            style={{
              fontSize: 'clamp(0.875rem, 3.2vw, 1rem)',
              padding: 'clamp(10px, 3.5vw, 16px) clamp(16px, 7vw, 24px)',
              borderRadius: 'clamp(24px, 14vw, 36px)'
            }}
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="mr-3">¿Necesitas una cotización personalizada?</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.button>
          
          <p className="mt-4 text-gray-600">
            Contáctanos para una evaluación gratuita de tu proyecto
          </p>
        </motion.div>
      </div>
    </section>
  )
}
