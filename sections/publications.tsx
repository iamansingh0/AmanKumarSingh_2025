"use client"

import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"

const publications = [
  {
    title: "U-Net Inspired Deep Neural Network-Based Smoke Plume Detection in Satellite Images",
    abstract:
      "A comprehensive study on implementing deep learning models for smoke detection in satellite imagery, achieving 92% accuracy. The research includes distributed computing pipeline for processing high-resolution satellite images and novel approaches to environmental monitoring.",
    venue: "Computers, Materials and Continua (CMC) - SCIE, Impact Factor 3.1",
    year: 2024,
    link: "https://www.techscience.com/cmc/v79n1/56308",
  },
]

export default function Publications() {
  return (
    <section id="publications" className="min-h-screen flex items-center py-20 px-4">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-16 gradient-text">Publications & Research</h2>

          <div className="space-y-6">
            {publications.map((pub, idx) => (
              <motion.div
                key={pub.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="glass rounded-lg p-6 hover:neon-glow-purple transition-all duration-300 group"
              >
                <div className="flex justify-between items-start gap-4 mb-3">
                  <h3 className="text-xl font-bold text-purple-400 group-hover:text-cyan-400 transition-colors flex-grow">
                    {pub.title}
                  </h3>
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-cyan-400 transition-colors flex-shrink-0"
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>

                <p className="text-slate-300 mb-4">{pub.abstract}</p>

                <div className="flex justify-between items-center text-slate-400 text-sm">
                  <span>{pub.venue}</span>
                  <span className="font-semibold">{pub.year}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
