import React from 'react'
import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard'
import portfolio from '../data/portfolio.json'

export default function Projects() {
  return (
    <motion.section 
      id="projects" 
      className="projects container"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <h2>Selected projects</h2>
      <div className="projects-grid">
        {portfolio.projects.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <ProjectCard project={p} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
