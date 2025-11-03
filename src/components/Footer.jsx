import React from 'react'
import portfolio from '../data/portfolio.json'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
  <small>© {new Date().getFullYear()} {portfolio.name} • Built with React</small>
        {/* Removed GitHub and LinkedIn links as requested */}
      </div>
    </footer>
  )
}
