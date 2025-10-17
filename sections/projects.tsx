"use client"

import { motion } from "framer-motion"
import { Github, ExternalLink, Star, Code2 } from "lucide-react"
import { useEffect, useState } from "react"

interface GitHubRepo {
  name: string
  description: string
  html_url: string
  homepage: string
  stargazers_count: number
  language: string
  topics: string[]
}

export default function Projects() {
  const [projects, setProjects] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const username = "iamansingh0"
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=6&type=owner`)

        if (!response.ok) throw new Error("Failed to fetch repos")
        const repoData = await response.json()
        setProjects(repoData)
      } catch (error) {
        console.error("Error loading projects:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  const fallbackProjects: GitHubRepo[] = []

  const displayProjects = projects.length > 0 ? projects : fallbackProjects

  return (
    <section id="projects" className="min-h-screen flex items-center py-20 px-4">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Featured Projects</h2>
          <p className="text-slate-400 mb-16 text-lg">Showcasing my best work and technical expertise</p>

          {loading && <p className="text-slate-400 text-center">Loading projects...</p>}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProjects.map((project, idx) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group relative h-full"
              >
                {/* Animated gradient border */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-purple-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />

                <motion.div
                  className="relative glass rounded-xl p-6 h-full border border-white/10 hover:border-cyan-400/50 transition-all duration-300 flex flex-col overflow-hidden"
                  whileHover={{ y: -8 }}
                >
                  {/* Top accent */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-400"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                  />

                  {/* Header with icon */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-cyan-400 group-hover:text-purple-400 transition-colors mb-1">
                        {project.name}
                      </h3>
                      <div className="flex items-center gap-2 text-slate-400 text-sm">
                        <Code2 size={14} />
                        {project.language}
                      </div>
                    </div>
                    <motion.div
                      className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                    >
                      <Star size={20} />
                    </motion.div>
                  </div>

                  <p className="text-slate-300 mb-6 flex-grow text-sm leading-relaxed">{project.description}</p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {(project.topics || []).slice(0, 3).map((topic, i) => (
                      <motion.span
                        key={topic}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-medium border border-purple-400/30 hover:border-purple-400/60 transition-all"
                      >
                        {topic}
                      </motion.span>
                    ))}
                  </div>

                  {/* Footer with stats and links */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                      <Star size={16} className="text-yellow-400" />
                      {project.stargazers_count}
                    </div>
                    <div className="flex gap-3">
                      <motion.a
                        href={project.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-cyan-400 transition-colors"
                        whileHover={{ scale: 1.2 }}
                      >
                        <Github size={20} />
                      </motion.a>
                      {project.homepage && (
                        <motion.a
                          href={project.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-cyan-400 transition-colors"
                          whileHover={{ scale: 1.2 }}
                        >
                          <ExternalLink size={20} />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
