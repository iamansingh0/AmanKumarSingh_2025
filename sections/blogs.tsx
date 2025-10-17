"use client"

import { motion } from "framer-motion"
import { ExternalLink, Calendar, Clock, BookMarked } from "lucide-react"
import { useEffect, useState } from "react"
import { fetchHashnodePosts } from "@/lib/api"

interface BlogPost {
  id: string
  title: string
  brief: string
  url: string
  coverImage: string
  publishedAt: string
  readTime: string
  tags: string[]
}

export default function Blogs() {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const posts = await fetchHashnodePosts("amankumar1")
        setBlogs(posts)
      } catch (error) {
        console.error("Error loading blogs:", error)
      } finally {
        setLoading(false)
      }
    }

    loadBlogs()
  }, [])

  const fallbackBlogs: BlogPost[] = [
    {
      id: "1",
      title: "Building Scalable React Applications",
      brief:
        "Learn best practices for structuring large React applications with proper state management and component architecture.",
      url: "#",
      coverImage: "/react-logo-abstract.png",
      publishedAt: "Jan 15, 2024",
      readTime: "8 min read",
      tags: ["React", "Architecture"],
    },
    {
      id: "2",
      title: "TypeScript Tips for Better Code",
      brief: "Explore advanced TypeScript features that can help you write more maintainable and type-safe code.",
      url: "#",
      coverImage: "/typescript-logo.png",
      publishedAt: "Jan 10, 2024",
      readTime: "6 min read",
      tags: ["TypeScript", "Best Practices"],
    },
    {
      id: "3",
      title: "Web Performance Optimization Guide",
      brief:
        "Comprehensive guide to optimizing web application performance including code splitting, lazy loading, and caching strategies.",
      url: "#",
      coverImage: "/stage-performance.png",
      publishedAt: "Jan 5, 2024",
      readTime: "12 min read",
      tags: ["Performance", "Web"],
    },
  ]

  const displayBlogs = blogs.length > 0 ? blogs : fallbackBlogs

  return (
    <section id="blogs" className="min-h-screen flex items-center py-20 px-4">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Latest Blog Posts</h2>
          <p className="text-slate-400 mb-16 text-lg">Insights and stories from my technical journey</p>

          {loading && <p className="text-slate-400 text-center">Loading blog posts...</p>}

          <div className="space-y-6">
            {displayBlogs.map((blog, idx) => (
              <motion.a
                key={blog.id}
                href={blog.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group block relative"
              >
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />

                <motion.div
                  className="relative glass rounded-xl p-6 md:p-8 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 flex flex-col md:flex-row gap-6"
                  whileHover={{ y: -4 }}
                >
                  {/* Left accent bar */}
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-purple-400 rounded-l-xl"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                  />

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="text-xl md:text-2xl font-bold text-cyan-400 group-hover:text-purple-400 transition-colors leading-tight">
                        {blog.title}
                      </h3>
                      <motion.div
                        className="text-slate-400 group-hover:text-cyan-400 transition-colors flex-shrink-0"
                        whileHover={{ scale: 1.2, rotate: 10 }}
                      >
                        <ExternalLink size={20} />
                      </motion.div>
                    </div>

                    <p className="text-slate-300 mb-6 leading-relaxed">{blog.brief}</p>

                    {/* Meta information */}
                    <div className="flex flex-wrap items-center gap-4 text-slate-400 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-cyan-400" />
                        {blog.publishedAt}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-purple-400" />
                        {blog.readTime}
                      </div>
                      <motion.div
                        className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        initial={{ x: -10 }}
                        whileHover={{ x: 5 }}
                      >
                        <BookMarked size={16} className="text-cyan-400" />
                        <span>Read article</span>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
