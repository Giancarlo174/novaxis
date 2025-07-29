'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle, 
  Loader2,
  MessageSquare,
  User,
  FileText
} from 'lucide-react'

// Validation schema
const contactSchema = z.object({
  name: z.string()
    .trim() // Elimina espacios al inicio y final
    .min(1, 'El nombre es obligatorio')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .refine((val) => val.trim().length > 0, 'El nombre no puede estar vacío'),
  email: z.string()
    .trim()
    .min(1, 'El email es obligatorio')
    .email('Ingresa un email válido')
    .refine((val) => val.trim().length > 0, 'El email no puede estar vacío'),
  subject: z.string()
    .trim()
    .min(1, 'El asunto es obligatorio')
    .min(5, 'El asunto debe tener al menos 5 caracteres')
    .refine((val) => val.trim().length >= 5, 'El asunto debe tener al menos 5 caracteres sin espacios'),
  message: z.string()
    .trim()
    .min(1, 'El mensaje es obligatorio')
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .refine((val) => val.trim().length >= 10, 'El mensaje debe tener al menos 10 caracteres sin espacios'),
})

type ContactFormData = z.infer<typeof contactSchema>

interface ContactInfoItemProps {
  icon: React.ReactNode
  title: string
  value: string
  delay: number
}

function ContactInfoItem({ icon, title, value, delay }: ContactInfoItemProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3
  })

  return (
    <motion.div
      ref={ref}
      className="group flex items-center gap-4 p-4 xs:p-6 bg-white rounded-xl shadow-novaxis hover:shadow-novaxis-lg transition-all duration-150 min-w-0"
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: 0.6, delay: delay / 1000 }}
      whileHover={{ x: 5, scale: 1.02 }}
    >
      <motion.div
        className="flex-shrink-0 w-10 h-10 xs:w-12 xs:h-12 bg-gradient-to-br from-novaxis-primary to-novaxis-secondary rounded-lg flex items-center justify-center text-white"
        whileHover={{ rotate: 5, scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        {icon}
      </motion.div>
      
      <div className="min-w-0 flex-1">
        <h3 className="font-semibold text-gray-800 group-hover:text-novaxis-primary transition-colors duration-150 text-sm xs:text-base">
          {title}
        </h3>
        <p className="text-gray-600 text-sm xs:text-base break-words overflow-wrap-anywhere">
          {value}
        </p>
      </div>
    </motion.div>
  )
}

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    
    // Aplicar trim a todos los campos antes de enviar
    const trimmedData = {
      name: data.name.trim(),
      email: data.email.trim(),
      subject: data.subject.trim(),
      message: data.message.trim(),
    }
    
    // Validar nuevamente los datos después del trim
    try {
      contactSchema.parse(trimmedData)
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        // Mostrar el primer error de validación
        const firstError = validationError.errors[0]
        toast.error(firstError.message, {
          icon: '⚠️',
          duration: 4000,
        })
        setIsSubmitting(false)
        return
      }
    }
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trimmedData),
      })

      if (response.ok) {
        toast.success('¡Mensaje enviado exitosamente! Te contactaremos pronto.', {
          icon: '🚀',
          duration: 5000,
        })
        reset()
      } else {
        const errorData = await response.json()
        
        // Si hay errores de validación específicos, mostrarlos
        if (errorData.details && Array.isArray(errorData.details)) {
          const firstError = errorData.details[0]
          toast.error(firstError.message || 'Error en la validación', {
            icon: '⚠️',
            duration: 4000,
          })
        } else {
          toast.error(errorData.error || 'Error al enviar el mensaje', {
            icon: '❌',
            duration: 4000,
          })
        }
      }
    } catch (error) {
      toast.error('Error al enviar el mensaje. Inténtalo de nuevo.', {
        icon: '❌',
        duration: 4000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      value: "meisy.rangel@utp.ac.pa",
      delay: 0
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Teléfono",
      value: "+507 6960-4824",
      delay: 200
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Ubicación",
      value: "La Chorrera, Panamá",
      delay: 400
    }
  ]

  const inputVariants = {
    focus: {
      scale: 1.02,
      borderColor: '#4A90E2',
      boxShadow: '0 0 0 3px rgba(74, 144, 226, 0.1)',
    }
  }

  return (
    <section id="contacto" className="section-padding bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        {/* Geometric shapes */}
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 border border-novaxis-primary/10 rounded-full"
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-48 h-48 border border-novaxis-secondary/10 rotate-45"
          animate={{ rotate: 405, scale: [1, 1.2, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-novaxis-primary/20 rounded-full"
            style={{
              left: `${((i * 47) % 100)}%`,
              top: `${((i * 73) % 100)}%`,
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
            Contáctanos
          </motion.h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ¿Listo para iniciar tu proyecto de construcción? Hablemos sobre tu próxima obra
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="mb-12">
              <motion.h3
                className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-6"
                whileInView={{ 
                  color: ['#374151', '#4A90E2', '#374151']
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ¿Listo para tu proyecto de construcción?
              </motion.h3>
              
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Nos encantaría conocer más sobre tu proyecto de construcción y cómo podemos ayudarte a materializarlo con la más alta calidad.
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  Completa el formulario y te responderemos en menos de 24 horas con una cotización personalizada para tu obra.
                </motion.p>
              </div>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <ContactInfoItem
                  key={index}
                  icon={info.icon}
                  title={info.title}
                  value={info.value}
                  delay={info.delay}
                />
              ))}
            </div>

            {/* Additional CTA */}
            <motion.div
              className="mt-12 p-6 bg-gradient-to-br from-novaxis-primary to-novaxis-secondary rounded-xl text-white"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, delay: 1 }}
              whileHover={{ scale: 1.02 }}
            >
              <h4 className="text-xl font-semibold mb-2">Evaluación Gratuita</h4>
              <p className="text-novaxis-light">
                Agenda una visita técnica sin costo para evaluar tu proyecto y brindarte una cotización detallada.
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-white rounded-2xl shadow-novaxis-lg p-8 border border-gray-100">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 text-novaxis-primary" />
                    Nombre completo *
                  </label>
                  <motion.input
                    type="text"
                    {...register('name')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-novaxis-primary focus:border-transparent transition-all duration-150 text-gray-900 placeholder-gray-500"
                    placeholder="Tu nombre completo"
                    whileFocus={inputVariants.focus}
                  />
                  {errors.name && (
                    <motion.p 
                      className="text-red-500 text-sm mt-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {errors.name.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Email Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 text-novaxis-primary" />
                    Email *
                  </label>
                  <motion.input
                    type="email"
                    {...register('email')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-novaxis-primary focus:border-transparent transition-all duration-150 text-gray-900 placeholder-gray-500"
                    placeholder="tu@email.com"
                    whileFocus={inputVariants.focus}
                  />
                  {errors.email && (
                    <motion.p 
                      className="text-red-500 text-sm mt-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {errors.email.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Subject Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <FileText className="w-4 h-4 text-novaxis-primary" />
                    Asunto *
                  </label>
                  <motion.input
                    type="text"
                    {...register('subject')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-novaxis-primary focus:border-transparent transition-all duration-150 text-gray-900 placeholder-gray-500"
                    placeholder="¿De qué quieres hablar?"
                    whileFocus={inputVariants.focus}
                  />
                  {errors.subject && (
                    <motion.p 
                      className="text-red-500 text-sm mt-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {errors.subject.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Message Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                >
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <MessageSquare className="w-4 h-4 text-novaxis-primary" />
                    Mensaje *
                  </label>
                  <motion.textarea
                    rows={5}
                    {...register('message')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-novaxis-primary focus:border-transparent transition-all duration-150 resize-none text-gray-900 placeholder-gray-500"
                    placeholder="Describe tu proyecto detalladamente. Incluye ubicación, tipo de construcción, presupuesto estimado, etc."
                    whileFocus={inputVariants.focus}
                  />
                  {errors.message && (
                    <motion.p 
                      className="text-red-500 text-sm mt-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {errors.message.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-novaxis-primary to-novaxis-secondary text-white font-semibold py-4 px-6 rounded-lg shadow-novaxis hover:shadow-novaxis-xl transition-all duration-150 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 1 }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Enviar mensaje
                    </>
                  )}
                </motion.button>

                {/* Form Footer */}
                <motion.p
                  className="text-sm text-gray-500 text-center"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                >
                  Te responderemos en menos de 24 horas
                </motion.p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
