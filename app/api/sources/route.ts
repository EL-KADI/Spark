import { NextResponse } from "next/server"
import { fetchSourcesServer } from "@/lib/api"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category") || ""
  const language = searchParams.get("language") || ""
  const country = searchParams.get("country") || ""

  try {
    const data = await fetchSourcesServer(category, language, country)
    return NextResponse.json(data)
  } catch (error) {
    console.error("API route error:", error)
    return NextResponse.json({ error: "Failed to fetch sources" }, { status: 500 })
  }
}
