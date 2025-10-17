// ...existing code...
"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue } from "framer-motion"

type Ripple = { id: number; x: number; y: number }

export default function About() {
  // mouse tracking (used for card tilt)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // keep a light re-render for smooth tilt updates
  const [, setTick] = useState(0)

  // ripples on click
  const [ripples, setRipples] = useState<Ripple[]>([])
  const rippleId = useRef(0)

  // 3D tilt card transform derived from mouse position relative to card
  const cardRef = useRef<HTMLDivElement | null>(null)
  const cardTilt = useRef({ rx: 0, ry: 0 })

  // section ref for relative coords
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    let raf = 0

    const loop = () => {
      // compute small interpolation of tilt based on current mouse values
      const mx = mouseX.get()
      const my = mouseY.get()

      const cardEl = cardRef.current
      if (cardEl) {
        const rect = cardEl.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const mouseClientX = mx + window.innerWidth / 2
        const mouseClientY = my + window.innerHeight / 2
        const rx = ((mouseClientY - cy) / rect.height) * -8
        const ry = ((mouseClientX - cx) / rect.width) * 8
        // lerp for smoothness
        cardTilt.current.rx += (rx - cardTilt.current.rx) * 0.14
        cardTilt.current.ry += (ry - cardTilt.current.ry) * 0.14
      } else {
        // gently return to zero if card not mounted
        cardTilt.current.rx += (0 - cardTilt.current.rx) * 0.14
        cardTilt.current.ry += (0 - cardTilt.current.ry) * 0.14
      }

      // light rerender to apply updated transform
      setTick((t) => t + 1)

      raf = requestAnimationFrame(loop)
    }

    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [mouseX, mouseY])

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    // center-based coordinates make motion feel more organic
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = rippleId.current++
    setRipples((r) => [...r, { id, x, y }])
    // remove after animation
    setTimeout(() => {
      setRipples((r) => r.filter((rp) => rp.id !== id))
    }, 700)
  }

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      const offsetTop = contactSection.offsetTop
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen flex items-center py-20 px-4 relative overflow-hidden select-none"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={handleClick}
    >
      {/* Removed large blobs & particle cloud (global CursorBubbles handles bubbles now) */}

      {/* content card with 3D tilt */}
      <div className="max-w-4xl mx-auto w-full z-10">
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{
            transform: `perspective(800px) rotateX(${cardTilt.current.rx}deg) rotateY(${cardTilt.current.ry}deg)`,
          }}
          className="bg-white/5 border border-white/6 rounded-2xl p-10 backdrop-blur-md shadow-lg"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">About Me</h2>

          <div className="space-y-5 text-slate-300 text-lg leading-relaxed">
            <p>
              Software Developer with 1+ years of experience building scalable web applications and enterprise platforms.
              Proficient in full-stack development (React.js, Redux) and Salesforce (LWC, Apex), with a track record of
              improving performance, enhancing security, and delivering end-to-end solutions.
            </p>

            <p>
              I design robust, user-friendly systems and collaborate with cross-functional teams to drive feature delivery
              and operational efficiency. Based in Lucknow, India — passionate about crafting elegant solutions to real
              problems.
            </p>

            <p>
              Outside of work: exploring new technologies, contributing to open source, and writing technical articles.
              I enjoy learning and building with passionate teams.
            </p>

            <div className="flex gap-3 mt-4">
              <button className="px-4 py-2 rounded-md bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 transition"
                onClick={scrollToContact}
              >
                Connect
              </button>
              <button className="px-4 py-2 rounded-md bg-white/6 text-slate-200 hover:bg-white/8 transition">Resume</button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Click ripples (kept) */}
      <div className="pointer-events-none absolute inset-0 z-20">
        {ripples.map((r) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0.45, scale: 0 }}
            animate={{ opacity: 0, scale: 3 }}
            transition={{ duration: 0.7, ease: "circOut" }}
            style={{
              position: "absolute",
              left: r.x,
              top: r.y,
              width: 24,
              height: 24,
              marginLeft: -12,
              marginTop: -12,
              borderRadius: 9999,
              background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.18), rgba(0,0,0,0))",
              mixBlendMode: "screen",
            }}
          />
        ))}
      </div>
    </section>
  )
}
// ...existing code...