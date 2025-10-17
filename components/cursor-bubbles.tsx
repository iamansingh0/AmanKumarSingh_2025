"use client"
// ...existing code...
import React, { useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export default function CursorBubbles() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springCfg = { stiffness: 140, damping: 24 }
  const sx = useSpring(mouseX, springCfg)
  const sy = useSpring(mouseY, springCfg)

  // simple particle set
  const particlesRef = useRef(
    Array.from({ length: 20 }).map(() => ({
      x: (Math.random() - 0.5) * 120,
      y: (Math.random() - 0.5) * 80,
      vx: 0,
      vy: 0,
      size: 2 + Math.floor(Math.random() * 4),
      alpha: 0.06 + Math.random() * 0.14,
    }))
  )

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      // center relative coordinates (feel more organic)
      mouseX.set(e.clientX - window.innerWidth / 2)
      mouseY.set(e.clientY - window.innerHeight / 2)
    }
    const handleLeave = () => {
      mouseX.set(0)
      mouseY.set(0)
    }
    window.addEventListener("mousemove", handleMove)
    window.addEventListener("mouseleave", handleLeave)
    window.addEventListener("blur", handleLeave)
    let raf = 0
    const loop = () => {
      const mx = mouseX.get()
      const my = mouseY.get()
      for (const p of particlesRef.current) {
        // mild attraction to center + small noise + repulse from cursor
        p.vx += -p.x * 0.002 + (Math.random() - 0.5) * 0.02
        p.vy += -p.y * 0.002 + (Math.random() - 0.5) * 0.02
        const dx = p.x - mx * 0.12
        const dy = p.y - my * 0.12
        const dist2 = Math.max(16, dx * dx + dy * dy)
        const repel = 80 / dist2
        p.vx += (dx / Math.sqrt(dist2)) * repel * 0.01
        p.vy += (dy / Math.sqrt(dist2)) * repel * 0.01
        p.vx *= 0.96
        p.vy *= 0.96
        p.x += p.vx
        p.y += p.vy
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("mousemove", handleMove)
      window.removeEventListener("mouseleave", handleLeave)
      window.removeEventListener("blur", handleLeave)
    }
  }, [mouseX, mouseY])

  return (
    <>
      {/* large soft blobs */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-[55%] top-[18%] w-[40rem] h-[40rem] rounded-full bg-cyan-400/18 blur-3xl mix-blend-screen -translate-x-1/2 -translate-y-1/2"
        style={{ x: sx, y: sy }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-[78%] top-[68%] w-[22rem] h-[22rem] rounded-full bg-purple-400/14 blur-2xl mix-blend-screen -translate-x-1/2 -translate-y-1/2"
        style={{ x: sx, y: sy }}
      />

      {/* particle cloud */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {particlesRef.current.map((p, i) => {
          const left = 50 + p.x * 0.44
          const top = 50 + p.y * 0.44
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${left}%`,
                top: `${top}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                marginLeft: `${-p.size / 2}px`,
                marginTop: `${-p.size / 2}px`,
                borderRadius: "50%",
                background: `rgba(140,220,255,${p.alpha})`,
                filter: "blur(6px)",
                transform: "translate3d(0,0,0)",
              }}
            />
          )
        })}
      </div>
    </>
  )
}
// ...existing code...