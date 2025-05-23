import { NextResponse } from "next/server"
import { fetchNewsServer } from "@/lib/api"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")
  const language = searchParams.get("language") || "en"
  const sortBy = searchParams.get("sortBy") || "publishedAt"

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
  }

  try {
    const data = await fetchNewsServer(query, language, sortBy)
    return NextResponse.json(data)
  } catch (error) {
    console.error("API route error:", error)
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 })
  }
}
