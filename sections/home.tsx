"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

export default function Home() {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
  }

  const openResume = () => {
    window.open("https://iamansingh0.github.io/amankumarsingh/cv.pdf", "_blank")
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 -z-10" />
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse" />
      </div>

      <motion.div
        className="relative z-10 text-center px-4 max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">Hi, I'm Aman Kumar Singh</h1>
        </motion.div>

        <motion.div variants={itemVariants}>
          <p className="text-xl md:text-2xl text-slate-300 mb-8">
            Software Developer | Full-Stack Engineer | Building scalable web applications with React, TypeScript &
            Salesforce
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={scrollToAbout}
            className="px-8 py-3 bg-cyan-500 text-slate-950 font-bold rounded-lg hover:bg-cyan-400 transition-all neon-glow hover:scale-105 transform cursor-pointer"
          >
            Explore My Work
          </button>
          <button className="px-8 py-3 border border-cyan-500 text-cyan-400 font-bold rounded-lg hover:bg-cyan-500/10 
          transition-all hover:scale-105 transform cursor-pointer"
          onClick={openResume}
          >
            Resume
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="text-cyan-400" size={32} />
        </motion.div>
      </motion.div>
    </section>
  )
}
