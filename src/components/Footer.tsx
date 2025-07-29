'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  Heart
} from 'lucide-react'
import Logo from './Logo'

export default function Footer() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const footerLinks = {
    servicios: [
      { name: 'Edificaciones', href: '#servicios' },
      { name: 'Plantas Potabilizadoras', href: '#servicios' },
      { name: 'Acueductos', href: '#servicios' },
      { name: 'Restauraciones', href: '#servicios' },
    ],
    empresa: [
      { name: 'Sobre nosotros', href: '#sobre-nosotros' },
      { name: 'Nuestro equipo', href: '#equipo' },
      { name: 'Proyectos', href: '#proyectos' },
      { name: 'Contacto', href: '#contacto' },
    ],
    sectores: [
      { name: 'Residencial', href: '#' },
      { name: 'Comercial', href: '#' },
      { name: 'Industrial', href: '#' },
      { name: 'Infraestructura', href: '#' },
    ],
    legal: [
      { name: 'Política de privacidad', href: '#' },
      { name: 'Términos de servicio', href: '#' },
      { name: 'Certificaciones', href: '#' },
      { name: 'Normativas', href: '#' },
    ]
  }

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: '#', name: 'Facebook', color: '#1877F2' },
    { icon: <Twitter className="w-5 h-5" />, href: '#', name: 'Twitter', color: '#1DA1F2' },
    { icon: <Instagram className="w-5 h-5" />, href: 'https://www.instagram.com/meilix.uwu', name: 'Instagram', color: '#E4405F' },
    { icon: <Linkedin className="w-5 h-5" />, href: '#', name: 'LinkedIn', color: '#0A66C2' },
  ]

  const contactInfo = [
    { icon: <Mail className="w-4 h-4" />, text: 'meisy.rangel@utp.ac.pa' },
    { icon: <Phone className="w-4 h-4" />, text: '+507 6960-4824' },
    { icon: <MapPin className="w-4 h-4" />, text: 'La Chorrera, Panamá' },
  ]

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-novaxis-dark text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Geometric patterns */}
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 border border-white/10 rounded-full"
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-24 h-24 border border-white/10 rotate-45"
          animate={{ rotate: 405, scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />

        {/* Floating particles */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${((i * 37) % 100)}%`,
              top: `${((i * 67) % 100)}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.6, 0.2],
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

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container-custom section-padding">
          <motion.div
            ref={ref}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            {/* Company Info */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <motion.div
                className="mb-6"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.15 }}
              >
                <Logo className="mb-4" width={150} height={75} isScrolled={false} />
              </motion.div>

              <p className="text-gray-300 mb-6 leading-relaxed">
                Administramos y ejecutamos proyectos de construcción de alta calidad que contribuyen
                al desarrollo de la infraestructura panameña con excelencia técnica.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3 text-gray-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    whileHover={{ x: 5 }}
                    transition={{
                      default: { duration: 0.15 },
                      opacity: { duration: 0.6, delay: 0.3 + index * 0.1 },
                      x: { duration: 0.6, delay: 0.3 + index * 0.1 }
                    }}
                  >
                    <div className="text-novaxis-secondary">
                      {item.icon}
                    </div>
                    <span className="text-sm">{item.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-gray-300 hover:text-white transition-all duration-150"
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: social.color,
                      y: -2
                    }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{
                      duration: 0.15,
                      ease: "easeInOut",
                      opacity: { delay: 0.6 + index * 0.1, duration: 0.6 },
                      scale: { delay: 0.6 + index * 0.1, duration: 0.6 }
                    }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-lg font-heading font-semibold mb-6 text-white">
                Servicios
              </h3>
              <ul className="space-y-3">
                {footerLinks.servicios.map((link, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  >
                    <motion.a
                      href={link.href}
                      className="text-gray-300 hover:text-novaxis-secondary transition-colors duration-150"
                      whileHover={{ x: 5 }}
                    >
                      {link.name}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Company */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h3 className="text-lg font-heading font-semibold mb-6 text-white">
                Empresa
              </h3>
              <ul className="space-y-3">
                {footerLinks.empresa.map((link, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  >
                    <motion.a
                      href={link.href}
                      className="text-gray-300 hover:text-novaxis-secondary transition-colors duration-150"
                      whileHover={{ x: 5 }}
                    >
                      {link.name}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Legal Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="text-lg font-heading font-semibold mb-6 text-white">
                Legal
              </h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  >
                    <motion.a
                      href={link.href}
                      className="text-gray-300 hover:text-novaxis-secondary transition-colors duration-150"
                      whileHover={{ x: 5 }}
                    >
                      {link.name}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-white/10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="container-custom px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Copyright */}
              <motion.div
                className="flex items-center gap-2 text-gray-400 text-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <span>© 2025 Novaxis. Todos los derechos reservados.</span>
              </motion.div>

              {/* Legal Links */}
              <motion.div
                className="flex gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 1.1 }}
              >
                {footerLinks.legal.slice(0, 2).map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    className="text-gray-400 hover:text-novaxis-secondary transition-colors duration-150 text-sm"
                    whileHover={{ y: -2 }}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Scroll to Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 w-12 h-12 bg-novaxis-primary rounded-full flex items-center justify-center text-white shadow-novaxis hover:shadow-novaxis-lg transition-all duration-150 z-20"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </footer>
  )
}
