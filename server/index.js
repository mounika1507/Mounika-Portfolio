const express = require('express')
const cors = require('cors')
const path = require('path')
const { Low, JSONFile } = require('lowdb')
const nodemailer = require('nodemailer')
const dotenv = require('dotenv')

// Load env from server/.env then fallback to project root .env
dotenv.config({ path: path.join(__dirname, '.env') })
dotenv.config({ path: path.join(__dirname, '..', '.env') })

const app = express()
app.use(cors())
app.use(express.json())

// db file in the server folder
const file = path.join(__dirname, 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)

async function initDb() {
  await db.read()
  db.data = db.data || { faqs: [] }
  await db.write()
}

initDb()

// Setup reusable transporter for emails (if env present)
function createTransporter() {
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    SMTP_SECURE,
  } = process.env
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) return null
  const secure = String(SMTP_SECURE || '').toLowerCase() === 'true' || String(SMTP_PORT) === '465'
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })
}

const transporter = createTransporter()

// GET dynamic FAQs
app.get('/faqs', async (req, res) => {
  await db.read()
  res.json(db.data.faqs || [])
})

// POST a new FAQ (simple, no auth). Body: { question, answer }
app.post('/faqs', async (req, res) => {
  const { question, answer } = req.body || {}
  if (!question || !answer) return res.status(400).json({ error: 'question and answer required' })
  await db.read()
  const entry = { id: Date.now(), question: String(question).trim(), answer: String(answer).trim() }
  db.data.faqs = db.data.faqs || []
  db.data.faqs.push(entry)
  await db.write()
  res.status(201).json(entry)
})

// Contact form endpoint: send email with the message
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message, subject } = req.body || {}
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'name, email, and message are required' })
    }

    if (!transporter) {
      return res.status(500).json({ error: 'Email service not configured on server' })
    }

    const toEmail = process.env.TO_EMAIL || process.env.SMTP_USER
    const mailOptions = {
      from: `Portfolio Contact <${process.env.SMTP_USER}>`,
      to: toEmail,
      replyTo: email,
      subject: subject || `New portfolio message from ${name}`,
      text: `You received a new message from your portfolio contact form.\n\n` +
            `Name: ${name}\n` +
            `Email: ${email}\n` +
            `Message:\n${message}`,
    }

    await transporter.sendMail(mailOptions)
    res.json({ ok: true })
  } catch (err) {
    console.error('Contact email error:', err)
    res.status(500).json({ error: 'Failed to send message' })
  }
})

const port = process.env.PORT || 7777
app.listen(port, () => console.log(`Server listening on port ${port}`))
