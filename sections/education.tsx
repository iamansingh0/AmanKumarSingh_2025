"use client"

import { motion } from "framer-motion"
import { GraduationCap, Award, BookOpen } from "lucide-react"

const education = [
  {
    institution: "Vellore Institute of Technology",
    degree: "B.Tech in Computer Science Engineering",
    year: "2024",
    cgpa: "9.06/10",
    details: "Specialized in Software Development and Web Technologies",
    icon: GraduationCap,
    color: "from-cyan-400 to-blue-400",
  },
  {
    institution: "Senior Secondary School",
    degree: "High School Diploma",
    year: "2015",
    cgpa: "95%",
    details: "Science Stream with focus on Mathematics and Physics",
    icon: BookOpen,
    color: "from-purple-400 to-pink-400",
  },
]

export default function Education() {
  return (
    <section id="education" className="min-h-screen flex items-center py-20 px-4">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Education</h2>
          <p className="text-slate-400 mb-16 text-lg">Academic background and achievements</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {education.map((edu, idx) => {
              const Icon = edu.icon
              return (
                <motion.div
                  key={edu.institution}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  {/* Gradient background effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${edu.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300 blur-xl`}
                  />

                  <motion.div
                    className="relative glass rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300"
                    whileHover={{ y: -8, scale: 1.02 }}
                  >
                    {/* Icon with gradient background */}
                    <motion.div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-br ${edu.color} p-1 mb-6`}
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="w-full h-full rounded-lg bg-slate-900 flex items-center justify-center">
                        <Icon className="text-white" size={28} />
                      </div>
                    </motion.div>

                    {/* Content */}
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                        {edu.degree}
                      </h3>
                      <p className="text-slate-400 text-lg mb-1">{edu.institution}</p>
                      <p className="text-slate-500 text-sm">{edu.details}</p>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between pt-6 border-t border-white/10">
                      <div className="flex items-center gap-2">
                        <Award size={18} className="text-cyan-400" />
                        <span className="text-cyan-400 font-bold text-lg">{edu.cgpa}</span>
                      </div>
                      <span className="text-slate-500 text-sm">{edu.year}</span>
                    </div>

                    {/* Animated accent line */}
                    <motion.div
                      className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${edu.color} rounded-full`}
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 0.8, delay: idx * 0.2 }}
                      viewport={{ once: true }}
                    />
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
