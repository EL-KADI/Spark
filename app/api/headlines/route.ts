import { NextResponse } from "next/server"
import { fetchTopHeadlinesServer } from "@/lib/api"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const country = searchParams.get("country") || "us"
  const category = searchParams.get("category") || "general"

  try {
    const data = await fetchTopHeadlinesServer(country, category)
    return NextResponse.json(data)
  } catch (error) {
    console.error("API route error:", error)
    return NextResponse.json({ error: "Failed to fetch headlines" }, { status: 500 })
  }
}
