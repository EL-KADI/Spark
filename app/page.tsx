"use client"

import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Globe, Newspaper } from "lucide-react"
import NewsCard from "@/components/news-card"
import LanguageSelector from "@/components/language-selector"
import { fetchNews, fetchTopHeadlines, fetchSources } from "@/lib/api"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Newspaper className="h-8 w-8 text-rose-500" />
            <h1 className="text-3xl font-bold tracking-tight">Spark News</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay informed with the latest news from diverse sources using NewsAPI
          </p>
        </header>

        <Tabs defaultValue="headlines" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="headlines">Top Headlines</TabsTrigger>
            <TabsTrigger value="everything">Search News</TabsTrigger>
            <TabsTrigger value="sources">News Sources</TabsTrigger>
          </TabsList>

          <TabsContent value="headlines">
            <TopHeadlinesTab />
          </TabsContent>

          <TabsContent value="everything">
            <SearchNewsTab />
          </TabsContent>

          <TabsContent value="sources">
            <SourcesTab />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

function TopHeadlinesTab() {
  const [country, setCountry] = useState("us")
  const [category, setCategory] = useState("general")
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchHeadlines()
  }, [])

  const fetchHeadlines = async () => {
    setLoading(true)
    setError("")
    try {
      const data = await fetchTopHeadlines(country, category)
      if (data.error) {
        throw new Error(data.error)
      }
      setArticles(data.articles || [])
    } catch (err) {
      console.error("Error fetching headlines:", err)
      setError("Failed to fetch headlines. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
       

        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">Category</label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="entertainment">Entertainment</SelectItem>
              <SelectItem value="health">Health</SelectItem>
              <SelectItem value="science">Science</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end">
          <Button onClick={fetchHeadlines} disabled={loading} className="w-full md:w-auto">
            {loading ? "Loading..." : "Refresh News"}
          </Button>
        </div>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading news...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.length > 0 ? (
            articles.map((article, index) => <NewsCard key={index} article={article} />)
          ) : (
            <div className="col-span-full text-center py-12">
              <Globe className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No news available. Please update the criteria and try again.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function SearchNewsTab() {
  const [query, setQuery] = useState("")
  const [language, setLanguage] = useState("en")
  const [sortBy, setSortBy] = useState("publishedAt")
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Please enter a search term")
      return
    }

    setLoading(true)
    setError("")
    try {
      const data = await fetchNews(query, language, sortBy)
      if (data.error) {
        throw new Error(data.error)
      }
      setArticles(data.articles || [])
    } catch (err) {
      console.error("Error searching news:", err)
      setError("Failed to fetch news. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">Search Keywords</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Enter keywords..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch()
                }
              }}
            />
          </div>
        </div>

        <div className="w-full md:w-48">
          <label className="block text-sm font-medium mb-2">Language</label>
          <LanguageSelector value={language} onChange={setLanguage} />
        </div>

        <div className="w-full md:w-48">
          <label className="block text-sm font-medium mb-2">Sort By</label>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="publishedAt">Newest</SelectItem>
              <SelectItem value="relevancy">Relevance</SelectItem>
              <SelectItem value="popularity">Popularity</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end">
          <Button onClick={handleSearch} disabled={loading} className="w-full md:w-auto">
            {loading ? "Searching..." : "Search"}
          </Button>
        </div>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.length > 0 ? (
          articles.map((article, index) => <NewsCard key={index} article={article} />)
        ) : (
          <div className="col-span-full text-center py-12">
            <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Enter keywords to search for news articles</p>
          </div>
        )}
      </div>
    </div>
  )
}

function SourcesTab() {
  const [category, setCategory] = useState("")
  const [language, setLanguage] = useState("")
  const [country, setCountry] = useState("")
  const [sources, setSources] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchSourcesList()
  }, [])

  const fetchSourcesList = async () => {
    setLoading(true)
    setError("")
    try {
      const data = await fetchSources(category, language, country)
      if (data.error) {
        throw new Error(data.error)
      }
      setSources(data.sources || [])
    } catch (err) {
      console.error("Error fetching sources:", err)
      setError("Failed to fetch sources. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">Category</label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="entertainment">Entertainment</SelectItem>
              <SelectItem value="health">Health</SelectItem>
              <SelectItem value="science">Science</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">Language</label>
          <LanguageSelector value={language} onChange={setLanguage} includeEmpty={true} />
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">Country</label>
          <Select value={country} onValueChange={setCountry}>
            <SelectTrigger>
              <SelectValue placeholder="All countries" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All countries</SelectItem>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="gb">United Kingdom</SelectItem>
              <SelectItem value="ca">Canada</SelectItem>
              <SelectItem value="au">Australia</SelectItem>
              <SelectItem value="de">Germany</SelectItem>
              <SelectItem value="fr">France</SelectItem>
              <SelectItem value="ae">United Arab Emirates</SelectItem>
              <SelectItem value="eg">Egypt</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end">
          <Button onClick={fetchSourcesList} disabled={loading} className="w-full md:w-auto">
            {loading ? "Loading..." : "Refresh Sources"}
          </Button>
        </div>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading sources...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sources.length > 0 ? (
            sources.map((source) => (
              <Card key={source.id} className="h-full">
                <CardHeader>
                  <CardTitle>{source.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <Globe className="h-4 w-4" />
                    {source.country.toUpperCase()} • {source.language.toUpperCase()} • {source.category}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{source.description}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <a href={source.url} target="_blank" rel="noopener noreferrer">
                      Visit Website
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Newspaper className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No sources available. Please update the criteria and try again.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
