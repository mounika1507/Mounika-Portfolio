import React from 'react'

export default function ProjectCard({ project }) {
  return (
    <article className="card">
      <h3>{project.title}</h3>
      <p className="muted">{project.description}</p>
      <div className="tech">{project.tech.join(' • ')}</div>
        {/* View button removed per user request */}
    </article>
  )
}
