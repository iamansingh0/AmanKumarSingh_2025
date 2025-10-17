"use client"

import { motion } from "framer-motion"
import { Code2, Database, Wrench, Zap, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"

interface WakaTimeLanguage {
  name: string
  percent: number
  total_seconds: number
}

interface WakaTimeStats {
  data: {
    total_seconds: number
    languages: WakaTimeLanguage[]
  }
}

const skillCategories = [
  {
    title: "Frontend",
    icon: Code2,
    skills: ["React", "TypeScript", "TailwindCSS", "Next.js", "Framer Motion"],
    color: "from-cyan-400 to-blue-400",
    bgColor: "bg-cyan-500/10",
  },
  {
    title: "Backend",
    icon: Database,
    skills: ["Node.js", "Express", "MongoDB", "PostgreSQL", "Spring Boot"],
    color: "from-purple-400 to-pink-400",
    bgColor: "bg-purple-500/10",
  },
  {
    title: "Tools & DevOps",
    icon: Wrench,
    skills: ["Git", "Docker", "Vercel", "AWS", "CI/CD"],
    color: "from-orange-400 to-red-400",
    bgColor: "bg-orange-500/10",
  },
  {
    title: "Other",
    icon: Zap,
    skills: ["REST APIs", "GraphQL", "Testing", "UI/UX Design", "Agile"],
    color: "from-green-400 to-emerald-400",
    bgColor: "bg-green-500/10",
  },
]

export default function Skills() {
  const [wakaTimeStats, setWakaTimeStats] = useState<WakaTimeStats | null>(null)
  const [wakaTimeLoading, setWakaTimeLoading] = useState(true)

  useEffect(() => {
    const loadWakaTimeStats = async () => {
      try {
        const response = await fetch("/api/wakatime")
        if (response.ok) {
          const data = await response.json()
          setWakaTimeStats(data)
        }
      } catch (error) {
        console.error("Error loading WakaTime stats:", error)
      } finally {
        setWakaTimeLoading(false)
      }
    }

    loadWakaTimeStats()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  }

  const topLanguages = wakaTimeStats?.data?.languages?.slice(0, 5) || []

  return (
    <section id="skills" className="min-h-screen flex items-center py-20 px-4">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Skills & Tech Stack</h2>
          <p className="text-slate-400 mb-16 text-lg">Technologies and tools I work with</p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {skillCategories.map((category) => {
              const Icon = category.icon
              return (
                <motion.div key={category.title} variants={itemVariants} className="group relative">
                  {/* Gradient background effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300 blur-xl`}
                  />

                  <motion.div
                    className={`relative glass rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 h-full flex flex-col`}
                    whileHover={{ y: -8, scale: 1.02 }}
                  >
                    {/* Top accent line */}
                    <motion.div
                      className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${category.color} rounded-t-xl`}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 0.8 }}
                      viewport={{ once: true }}
                    />

                    {/* Icon with animated background */}
                    <motion.div
                      className={`w-14 h-14 rounded-lg ${category.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                      whileHover={{ rotate: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Icon className="text-white" size={28} />
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-6 group-hover:text-cyan-400 transition-colors">
                      {category.title}
                    </h3>

                    {/* Skills list with animated badges */}
                    <motion.div
                      className="space-y-3 flex-1"
                      variants={containerVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      {category.skills.map((skill, idx) => (
                        <motion.div
                          key={skill}
                          variants={skillVariants}
                          className="flex items-center gap-3 group/skill cursor-pointer"
                        >
                          <motion.div
                            className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color}`}
                            whileHover={{ scale: 1.5 }}
                          />
                          <span className="text-slate-300 group-hover/skill:text-white transition-colors text-sm">
                            {skill}
                          </span>
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* Hover indicator */}
                    <motion.div
                      className="mt-6 pt-4 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ y: 10 }}
                      whileHover={{ y: 0 }}
                    >
                      <p className="text-xs text-slate-400">Proficient in all areas</p>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )
            })}

            {!wakaTimeLoading && topLanguages.length > 0 && (
              <motion.div variants={itemVariants} className="group relative">
                {/* Gradient background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300 blur-xl" />

                <motion.div
                  className="relative glass rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 h-full flex flex-col"
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  {/* Top accent line */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-t-xl"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                  />

                  {/* Icon with animated background */}
                  <motion.div
                    className="w-14 h-14 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                    whileHover={{ rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <TrendingUp className="text-white" size={28} />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-6 group-hover:text-emerald-400 transition-colors">
                    Languages
                  </h3>

                  {/* Languages list from WakaTime */}
                  <motion.div
                    className="space-y-3 flex-1"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {topLanguages.map((lang) => (
                      <motion.div
                        key={lang.name}
                        variants={skillVariants}
                        className="flex items-center gap-3 group/skill cursor-pointer"
                      >
                        <motion.div
                          className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400"
                          whileHover={{ scale: 1.5 }}
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-slate-300 group-hover/skill:text-white transition-colors text-sm">
                              {lang.name}
                            </span>
                            <span className="text-emerald-400 text-xs">{lang.percent.toFixed(1)}%</span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-1.5">
                            <motion.div
                              className="bg-gradient-to-r from-emerald-400 to-teal-400 h-1.5 rounded-full"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${lang.percent}%` }}
                              transition={{ duration: 0.8, delay: 0.2 }}
                              viewport={{ once: true }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Hover indicator */}
                  <motion.div
                    className="mt-6 pt-4 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ y: 10 }}
                    whileHover={{ y: 0 }}
                  >
                    <p className="text-xs text-slate-400">Real-time data</p>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
