"use client"

import { motion } from "framer-motion"

export default function Footer() {
  const sections = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ]

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <footer className="border-t border-white/10 bg-slate-950/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
        >
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold gradient-text mb-2">{"<Aman />"}</h3>
            <p className="text-slate-400">Building the future, one line of code at a time.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-cyan-400 mb-4">Quick Links</h4>
            <div className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="block text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  {section.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold text-cyan-400 mb-4">Contact</h4>
            <p className="text-slate-400 mb-2">amanks2205@email.com</p>
            <p className="text-slate-400">Lucknow, India</p>
          </div>
        </motion.div>

        <div className="border-t border-white/10 pt-8 text-center text-slate-400">
          <p>&copy; 2025 Aman. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
