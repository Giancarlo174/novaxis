'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, X, Building2, Droplets, HardHat, Hammer } from 'lucide-react'
import Image from 'next/image'

interface Project {
  id: number
  title: string
  description: string
  category: string
  image: string
  technologies: string[]
  link?: string
  icon: React.ReactNode
}

interface ProjectCardProps {
  project: Project
  delay: number
  onImageClick: (project: Project) => void
}

function ProjectCard({ project, delay, onImageClick }: ProjectCardProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3
  })

  return (
    <motion.div
      ref={ref}
      className="group relative project-card"
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
      <div className="relative bg-white rounded-2xl overflow-hidden shadow-novaxis hover:shadow-novaxis-xl transition-all duration-200 border border-gray-100 project-card-content">
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden cursor-pointer" onClick={() => onImageClick(project)}>
          {/* Real project image */}
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            <motion.button
              className="bg-white text-novaxis-primary font-semibold flex items-center gap-2 shadow-lg"
              style={{
                fontSize: 'clamp(0.875rem, 3.2vw, 1rem)',
                padding: 'clamp(8px, 2.5vw, 12px) clamp(12px, 5vw, 18px)',
                borderRadius: 'clamp(20px, 12vw, 28px)'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.15 }}
            >
              <ExternalLink className="w-4 h-4" />
              Ver más
            </motion.button>
          </motion.div>
          
          {/* Category badge */}
          <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-novaxis-primary text-sm font-medium rounded-full">
            {project.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-xl font-heading font-semibold text-gray-800 mb-3 group-hover:text-novaxis-primary transition-colors duration-150">
            {project.title}
          </h3>
          
          <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, index) => (
              <motion.span
                key={index}
                className="px-3 py-1 bg-novaxis-light text-novaxis-dark text-xs font-medium rounded-full"
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                whileHover={{ scale: 1.1 }}
                transition={{ 
                  default: { duration: 0.15 },
                  opacity: { delay: (delay + index * 50) / 1000 },
                  scale: { delay: (delay + index * 50) / 1000 }
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* Action Button */}
          <div className="mt-auto">
            <motion.button
              onClick={() => onImageClick(project)}
              className="inline-flex items-center gap-2 text-novaxis-primary font-medium hover:text-novaxis-dark transition-colors duration-150"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.15 }}
            >
              Ver proyecto
              <ExternalLink className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Modal Component
interface ModalProps {
  project: Project | null
  onClose: () => void
}

function ProjectModal({ project, onClose }: ModalProps) {
  if (!project) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors duration-150"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>

          {/* Image */}
          <div className="relative h-80 overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
            {/* Subtle overlay for better text readability */}
            <div className="absolute inset-0 bg-black/20" />
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="inline-block px-4 py-2 bg-novaxis-light text-novaxis-primary rounded-full text-sm font-medium mb-4">
              {project.category}
            </div>
            
            <h2 className="text-3xl font-heading font-bold text-gray-800 mb-4">
              {project.title}
            </h2>
            
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {project.description}
            </p>

            {/* Technologies */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Tecnologías utilizadas:</h3>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech, index) => (
                  <motion.span
                    key={index}
                    className="px-4 py-2 bg-novaxis-primary text-white rounded-full text-sm font-medium"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
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

  const projects: Project[] = [
    {
      id: 1,
      title: "Torre Residencial Vista Pacífico",
      description: "Complejo residencial de 25 pisos con 180 apartamentos de lujo, amenidades modernas, sistema de seguridad avanzado y diseño sostenible. Incluye áreas verdes, piscina y gimnasio completo.",
      category: "Edificaciones",
      image: "/projects/Torre_Residencial_Vista_del_Pacifico.jpg",
      technologies: ["Concreto Armado", "Estructura Metálica", "Sistemas MEP", "BIM", "Certificación LEED"],
      link: "#",
      icon: <Building2 className="w-20 h-20" />
    },
    {
      id: 2,
      title: "Planta Potabilizadora de Agua - Chiriquí",
      description: "Construcción de planta de tratamiento de agua potable con capacidad para 50,000 habitantes, tecnología de filtración avanzada y sistemas de monitoreo automático para garantizar la calidad del agua.",
      category: "Infraestructura Hidráulica",
      image: "/projects/Planta_Potabilizadora_de_Agua_Chiriqui.jpg",
      technologies: ["Sistemas de Filtración", "Bombeo", "Control Automático", "Tratamiento Químico"],
      link: "#",
      icon: <Droplets className="w-20 h-20" />
    },
    {
      id: 3,
      title: "Centro Comercial Multiplaza Panamá Este",
      description: "Construcción de centro comercial de 3 niveles con 150 locales comerciales, área de entretenimiento, food court y estacionamiento para 800 vehículos. Diseño moderno y funcional.",
      category: "Edificaciones",
      image: "/projects/Centro_Comercial_Multiplaza_Panama_Este.jpg",
      technologies: ["Estructura de Acero", "Concreto", "Sistemas de Climatización", "Seguridad"],
      link: "#",
      icon: <Building2 className="w-20 h-20" />
    },
    {
      id: 4,
      title: "Restauración Catedral San José",
      description: "Proyecto integral de restauración de edificación histórica del siglo XVIII, conservando elementos arquitectónicos originales y modernizando sistemas estructurales para garantizar la seguridad.",
      category: "Restauraciones",
      image: "/projects/Restauracion_Catedral_San_Jose.jpg",
      technologies: ["Restauración Patrimonial", "Refuerzo Estructural", "Conservación", "Materiales Históricos"],
      link: "#",
      icon: <Hammer className="w-20 h-20" />
    },
    {
      id: 5,
      title: "Acueducto Rural - Provincia de Coclé",
      description: "Sistema de acueducto para abastecer 12 comunidades rurales con red de distribución de 45 km, estaciones de bombeo y tanques de almacenamiento, beneficiando a 8,000 habitantes.",
      category: "Infraestructura Hidráulica",
      image: "/projects/Acueducto_Rural_Provincia_de_Cocle.jpg",
      technologies: ["Redes de Distribución", "Estaciones de Bombeo", "Almacenamiento", "Monitoreo"],
      link: "#",
      icon: <Droplets className="w-20 h-20" />
    },
    {
      id: 6,
      title: "Complejo Industrial Zona Libre de Colón",
      description: "Construcción de complejo industrial con 8 naves de 2,000 m² cada una, sistemas de carga y descarga, oficinas administrativas y servicios auxiliares para operaciones logísticas.",
      category: "Infraestructura Industrial",
      image: "/projects/Complejo_Industrial_Zona_Libre_de_Colon.jpg",
      technologies: ["Estructura Prefabricada", "Sistemas Industriales", "Logística", "Seguridad Industrial"],
      link: "#",
      icon: <HardHat className="w-20 h-20" />
    }
  ]

  return (
    <section id="proyectos" className="section-padding bg-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(74, 144, 226, 0.15) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
        
        {/* Floating elements */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-novaxis-primary/10 rounded-full"
            style={{
              left: `${((i * 41) % 100)}%`,
              top: `${((i * 71) % 100)}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.1, 0.6, 0.1],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 5 + (i % 3),
              repeat: Infinity,
              delay: i * 0.25,
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
            Nuestros Proyectos
          </motion.h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre algunos de los proyectos de construcción exitosos que hemos desarrollado en toda Panamá
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              delay={index * 150}
              onImageClick={setSelectedProject}
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
            <span className="mr-3">¿Tienes un proyecto de construcción en mente?</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.button>
          
          <p className="mt-4 text-gray-600">
            Convirtamos tu visión arquitectónica en realidad
          </p>
        </motion.div>
      </div>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  )
}
