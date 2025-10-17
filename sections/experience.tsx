"use client"

import { motion } from "framer-motion"
import { Briefcase, Calendar, ArrowRight } from "lucide-react"

const experiences = [
  {
    company: "TVS Credit Services",
    role: "Software Developer",
    duration: "July 2024 - Present",
    description:
      "Led development of responsive and reusable UI components using React.js and Salesforce LWC, improving frontend development efficiency by 20% and reducing redundant code. Developed a knowledge base for call center executives, cutting average query handling time from 10 minutes to 1 minute and reducing TAT by 35%, while lowering call drop rates by 25%.",
    tech: ["React.js", "Salesforce LWC", "Apex", "JavaScript", "GitLab"],
    icon: Briefcase,
  },
  {
    company: "TVS Credit Services",
    role: "Graduate Engineer Trainee",
    duration: "Feb 2024 - May 2024",
    description:
      "Automated business processes using Apex, reducing manual effort by 40%. Integrated third-party applications using REST APIs, streamlining workflows and reducing data entry errors by 25%. Configured Salesforce flows, approval processes, and validation rules as an admin.",
    tech: ["Salesforce", "Apex", "REST APIs", "SOQL", "SOSL"],
    icon: Briefcase,
  },
  {
    company: "Codemate.AI",
    role: "Founding Engineer Intern",
    duration: "Aug 2023 - Sep 2023",
    description:
      "Coordinated end-user development using TypeScript, VS Code extensions, and vector-embedded databases with Firebase. Expanded a codebase and chat history integrated with AI, improving developer productivity by 40%. Implemented website authentication and user management using Firebase.",
    tech: ["TypeScript", "Firebase", "VS Code Extensions", "Vector DB", "AI Integration"],
    icon: Briefcase,
  },
  {
    company: "CPS VIT Chennai",
    role: "Research Intern",
    duration: "May 2023 - July 2023",
    description:
      "Developed deep learning model achieving 92% accuracy in smoke classification using satellite imagery. Built distributed computing pipeline to efficiently process 500+ high-resolution images. Published research paper in Computers, Materials & Continua (CMC) journal.",
    tech: ["Deep Learning", "Python", "Satellite Imagery", "Distributed Computing", "Research"],
    icon: Briefcase,
  }
]

export default function Experience() {
  return (
    <section id="experience" className="min-h-screen flex items-center py-20 px-4">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Work Experience</h2>
          <p className="text-slate-400 mb-16 text-lg">My professional journey and key achievements</p>

          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 via-purple-400 to-cyan-400 hidden md:block" />

            <div className="space-y-12">
              {experiences.map((exp, idx) => (
                <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  viewport={{ once: true }}
                  className="relative md:pl-32"
                >
                  {/* Timeline dot */}
                  <motion.div
                    className="absolute left-0 md:left-0 top-2 w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-cyan-400 to-purple-400 p-1 hidden md:flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                      <Briefcase className="text-cyan-400" size={24} />
                    </div>
                  </motion.div>

                  {/* Card */}
                  <motion.div
                    className="glass rounded-xl p-6 md:p-8 border border-cyan-400/20 hover:border-cyan-400/50 transition-all duration-300 group"
                    whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(34, 211, 238, 0.1)" }}
                  >
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-cyan-400 group-hover:text-purple-400 transition-colors mb-1">
                          {exp.role}
                        </h3>
                        <p className="text-slate-400 text-lg">{exp.company}</p>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400 text-sm md:text-base whitespace-nowrap">
                        <Calendar size={16} />
                        {exp.duration}
                      </div>
                    </div>

                    <p className="text-slate-300 mb-6 leading-relaxed">{exp.description}</p>

                    {/* Tech stack with animated badges */}
                    <div className="flex flex-wrap gap-3">
                      {exp.tech.map((t, i) => (
                        <motion.span
                          key={t}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05 }}
                          className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 rounded-full text-sm font-medium border border-cyan-400/30 hover:border-cyan-400/60 transition-all hover:scale-105"
                        >
                          {t}
                        </motion.span>
                      ))}
                    </div>

                    {/* Hover indicator */}
                    <motion.div
                      className="mt-4 flex items-center gap-2 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ x: -10 }}
                      whileHover={{ x: 5 }}
                    >
                      {/* <span className="text-sm">View details</span> */}
                      {/* <ArrowRight size={16} /> */}
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
