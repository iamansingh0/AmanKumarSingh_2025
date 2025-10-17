"use client"

import { useEffect, useState } from "react"
import Navbar from "@/components/navbar"
import ScrollProgress from "@/components/scroll-progress"
import AnimatedBackground from "@/components/animated-background"
import Home from "@/sections/home"
import About from "@/sections/about"
import Skills from "@/sections/skills"
import Experience from "@/sections/experience"
import Education from "@/sections/education"
import Projects from "@/sections/projects"
import Blogs from "@/sections/blogs"
import Publications from "@/sections/publications"
import WakaTime from "@/sections/wakatime"
import Contact from "@/sections/contact"
import Footer from "@/sections/footer"

export default function Page() {
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "skills",
        "experience",
        "education",
        "projects",
        "blogs",
        "publications",
        "contact",
      ]

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="bg-slate-950 text-slate-100 overflow-x-hidden">
      <ScrollProgress />
      <AnimatedBackground />
      <Navbar activeSection={activeSection} />
      <Home />
      <About />
      <Skills />
      <Experience />
      <Education />
      <Projects />
      <Blogs />
      <Publications />
      <WakaTime />
      <Contact />
      <Footer />
    </main>
  )
}
