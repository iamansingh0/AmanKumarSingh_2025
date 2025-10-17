import { NextResponse } from "next/server"

export async function GET() {
  try {
    const apiKey = process.env.WAKATIME_API_KEY

    if (!apiKey) {
      console.error("[v0] WakaTime API key not configured")
      return NextResponse.json({ error: "WakaTime API key not configured" }, { status: 400 })
    }

    console.log("[v0] Fetching WakaTime with key:", apiKey.substring(0, 5) + "...")

    const encodedKey = Buffer.from(`${apiKey}:`).toString("base64")

    const response = await fetch("https://wakatime.com/api/v1/users/current/stats/last_7_days", {
      headers: {
        Authorization: `Basic ${encodedKey}`,
        "Content-Type": "application/json",
      },
    })

    console.log("[v0] WakaTime response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[v0] WakaTime error:", response.status, errorText)
      throw new Error(`WakaTime API error: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Error fetching WakaTime stats:", error)
    return NextResponse.json({ error: "Failed to fetch WakaTime stats" }, { status: 500 })
  }
}
