import React from 'react'
import { motion } from 'framer-motion'
import portfolio from '../data/portfolio.json'

export default function About() {
  return (
    <motion.section 
      id="about" 
      className="about container"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <h2>About</h2>
      <div className="about-grid">
        <div>
          <h3 style={{marginTop:'0'}}>Professional Experience</h3>
          {portfolio.experience.map((exp, i) => (
            <div key={i}>
              <h4>{exp.company} — {exp.role}</h4>
              <p className="muted">{exp.period} • {exp.location}</p>
              <p className="muted">{exp.description}</p>
            </div>
          ))}

          <h3 style={{marginTop:'1.2rem'}}>Certifications</h3>
          <ul>
            {portfolio.certifications.map((cert, i) => (
              <li key={i}>{cert}</li>
            ))}
          </ul>
        </div>

        <aside>
          <h3>Education</h3>
          <p>Master's in Computer and Information Sciences (Missouri University of Science and Technology)</p>
          <p>Bachelor's in Information Technology (Prasad V. Potluri Siddhartha Institute of Technology)</p>

          <h3>Skills</h3>
          <p>
            Full stack web development with Java, Python, JavaScript, React, Angular, Node.js, Spring Boot, MongoDB, PostgreSQL, AWS, and DevOps tools.
          </p>
        </aside>
      </div>
    </motion.section>
  )
}
