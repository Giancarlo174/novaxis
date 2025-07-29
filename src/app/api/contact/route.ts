import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY)

const contactSchema = z.object({
  name: z.string()
    .trim() // Elimina espacios al inicio y final
    .min(1, 'El nombre es obligatorio')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .refine((val) => val.trim().length > 0, 'El nombre no puede estar vacío'),
  email: z.string()
    .trim()
    .min(1, 'El email es obligatorio')
    .email('Email inválido')
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

export async function POST(request: NextRequest) {
  try {
    console.log('API Key exists:', !!process.env.RESEND_API_KEY)
    console.log('Email recipient:', process.env.EMAIL_RECIPIENT)
    
    const body = await request.json()
    
    // Validate the request body
    const validatedData = contactSchema.parse(body)
    const { name, email, subject, message } = validatedData

    // Validación adicional para asegurar que no hay campos vacíos después del trim
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      return NextResponse.json(
        { 
          error: 'Campos vacíos no permitidos',
          details: [{ message: 'Todos los campos son obligatorios y no pueden estar vacíos' }]
        },
        { status: 400 }
      )
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Novaxis <onboarding@resend.dev>',
      to: process.env.EMAIL_RECIPIENT || 'hola@novaxis.com',
      reply_to: email, // El email del usuario para que puedas responder directamente
      subject: `Contacto Novaxis: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
          <div style="background: linear-gradient(135deg, #4A90E2, #6BB6FF); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Nuevo Mensaje de Contacto</h1>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="margin-bottom: 20px; padding: 15px; background-color: #E6F3FF; border-left: 4px solid #4A90E2; border-radius: 4px;">
              <p style="margin: 0; color: #333;"><strong>De:</strong> ${name}</p>
              <p style="margin: 5px 0 0 0; color: #666;">${email}</p>
            </div>
            
            <div style="margin-bottom: 20px;">
              <h3 style="color: #4A90E2; margin: 0 0 10px 0; font-size: 18px;">Asunto:</h3>
              <p style="margin: 0; color: #333; font-size: 16px; font-weight: 500;">${subject}</p>
            </div>
            
            <div style="margin-bottom: 20px;">
              <h3 style="color: #4A90E2; margin: 0 0 10px 0; font-size: 18px;">Mensaje:</h3>
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border: 1px solid #e9ecef;">
                <p style="margin: 0; color: #333; line-height: 1.6; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef; text-align: center;">
              <p style="margin: 0; color: #666; font-size: 14px;">
                Enviado desde el formulario de contacto de 
                <a href="https://novaxis-pa.vercel.app/" style="color: #4A90E2; text-decoration: none; font-weight: 500;">Novaxis</a>
              </p>
              <p style="margin: 10px 0 0 0; color: #999; font-size: 12px;">
                Fecha: ${new Date().toLocaleDateString('es-ES', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        </div>
      `,
      // Also send a plain text version
      text: `
        Nuevo mensaje de contacto desde Novaxis.com
        
        De: ${name} (${email})
        Asunto: ${subject}
        
        Mensaje:
        ${message}
        
        Enviado el: ${new Date().toLocaleString('es-ES')}
      `,
    })

    if (error) {
      console.error('Error sending email:', error)
      return NextResponse.json(
        { error: 'Error al enviar el email', details: error },
        { status: 500 }
      )
    }

    // Send confirmation email to the user (don't block if this fails)
    try {
      await resend.emails.send({
        from: 'Novaxis <onboarding@resend.dev>',
        to: email,
        subject: 'Confirmación: Hemos recibido tu mensaje - Novaxis',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
          <div style="background: linear-gradient(135deg, #4A90E2, #6BB6FF); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">¡Gracias por contactarnos!</h1>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <p style="margin: 0 0 20px 0; color: #333; font-size: 16px;">Hola <strong>${name}</strong>,</p>
            
            <p style="margin: 0 0 20px 0; color: #333; line-height: 1.6;">
              Hemos recibido tu mensaje y queremos agradecerte por contactar con Novaxis. 
              Nuestro equipo revisará tu consulta y te responderemos en un plazo máximo de 24 horas.
            </p>
            
            <div style="background-color: #E6F3FF; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4A90E2;">
              <p style="margin: 0 0 10px 0; color: #333; font-weight: 500;">Resumen de tu mensaje:</p>
              <p style="margin: 0 0 5px 0; color: #666;"><strong>Asunto:</strong> ${subject}</p>
              <p style="margin: 0; color: #666;"><strong>Mensaje:</strong> ${message.substring(0, 100)}${message.length > 100 ? '...' : ''}</p>
            </div>
            
            <p style="margin: 20px 0; color: #333; line-height: 1.6;">
              Mientras tanto, te invitamos a explorar nuestros servicios y proyectos en nuestro 
              <a href="https://novaxis-pa.vercel.app/" style="color: #4A90E2; text-decoration: none;">sitio web</a>.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://novaxis-pa.vercel.app/" style="display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #4A90E2, #6BB6FF); color: white; text-decoration: none; border-radius: 25px; font-weight: 500;">
                Visitar nuestro sitio web
              </a>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef;">
              <p style="margin: 0 0 10px 0; color: #333; font-weight: 500;">Información de contacto:</p>
              <p style="margin: 0 0 5px 0; color: #666;">📧 meisy.rangel@utp.ac.pa</p>
              <p style="margin: 0 0 5px 0; color: #666;">📞 +507 6960-4824</p>
              <p style="margin: 0; color: #666;">📍 La Chorrera, Panamá</p>
            </div>
            
            <div style="margin-top: 30px; text-align: center;">
              <p style="margin: 0; color: #999; font-size: 14px;">
                Este es un email automático, por favor no respondas a este mensaje.
              </p>
              <p style="margin: 10px 0 0 0; color: #4A90E2; font-size: 14px; font-weight: 500;">
                Equipo Novaxis
              </p>
            </div>
          </div>
        </div>
      `,
      text: `
        ¡Gracias por contactarnos!
        
        Hola ${name},
        
        Hemos recibido tu mensaje y te responderemos en un plazo máximo de 24 horas.
        
        Resumen de tu mensaje:
        Asunto: ${subject}
        Mensaje: ${message}
        
        Información de contacto:
        Email: meisy.rangel@utp.ac.pa
        Teléfono: +507 6960-4824
        Ubicación: La Chorrera, Panamá
        
        Equipo Novaxis
      `,
    })
    } catch (confirmationError) {
      console.warn('Failed to send confirmation email:', confirmationError)
      // Continue anyway - the main email was sent successfully
    }

    return NextResponse.json(
      { message: 'Email enviado exitosamente', data },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error in contact API:', error)
    
    if (error instanceof z.ZodError) {
      // Formatear errores de Zod para ser más descriptivos
      const formattedErrors = error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }))
      
      return NextResponse.json(
        { 
          error: 'Datos inválidos', 
          details: formattedErrors,
          message: formattedErrors[0]?.message || 'Los datos enviados no son válidos'
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
