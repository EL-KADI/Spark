import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import Image from "next/image"

export default function NewsCard({ article }) {
  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const imageUrl = article.urlToImage || "/placeholder.svg?height=200&width=400"

  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={article.title || "News image"}
          fill
          className="object-cover"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg?height=200&width=400"
          }}
        />
      </div>
      <CardHeader className="flex-grow">
        <CardTitle className="line-clamp-2 text-lg">{article.title || "No title available"}</CardTitle>
        <CardDescription className="flex items-center gap-1 text-xs">
          <Calendar className="h-3 w-3" />
          {formatDate(article.publishedAt)}
          {article.source?.name && (
            <>
              <span className="mx-1">•</span>
              {article.source.name}
            </>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm line-clamp-3">{article.description || "No description available"}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild>
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            Read Full Article
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
