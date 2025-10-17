"use client"

import { motion } from "framer-motion"
import { ExternalLink, Calendar, Clock, BookMarked } from "lucide-react"
import { useEffect, useState } from "react"
import Image from "next/image"
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

  return (
    <section id="blogs" className="min-h-screen flex items-center py-20 px-4">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Latest Blog Posts</h2>
          <p className="text-slate-400 mb-16 text-lg">Insights and stories from my technical journey</p>

          {loading && (
            <div className="flex justify-center">
              <div className="animate-pulse text-slate-400">Loading blog posts...</div>
            </div>
          )}

          {!loading && blogs.length === 0 && (
            <p className="text-center text-slate-400">No blog posts found.</p>
          )}

          <div className="grid grid-cols-1 gap-8">
            {blogs.map((blog, idx) => (
              <motion.a
                key={blog.id}
                href={blog.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group block relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />

                <motion.div
                  className="relative glass rounded-xl border border-white/10 hover:border-cyan-400/50 transition-all duration-300 overflow-hidden"
                  whileHover={{ y: -4 }}
                >
                  {/* Cover Image */}
                  <div className="relative h-48 w-full">
                    <Image
                      src={blog.coverImage}
                      alt={blog.title}
                      fill
                      className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                  </div>

                  <div className="p-6 md:p-8">
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

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {blog.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-cyan-500/10 text-cyan-300 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

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