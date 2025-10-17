"use client"

import { motion } from "framer-motion"

export default function About() {
  return (
    <section id="about" className="min-h-screen flex items-center py-20 px-4">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-12 gradient-text">About Me</h2>

          <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
            <p>
              Software Developer with 1+ years of experience building scalable web applications and enterprise
              platforms. Proficient in full-stack development (React.js, Redux) and Salesforce (LWC, Apex), with a track
              record of improving performance, enhancing security, and delivering end-to-end solutions.
            </p>

            <p>
              I'm skilled at designing robust, user-friendly systems and collaborating with cross-functional teams to
              drive feature delivery and operational efficiency. Currently based in Lucknow, India, I'm passionate about
              creating elegant solutions that solve real-world problems.
            </p>

            <p>
              When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or
              sharing knowledge through technical writing. I'm always eager to learn and collaborate with talented teams
              to build the next generation of web applications.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
