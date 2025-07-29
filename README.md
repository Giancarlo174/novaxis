# Novaxis - Landing Page Corporativa

![Novaxis Logo](/public/logo.png)

## 📋 Descripción

Novaxis es una landing page corporativa con fines educativos para una empresa panameña ficticia de administración y ejecución de proyectos de construcción. Esta aplicación web presenta los servicios, proyectos, información sobre la empresa y un formulario de contacto, todo en un diseño moderno y atractivo con animaciones fluidas.

## 🚀 Características

- **Diseño Responsivo**: Optimizado para todo tipo de dispositivos desde móviles hasta pantallas grandes
- **Animaciones Fluidas**: Implementadas con Framer Motion para crear una experiencia de usuario interactiva
- **Formulario de Contacto**: Con validación completa y envío de emails mediante Resend
- **Navegación Intuitiva**: Menú de navegación fijo con efecto de transparencia al hacer scroll
- **Secciones Completas**:
  - Hero con estadísticas animadas
  - Servicios ofrecidos con tarjetas interactivas
  - Proyectos destacados con galería
  - Sobre nosotros con misión, visión y valores
  - Análisis FODA (Fortalezas, Oportunidades, Debilidades, Amenazas)
  - Equipo con perfiles detallados
  - Formulario de contacto con validación
  - Footer con información y enlaces

## 🛠️ Tecnologías

- **Framework**: [Next.js 14](https://nextjs.org/) con App Router
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/)
- **Animaciones**: [Framer Motion](https://www.framer.com/motion/)
- **Formularios**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://github.com/colinhacks/zod)
- **Emails**: [Resend](https://resend.com/)
- **Componentes de UI**: [Lucide React](https://lucide.dev/docs/lucide-react) (iconos)
- **Notificaciones**: [React Hot Toast](https://react-hot-toast.com/)
- **Efectos de Scroll**: [React Intersection Observer](https://github.com/thebuilder/react-intersection-observer)

## 🎨 Paleta de Colores

- **Primary**: #4A90E2 (Azul primario del logo)
- **Secondary**: #6BB6FF (Azul secundario más claro)
- **Dark**: #2C5282 (Azul oscuro para hover/bordes)
- **Light**: #E6F3FF (Azul muy claro para backgrounds)

## 📦 Estructura del Proyecto

```
novaxis-landing/
├── public/              # Archivos estáticos
│   ├── logo.png         # Logo de Novaxis
│   ├── projects/        # Imágenes de proyectos
│   └── team/            # Fotos del equipo
├── src/
│   ├── app/             # Estructura de Next.js App Router
│   │   ├── globals.css  # Estilos globales
│   │   ├── layout.tsx   # Layout principal
│   │   ├── page.tsx     # Página principal
│   │   └── api/         # Rutas de API
│   │       └── contact/ # API para el formulario de contacto
│   └── components/      # Componentes de la aplicación
│       ├── About.tsx    # Sección Sobre Nosotros
│       ├── Contact.tsx  # Formulario de contacto
│       ├── Foda.tsx     # Análisis FODA
│       ├── Footer.tsx   # Pie de página
│       ├── Hero.tsx     # Sección principal
│       ├── Logo.tsx     # Componente de logo
│       ├── Navbar.tsx   # Barra de navegación
│       ├── Projects.tsx # Sección de proyectos
│       ├── Services.tsx # Sección de servicios
│       └── Team.tsx     # Sección del equipo
└── ... # Archivos de configuración
```

## 🚀 Instalación y Uso

### Requisitos Previos

- Node.js (v18 o superior)
- npm o yarn

### Configuración

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Giancarlo174/novaxis.git
   cd novaxis
   ```

2. Instala las dependencias:
   ```bash
   npm install
   # o
   yarn install
   ```

3. Configura las variables de entorno:
   Crea un archivo `.env.local` en la raíz del proyecto con:
   ```
   RESEND_API_KEY=tu_api_key_de_resend
   EMAIL_RECIPIENT=email_destino@ejemplo.com
   ```

4. Ejecuta el servidor de desarrollo:
   ```bash
   npm run dev
   # o
   yarn dev
   ```

5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.