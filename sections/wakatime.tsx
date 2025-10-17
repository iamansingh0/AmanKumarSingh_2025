"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface WakaTimeStats {
  data: {
    total_seconds: number
    languages: Array<{ name: string; percent: number; total_seconds: number }>
  }
}

export default function WakaTime() {
  const [stats, setStats] = useState<WakaTimeStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadWakaTimeStats = async () => {
      try {
        const response = await fetch("/api/wakatime")

        if (!response.ok) {
          const errorData = await response.json()
          console.warn("WakaTime API error:", errorData.error)
          setError(errorData.error)
          setLoading(false)
          return
        }

        const data = await response.json()
        setStats(data)
      } catch (error) {
        console.error("Error loading WakaTime stats:", error)
        setError("Failed to load WakaTime stats")
      } finally {
        setLoading(false)
      }
    }

    loadWakaTimeStats()
  }, [])

  if (loading) {
    return (
      <section id="wakatime" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass rounded-lg p-8"
          >
            <h3 className="text-2xl font-bold text-cyan-400 mb-6">Weekly Coding Activity</h3>
            <p className="text-slate-400">Loading WakaTime stats...</p>
          </motion.div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="wakatime" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass rounded-lg p-8"
          >
            <h3 className="text-2xl font-bold text-cyan-400 mb-6">Weekly Coding Activity</h3>
            <p className="text-slate-400">Unable to load WakaTime stats. Please check your API key.</p>
          </motion.div>
        </div>
      </section>
    )
  }

  if (!stats) return null

  const totalHours = Math.round(stats.data.total_seconds / 3600)
  const topLanguages = stats.data.languages.slice(0, 5)

  return (
    <section id="wakatime" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass rounded-lg p-8"
        >
          <h3 className="text-2xl font-bold text-cyan-400 mb-6">Weekly Coding Activity</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl font-bold gradient-text mb-2">{totalHours}</div>
                <p className="text-slate-400">Hours Coded This Week</p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-purple-400 mb-4">Top Languages</h4>
              <div className="space-y-3">
                {topLanguages.map((lang) => (
                  <div key={lang.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-300">{lang.name}</span>
                      <span className="text-cyan-400">{lang.percent.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-cyan-400 to-purple-600 h-2 rounded-full"
                        style={{ width: `${lang.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
