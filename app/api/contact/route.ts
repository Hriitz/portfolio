import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const RECIPIENT_EMAIL = process.env.CONTACT_EMAIL || 'hritik3447@gmail.com'

// Initialize Resend lazily only when API key is available
const getResend = () => {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return null
  }
  return new Resend(apiKey)
}

export async function POST(request: NextRequest) {
  try {
    // Debug: Check environment variables
    const apiKeyCheck = process.env.RESEND_API_KEY
    console.log('🔍 Environment check:')
    console.log('   RESEND_API_KEY exists:', !!apiKeyCheck)
    console.log('   RESEND_API_KEY value:', apiKeyCheck ? `${apiKeyCheck.substring(0, 10)}...` : 'undefined')
    console.log('   All env vars:', Object.keys(process.env).filter(k => k.includes('RESEND')).join(', ') || 'none')
    
    const { name, email, message } = await request.json()

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Sanitize input to prevent XSS
    const sanitize = (text: string) => {
      return text
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
    }

    // Check if Resend is configured
    const apiKey = process.env.RESEND_API_KEY
    console.log('🔑 API Key check:', apiKey ? `Found (${apiKey.substring(0, 10)}...)` : 'Not found')
    
    const resend = getResend()
    if (!resend) {
      // Development mode: log to console
      console.log('📧 Contact form submission (Resend not configured):', {
        name,
        email,
        message,
      })
      console.log('⚠️  Please check:')
      console.log('   1. .env.local file exists in project root')
      console.log('   2. RESEND_API_KEY is set in .env.local')
      console.log('   3. Development server has been restarted after adding the key')
      
      return NextResponse.json(
        { error: 'Email service not configured. Please check server logs.' },
        { status: 500 }
      )
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Update this with your verified domain
      to: [RECIPIENT_EMAIL],
      replyTo: email,
      subject: `Portfolio Contact: ${sanitize(name)}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 30px;
                border-radius: 8px 8px 0 0;
                text-align: center;
              }
              .content {
                background: #f9f9f9;
                padding: 30px;
                border-radius: 0 0 8px 8px;
              }
              .field {
                margin-bottom: 20px;
              }
              .field-label {
                font-weight: 600;
                color: #667eea;
                margin-bottom: 5px;
                display: block;
              }
              .field-value {
                color: #555;
                padding: 10px;
                background: white;
                border-radius: 4px;
                border-left: 3px solid #667eea;
              }
              .message-box {
                white-space: pre-wrap;
                word-wrap: break-word;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>📧 New Portfolio Contact</h1>
            </div>
            <div class="content">
              <div class="field">
                <span class="field-label">Name:</span>
                <div class="field-value">${sanitize(name)}</div>
              </div>
              <div class="field">
                <span class="field-label">Email:</span>
                <div class="field-value">
                  <a href="mailto:${email}">${sanitize(email)}</a>
                </div>
              </div>
              <div class="field">
                <span class="field-label">Message:</span>
                <div class="field-value message-box">${sanitize(message).replace(/\n/g, '<br>')}</div>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
New Portfolio Contact Form Submission

Name: ${name}
Email: ${email}

Message:
${message}
      `.trim(),
    })

    if (error) {
      console.error('Resend API error:', error)
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      )
    }

    console.log('✅ Email sent successfully:', data?.id)

    return NextResponse.json(
      { message: 'Message sent successfully!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    )
  }
}

