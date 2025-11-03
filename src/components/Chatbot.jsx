import React, { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import portfolio from '../data/portfolio.json'
import faqs from '../data/faqs'

// Simple keyword-based responses as fallback
const getLocalResponse = (message) => {
  const msg = message.toLowerCase()
  
  // Greetings
  if (msg.match(/\b(hi|hello|hey|greetings)\b/)) {
    return `Hi! I'm Mounika's assistant. I can tell you about her experience, skills, projects, or education. What would you like to know?`
  }
  
  // Experience
  if (msg.match(/\b(experience|work|job|career|worked)\b/)) {
    return `Mounika has 2+ years of experience as a Full Stack Developer. Currently at Sradha Technologies (March 2025-Present) and previously at Globestar Software Limited (Aug 2021-Dec 2022). She builds scalable web applications using Java, Python, React, and AWS.`
  }
  
  // Skills
  if (msg.match(/\b(skill|technology|tech|stack|know|programming)\b/)) {
    return `Mounika's skills include: Java, Python, JavaScript, TypeScript, React.js, Angular, Node.js, Spring Boot, MongoDB, PostgreSQL, and AWS. She's experienced in full-stack development with modern web technologies.`
  }
  
  // Projects
  if (msg.match(/\b(project|built|created|developed)\b/)) {
    return `Mounika has worked on several projects including: Self-Supervised Classification Network (PyTorch, CUDA), Driver Drowsiness Detection (OpenCV, TensorFlow), Forest Fire Prediction (ML, Python), and Green Basket E-Commerce Website (React, TypeScript).`
  }
  
  // Education
  if (msg.match(/\b(education|degree|university|studied|study)\b/)) {
    return `Mounika holds a Master of Science in Computer and Information Sciences from Missouri University of Science and Technology, and a Bachelor's Degree in Information Technology from Prasad V. Potluri Siddhartha Institute of Technology.`
  }
  
  // Certifications
  if (msg.match(/\b(certifi|certificate|certified)\b/)) {
    return `Mounika is certified in: Oracle Cloud Infrastructure 2025 AI Foundations Associate and AWS Certified Solutions Architect.`
  }
  
  // Contact
  if (msg.match(/\b(contact|email|reach|hire|available)\b/)) {
    return `You can reach Mounika at ${portfolio.email}. Check out her LinkedIn at ${portfolio.linkedin} or GitHub at ${portfolio.github}. She's available for freelance and full-time opportunities!`
  }
  
  // Default
  return `I can help you learn about Mounika's experience, skills, projects, education, or certifications. What would you like to know?`
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState(() => {
    try { return JSON.parse(localStorage.getItem('chat-history') || '[]') } catch { return [] }
  })
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [anchored, setAnchored] = useState(false)
  // A few quick suggestion options users can click to ask common questions
  const suggestions = [
    'Tell me about your experience',
    'What skills do you know?',
    'Show your projects',
    'Do you have certifications?',
    'Where did you study?',
    'How can I contact you?',
  ]
  const listRef = useRef(null)
  const containerRef = useRef(typeof document !== 'undefined' ? document.createElement('div') : null)

  useEffect(() => {
    localStorage.setItem('chat-history', JSON.stringify(messages))
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  async function sendMessage(text) {
    if (!text.trim()) return
    const userMsg = { id: Date.now(), who: 'user', text }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    // Simple best-match against FAQs first, then fallback
    setTimeout(() => {
      const botText = findBestAnswer(text) || getLocalResponse(text)
      const botMsg = { id: Date.now() + 1, who: 'bot', text: botText }
      setMessages(prev => [...prev, botMsg])
      setLoading(false)
    }, 400)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!loading) sendMessage(input)
  }

  function askSuggestion(q) {
    if (loading) return
    // Send the suggested question directly
    sendMessage(q)
  }

  function clearHistory() {
    setMessages([])
    localStorage.removeItem('chat-history')
  }

  useEffect(() => {
    // On mount, attach the chat container to the chat-anchor if present
    const container = containerRef.current
    if (!container) return
    
    const anchor = document.querySelector('.chat-anchor')
    const header = document.querySelector('.site-header')
    const hero = document.querySelector('.hero')
    
    if (anchor) {
      if (getComputedStyle(anchor).position === 'static') anchor.style.position = 'relative'
      anchor.appendChild(container)
      setAnchored(true)
    } else if (header) {
      if (getComputedStyle(header).position === 'static') header.style.position = 'relative'
      header.appendChild(container)
      setAnchored(true)
    } else if (hero) {
      if (getComputedStyle(hero).position === 'static') hero.style.position = 'relative'
      hero.appendChild(container)
      setAnchored(true)
    } else {
      document.body.appendChild(container)
    }

    return () => {
      if (container.parentNode) container.parentNode.removeChild(container)
    }
  }, [])

  const chatUI = (
    <div className={`chatbot ${open ? 'open' : ''} ${anchored ? 'anchored' : ''}`}>
      <div className="chat-toggle" data-tooltip="Ask me" onClick={() => setOpen(o => !o)} aria-label="Open chat" title="Open chat">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
      </div>

      <div className="chat-panel" role="dialog" aria-label="Chatbot">
        <div className="chat-header">
          <strong>Assistant</strong>
          <div className="chat-actions">
            <button className="btn small" onClick={clearHistory} title="Clear chat">Clear</button>
            <button className="btn small" onClick={() => setOpen(false)} title="Close">Close</button>
          </div>
        </div>

        <div className="chat-list" ref={listRef}>
          {messages.length === 0 && (
            <>
              <div className="chat-empty muted">Hi! Ask me about {portfolio.name}'s experience, skills, or projects.</div>
              <div className="chat-suggestions" aria-label="Quick questions">
                {suggestions.map((q) => (
                  <button
                    key={q}
                    type="button"
                    className="btn small"
                    onClick={() => askSuggestion(q)}
                    title={q}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </>
          )}

          {messages.map(m => (
            <div key={m.id} className={`chat-msg ${m.who}`}>
              <div className="bubble">{m.text}</div>
            </div>
          ))}

          {loading && (
            <div className="chat-msg bot">
              <div className="bubble">Thinking...</div>
            </div>
          )}
        </div>

        <form className="chat-form" onSubmit={handleSubmit}>
          <input
            aria-label="Type a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me something..."
            disabled={loading}
          />
          <button className="btn primary" type="submit" disabled={loading}>Send</button>
        </form>
      </div>
    </div>
  )

  return containerRef.current ? createPortal(chatUI, containerRef.current) : null
}

// Best-match FAQ lookup (token overlap scoring)
function findBestAnswer(message) {
  if (!message) return null
  const text = String(message).toLowerCase()
  const tokens = text.split(/[^a-z0-9]+/).filter(Boolean)
  if (!tokens.length) return null

  let best = { score: 0, answer: null }
  for (const item of faqs) {
    const qTokens = String(item.q || item.question || '').toLowerCase().split(/[^a-z0-9]+/).filter(Boolean)
    if (!qTokens.length) continue
    // token overlap score
    let score = 0
    for (const t of tokens) {
      if (qTokens.includes(t)) score += 1
    }
    // small boost for substring includes
    if (!score && (item.q || '').toLowerCase().includes(text)) score += 0.5
    if (score > best.score) best = { score, answer: item.a || item.answer }
  }
  return best.score > 0 ? best.answer : null
}
