import React, { useState } from 'react'
import { motion } from 'framer-motion'
import portfolio from '../data/portfolio.json'

export default function Header() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return (
    <header className="site-header">
      <div className="container nav-row">
  <motion.div 
    className="brand brand-animated"
    initial={{ opacity: 0, y: -6 }} 
    animate={{ opacity: 1, y: 0 }} 
    transition={{ duration: 0.5 }}
  >
    {portfolio.name}
  </motion.div>
        <div className="nav-right">
          <nav className="nav">
            <a className="nav-link" href="#about">About</a>
            <a className="nav-link" href="#projects">Projects</a>
            <a className="nav-link" href="#contact">Contact</a>
            {/* anchor for the chatbot to mount beside the Contact link */}
            <div className="chat-anchor" aria-hidden="true"></div>
          </nav>
          <button
            className="nav-toggle"
            aria-label="Toggle navigation"
            onClick={() => setOpen(o => !o)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="container mobile-nav" role="dialog" aria-label="Navigation menu">
          <a href="#about" onClick={close}>About</a>
          <a href="#projects" onClick={close}>Projects</a>
          <a href="#contact" onClick={close}>Contact</a>
        </div>
      )}
    </header>
  )
}
