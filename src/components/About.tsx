'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Target, Eye, Heart, Building2, Users, Award } from 'lucide-react'

interface ValueCardProps {
  icon: React.ReactNode
  title: string
  description: string
  delay: number
}

function ValueCard({ icon, title, description, delay }: ValueCardProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3
  })

  return (
    <motion.div
      ref={ref}
      className="group relative text-center"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
      whileHover={{ y: -5 }}
      transition={{ 
        default: { duration: 0.2 },
        opacity: { duration: 0.6, delay: delay / 1000 },
        y: { duration: 0.6, delay: delay / 1000 },
        scale: { duration: 0.6, delay: delay / 1000 }
      }}
    >
      <div className="relative bg-white rounded-2xl p-8 shadow-novaxis hover:shadow-novaxis-xl transition-all duration-200 border border-gray-100 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-novaxis-light/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        
        {/* Floating decorative elements */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-novaxis-primary/5 rounded-full -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-200" />
        <div className="absolute bottom-0 left-0 w-12 h-12 bg-novaxis-secondary/5 rounded-full translate-y-6 -translate-x-6 group-hover:scale-150 transition-transform duration-200" />
        
        <div className="relative z-10">
          {/* Icon */}
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-gradient-to-br from-novaxis-primary to-novaxis-secondary rounded-xl text-white shadow-lg"
            whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            {icon}
          </motion.div>

          {/* Title */}
          <h3 className="text-xl font-heading font-semibold text-gray-800 mb-4 group-hover:text-novaxis-primary transition-colors duration-150">
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-novaxis-primary/0 via-novaxis-primary/5 to-novaxis-secondary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 blur-xl" />
      </div>
    </motion.div>
  )
}

export default function About() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const scrollToTeam = () => {
    const element = document.getElementById('equipo')
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

  const values = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Misión",
      description: "Administrar y ejecutar proyectos de construcción de alta calidad que contribuyan al desarrollo de la infraestructura panameña con excelencia técnica y responsabilidad social.",
      delay: 0
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Visión",
      description: "Ser la empresa líder en administración de proyectos de construcción en Panamá, reconocida por nuestra excelencia, innovación y compromiso con el desarrollo sostenible del país.",
      delay: 200
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Valores",
      description: "Integridad, calidad, compromiso y responsabilidad ambiental son los pilares que guían cada proyecto y relación con nuestros clientes y comunidades.",
      delay: 400
    }
  ]

  const achievements = [
    { icon: <Users className="w-6 h-6" />, label: "Empleados directos e indirectos", value: "500+" },
    { icon: <Award className="w-6 h-6" />, label: "Proyectos concluidos", value: "250+" },
    { icon: <Building2 className="w-6 h-6" />, label: "Años de experiencia", value: "15+" }
  ]

  return (
    <section id="sobre-nosotros" className="section-padding bg-gray-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Geometric patterns */}
        <motion.div
          className="absolute top-20 left-20 w-40 h-40 border border-novaxis-primary/10 rounded-full"
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-32 h-32 border border-novaxis-secondary/10 rotate-45"
          animate={{ rotate: 405, scale: [1, 1.2, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-novaxis-primary/20 rounded-full"
            style={{
              left: `${((i * 53) % 100)}%`,
              top: `${((i * 79) % 100)}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.3, 1],
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
        {/* Header */}
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
            Sobre Nosotros
          </motion.h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conoce nuestra historia, valores y el equipo que hace posible construir la infraestructura de Panamá
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h3
              className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-6"
              whileInView={{ 
                color: ['#374151', '#4A90E2', '#374151']
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Construyendo la infraestructura de Panamá
            </motion.h3>
            
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                En <span className="font-semibold text-novaxis-primary">Novaxis</span>, somos más que una empresa constructora. 
                Somos arquitectos del desarrollo panameño, comprometidos con transformar la visión de infraestructura 
                moderna en realidades que impulsen el crecimiento del país.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Con más de década y media de experiencia en el sector construcción, hemos contribuido al desarrollo de 
                centenas de proyectos que han beneficiado a miles de panameños, desde edificaciones residenciales y 
                comerciales hasta infraestructura crítica como plantas potabilizadoras y acueductos.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                Nuestro enfoque centrado en la calidad y nuestra pasión por la excelencia nos han posicionado como 
                líderes en administración de proyectos de construcción, restauraciones y desarrollo de infraestructura 
                sostenible en todo el territorio panameño.
              </motion.p>
            </div>

            {/* Quick Stats */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 xs:gap-6 mt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center text-center gap-3 bg-white rounded-xl p-4 xs:p-6 shadow-md min-h-[120px] xs:min-h-[140px]"
                  whileHover={{ scale: 1.05, y: -2 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                >
                  <div className="text-novaxis-primary flex-shrink-0">
                    {achievement.icon}
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="text-lg xs:text-xl font-bold text-gray-800 mb-1">{achievement.value}</div>
                    <div className="text-sm xs:text-base text-gray-600 leading-tight">{achievement.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Animated Visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative bg-gradient-to-br from-novaxis-primary via-novaxis-secondary to-novaxis-dark rounded-2xl p-8 h-96 overflow-hidden">
              {/* Animated shapes inside */}
              <motion.div
                className="absolute top-10 left-10 w-20 h-20 bg-white/20 rounded-full"
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 180, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 6, repeat: Infinity }}
              />
              <motion.div
                className="absolute top-20 right-10 w-16 h-16 bg-white/20 rotate-45"
                animate={{ 
                  y: [0, 20, 0],
                  rotate: [45, 225, 405],
                  scale: [1, 0.8, 1]
                }}
                transition={{ duration: 8, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-white/20 rounded-full"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              {/* Central icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="text-white"
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                >
                  <Building2 className="w-20 h-20" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-3xl md:text-4xl font-heading font-bold text-center text-gray-800 mb-12">
            Nuestros Pilares Fundamentales
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <ValueCard
                key={index}
                icon={value.icon}
                title={value.title}
                description={value.description}
                delay={value.delay}
              />
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.button
            onClick={scrollToTeam}
            className="group bg-novaxis-primary text-white font-semibold shadow-novaxis hover:shadow-novaxis-xl transition-all duration-150"
            style={{
              fontSize: 'clamp(0.875rem, 3.2vw, 1rem)',
              padding: 'clamp(10px, 3.5vw, 16px) clamp(16px, 7vw, 24px)',
              borderRadius: 'clamp(24px, 14vw, 36px)'
            }}
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="mr-3">Conoce a nuestro equipo</span>
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
