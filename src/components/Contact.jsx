import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaLinkedin, FaGithub } from 'react-icons/fa'
import portfolio from '../data/portfolio.json'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState(null)

  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/myzbdono'

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (submitting) return
    setStatus(null)
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ ok: false, msg: 'Please fill in your name, email, and message.' })
      return
    }
    try {
      setSubmitting(true)
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed to send message')
      setStatus({ ok: true, msg: 'Thanks! Your message has been sent.' })
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      setStatus({ ok: false, msg: err.message || 'Failed to send your message.' })
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <motion.section 
      id="contact" 
      className="contact container"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <h2>Contact</h2>
      <p className="muted">I'm available for freelance and full-time opportunities. Drop a message below.</p>

      <div style={{ marginTop: '1rem', marginBottom: '1.5rem', display: 'flex', gap: '1rem' }}>
        <a 
          href={portfolio.linkedin} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ fontSize: '1.8rem', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <FaLinkedin /> <span style={{ fontSize: '1rem' }}>LinkedIn</span>
        </a>
        <a 
          href={portfolio.github} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ fontSize: '1.8rem', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <FaGithub /> <span style={{ fontSize: '1rem' }}>GitHub</span>
        </a>
      </div>

      <form className="contact-form" onSubmit={handleSubmit} style={{marginTop:'1rem'}}>
        <label>
          Name
          <input name="name" type="text" placeholder="Your name" value={form.name} onChange={handleChange} />
        </label>
        <label>
          Email
          <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} />
        </label>
        <label>
          Message
          <textarea name="message" rows="5" placeholder="What would you like to build together?" value={form.message} onChange={handleChange}></textarea>
        </label>
        {status && (
          <div className={`muted`} style={{ color: status.ok ? 'var(--success, #22c55e)' : 'var(--danger, #ef4444)' }}>
            {status.msg}
          </div>
        )}
        <div className="form-row">
          <button className="btn primary" type="submit" disabled={submitting}>{submitting ? 'Sending...' : 'Send message'}</button>
          <a className="btn" href={`mailto:${portfolio.email}`}>Or email me</a>
        </div>
      </form>
    </motion.section>
  )
}
