import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"
import "./globals.css"
import ThemeProvider from "@/components/theme-provider"

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Portfolio | Software Engineer",
  description: "Futuristic portfolio showcasing projects, skills, and experience",
  openGraph: {
    title: "Portfolio | Software Engineer",
    description: "Futuristic portfolio showcasing projects, skills, and experience",
    type: "website",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.className} bg-slate-950 text-slate-100 dark:bg-slate-950 light:bg-white light:text-slate-900`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
