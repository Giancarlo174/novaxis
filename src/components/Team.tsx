'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Linkedin, Instagram, X, HardHat, Calculator, Wrench, Building2 } from 'lucide-react'

interface TeamMember {
  id: number
  name: string
  role: string
  description: string
  skills: string[]
  image: string
  social: {
    linkedin?: string
    instagram?: string
  }
  icon: React.ReactNode
  color: string
}

interface TeamCardProps {
  member: TeamMember
  delay: number
  onMemberClick: (member: TeamMember) => void
}

function TeamCard({ member, delay, onMemberClick }: TeamCardProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3
  })

  return (
    <motion.div
      ref={ref}
      className="group relative cursor-pointer team-card"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ 
        default: { duration: 0.2 },
        opacity: { duration: 0.6, delay: delay / 1000 },
        y: { duration: 0.6, delay: delay / 1000 },
        scale: { duration: 0.6, delay: delay / 1000 }
      }}
      onClick={() => onMemberClick(member)}
    >
      <div className="relative bg-white rounded-2xl overflow-hidden shadow-novaxis hover:shadow-novaxis-xl transition-all duration-200 border border-gray-100 team-card-content">
        {/* Animated gradient background */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-200`} 
             style={{ background: `linear-gradient(135deg, ${member.color}, transparent)` }} />
        
        {/* Profile Image Area */}
        <div className="relative h-64 overflow-hidden">
          {/* Real photo */}
          <img
            src={member.image}
            alt={member.name}
            className={`absolute inset-0 w-full h-full object-cover ${
              member.name === "Ing. Reynaldo De Gracia" 
                ? "object-[50%_10%]" 
                : member.name === "Ing. Meisy Rangel" 
                ? "object-[50%_25%]" 
                : member.name === "Ing. Carolina González" 
                ? "object-[50%_20%]" 
                : member.name === "Ing. Alexandra Del Barrio" 
                ? "object-[50%_30%]" 
                : "object-center"
            }`}
          />
          {/* Gradient overlay */}
          <div 
            className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
          />
          
          {/* Hover overlay */}
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
              <p className="text-sm font-medium">Ver perfil</p>
            </motion.button>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <motion.h3 
            className="text-xl font-heading font-semibold text-gray-800 mb-2 transition-colors duration-150"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.15 }}
          >
            {member.name}
          </motion.h3>
          
          <p className="text-novaxis-primary font-medium mb-3">
            {member.role}
          </p>

          <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
            {member.description}
          </p>

          {/* Skills preview */}
          <div className="flex flex-wrap gap-2 mb-4">
            {member.skills.slice(0, 3).map((skill, index) => (
              <motion.span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ delay: (delay + index * 50) / 1000 }}
                whileHover={{ scale: 1.1 }}
              >
                {skill}
              </motion.span>
            ))}
            {member.skills.length > 3 && (
              <span className="px-2 py-1 bg-novaxis-light text-novaxis-primary text-xs rounded-md">
                +{member.skills.length - 3} más
              </span>
            )}
          </div>

          {/* Social Links */}
          <div className="flex gap-3 mt-auto">
            {member.social.linkedin && (
              <motion.a
                href={member.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 transition-colors duration-150"
                whileHover={{ scale: 1.2, y: -2 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
            )}
            {member.social.instagram && (
              <motion.a
                href={member.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-600 transition-colors duration-150"
                whileHover={{ scale: 1.2, y: -2 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Modal Component
interface ModalProps {
  member: TeamMember | null
  onClose: () => void
}

function TeamModal({ member, onClose }: ModalProps) {
  if (!member) return null

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
          className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors duration-150"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>

          {/* Header */}
          <div className="relative h-64 overflow-hidden">
            {/* Color background */}
            <div 
              className="absolute inset-0"
              style={{ background: `linear-gradient(135deg, ${member.color}80, #4A90E280)` }}
            />
            {/* Image on top */}
            <img
              src={member.image}
              alt={member.name}
              className={`absolute inset-0 w-full h-full object-contain transform scale-125 z-10 ${
                member.name === "Ing. Reynaldo De Gracia" 
                  ? "object-[50%_10%]" 
                  : member.name === "Ing. Meisy Rangel" 
                  ? "object-[50%_25%]" 
                  : member.name === "Ing. Carolina González" 
                  ? "object-[50%_20%]" 
                  : member.name === "Ing. Alexandra Del Barrio" 
                  ? "object-[50%_30%]" 
                  : "object-center"
              }`}
            />
          </div>

          {/* Content */}
          <div className="p-8">
            <h2 className="text-3xl font-heading font-bold text-gray-800 mb-2">
              {member.name}
            </h2>
            
            <p className="text-xl text-novaxis-primary font-semibold mb-6">
              {member.role}
            </p>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {member.description}
            </p>

            {/* Skills */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Habilidades y Tecnologías:</h3>
              <div className="flex flex-wrap gap-3">
                {member.skills.map((skill, index) => (
                  <motion.span
                    key={index}
                    className="px-4 py-2 bg-novaxis-primary text-white rounded-full text-sm font-medium"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 justify-center">
              {member.social.linkedin && (
                <motion.a
                  href={member.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-150"
                  style={{
                    fontSize: 'clamp(0.875rem, 3.2vw, 1rem)',
                    padding: 'clamp(8px, 2.5vw, 12px) clamp(12px, 5vw, 18px)',
                    borderRadius: 'clamp(20px, 12vw, 28px)'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin className="w-5 h-5" />
                  LinkedIn
                </motion.a>
              )}
              
              {member.social.instagram && (
                <motion.a
                  href={member.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-150"
                  style={{
                    fontSize: 'clamp(0.875rem, 3.2vw, 1rem)',
                    padding: 'clamp(8px, 2.5vw, 12px) clamp(12px, 5vw, 18px)',
                    borderRadius: 'clamp(20px, 12vw, 28px)'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Instagram className="w-5 h-5" />
                  Instagram
                </motion.a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function Team() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
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

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Ing. Meisy Rangel",
      role: "Ingeniera Civil Pro",
      description: "Arquitecta creativa con enfoque en diseño sostenible y funcional. Experta en crear espacios arquitectónicos que combinan estética, funcionalidad y responsabilidad ambiental de manera excepcional.",
      skills: ["Diseño Arquitectónico", "AutoCAD", "Revit", "SketchUp", "Diseño Sostenible", "Planificación Urbana"],
      image: "/team/Meisy_Rangel.jpg",
      social: {
        linkedin: "#",
        instagram: "https://instagram.com/meilix.uwu"
      },
      icon: <Building2 className="w-20 h-20" />,
      color: "#E74C3C"
    },
    {
      id: 4,
      name: "Ing. Alexandra Del Barrio",
      role: "Especialista en Control de Calidad",
      description: "Experta en control de calidad y supervisión técnica de proyectos de construcción. Garantiza que todas las obras cumplan con las normas técnicas panameñas y estándares internacionales de calidad y seguridad.",
      skills: ["Control de Calidad", "Supervisión Técnica", "Normativas", "Ensayos de Materiales", "Seguridad Industrial", "Gestión Ambiental", "Auditorías"],
      image: "/team/Alexandra_Del_Barrio.jpg",
      social: {
        linkedin: "#",
        instagram: "https://instagram.com/meilix.uwu"
      },
      icon: <Calculator className="w-20 h-20" />,
      color: "#E74C3C"
    },
    {
      id: 3,
      name: "Ing. Carolina González",
      role: "Ingeniera de Sistemas Hidráulicos",
      description: "Especialista en diseño y construcción de acueductos y plantas potabilizadoras. Garantiza el suministro de agua potable de calidad para comunidades urbanas y rurales en todo Panamá.",
      skills: ["Sistemas Hidráulicos", "Plantas Potabilizadoras", "Acueductos", "Tratamiento de Agua", "Bombeo", "Tuberías", "Control de Calidad del Agua"],
      image: "/team/Carolina_Gonzalez.jpg",
      social: {
        linkedin: "#",
        instagram: "https://instagram.com/meilix.uwu"
      },
      icon: <Wrench className="w-20 h-20" />,
      color: "#E74C3C"
    },
    {
      id: 2,
      name: "Ing. Reynaldo De Gracia",
      role: "Desarrollador de Software & Auditor de Sistemas",
      description: "Líder visionario con más de 20 años de experiencia en administración de proyectos de construcción y desarrollo de infraestructura. Especializado en obras de gran escala y gestión integral de proyectos.",
      skills: ["Gestión de Proyectos", "Estructuras", "Concreto Armado", "AutoCAD", "Project Management", "Control de Calidad", "Supervisión", "Liderazgo"],
      image: "/team/Reynaldo_De_Gracia.jpg",
      social: {
        linkedin: "#",
        instagram: "https://instagram.com/meilix.uwu"
      },
      icon: <HardHat className="w-20 h-20" />,
      color: "#27AE60"
    },
    {
      id: 5,
      name: "Ing. Janice Ocaña",
      role: "Especialista en Gestión Ambiental",
      description: "Experta en gestión ambiental y sostenibilidad en proyectos de construcción. Se encarga de garantizar que todos los proyectos cumplan con las normativas ambientales y promuevan prácticas sostenibles.",
      skills: ["Gestión Ambiental", "Sostenibilidad", "Evaluación de Impacto", "Normativas Ambientales", "Conservación", "Energías Renovables"],
      image: "/team/Janice_Ocana.jpg",
      social: {
        linkedin: "#",
        instagram: "https://instagram.com/meilix.uwu"
      },
      icon: <Building2 className="w-20 h-20" />,
      color: "#E74C3C"
    }
  ]

  return (
    <section id="equipo" className="section-padding bg-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(74, 144, 226, 0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
        
        {/* Floating elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-novaxis-primary/10 rounded-full"
            style={{
              left: `${((i * 59) % 100)}%`,
              top: `${((i * 83) % 100)}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.1, 0.6, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 6 + (i % 2),
              repeat: Infinity,
              delay: i * 0.3,
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
            Nuestro Equipo
          </motion.h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conoce a los profesionales especializados que hacen posible cada proyecto de construcción exitoso
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="flex flex-col items-center gap-8 mb-16">
          {/* Primera fila - 3 miembros */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
            {teamMembers.slice(0, 3).map((member, index) => (
              <TeamCard
                key={member.id}
                member={member}
                delay={index * 150}
                onMemberClick={setSelectedMember}
              />
            ))}
          </div>
          
          {/* Segunda fila - 2 miembros centrados */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
            {teamMembers.slice(3, 5).map((member, index) => (
              <TeamCard
                key={member.id}
                member={member}
                delay={(index + 3) * 150}
                onMemberClick={setSelectedMember}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
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
            <span className="mr-3">¿Quieres trabajar con nosotros?</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.button>
          
          <p className="mt-4 text-gray-600">
            Únete a nuestro equipo de ingenieros y arquitectos excepcionales
          </p>
        </motion.div>
      </div>

      {/* Modal */}
      <TeamModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </section>
  )
}
