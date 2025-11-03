import React from 'react'
import { motion } from 'framer-motion'
import portfolio from '../data/portfolio.json'

export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Hi, I'm {portfolio.name}
        </motion.h1>
        <motion.p 
          className="lead"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {portfolio.summary}
        </motion.p>

        <motion.div 
          className="cta-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a className="btn primary" href="#projects">See my work</a>
          <a className="btn" href="#contact">Get in touch</a>
        </motion.div>
      </div>
    </section>
  )
}
