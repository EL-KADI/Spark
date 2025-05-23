const API_KEY = "3d827ea998d043088c7009d8b886ad29"
const BASE_URL = "https://newsapi.org/v2"

export async function fetchNewsServer(query: string, language = "en", sortBy = "publishedAt") {
  const url = new URL(`${BASE_URL}/everything`)

  url.searchParams.append("q", query)
  url.searchParams.append("language", language)
  url.searchParams.append("sortBy", sortBy)
  url.searchParams.append("apiKey", API_KEY)

  try {
    const response = await fetch(url.toString(), {
      headers: {
        "X-Api-Key": API_KEY,
      },
      next: { revalidate: 60 },
    })

    if (!response.ok) {
      console.error(`API Error: ${response.status} ${response.statusText}`)
      throw new Error(`Failed to fetch news: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching news:", error)
    throw error
  }
}

export async function fetchTopHeadlinesServer(country = "us", category = "general") {
  const url = new URL(`${BASE_URL}/top-headlines`)

  url.searchParams.append("country", country)
  url.searchParams.append("category", category)
  url.searchParams.append("apiKey", API_KEY)

  try {
    const response = await fetch(url.toString(), {
      headers: {
        "X-Api-Key": API_KEY,
      },
      next: { revalidate: 60 },
    })

    if (!response.ok) {
      console.error(`API Error: ${response.status} ${response.statusText}`)
      throw new Error(`Failed to fetch headlines: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching headlines:", error)
    throw error
  }
}

export async function fetchSourcesServer(category = "", language = "", country = "") {
  const url = new URL(`${BASE_URL}/top-headlines/sources`)

  if (category && category !== "all") url.searchParams.append("category", category)
  if (language && language !== "all") url.searchParams.append("language", language)
  if (country && country !== "all") url.searchParams.append("country", country)
  url.searchParams.append("apiKey", API_KEY)

  try {
    const response = await fetch(url.toString(), {
      headers: {
        "X-Api-Key": API_KEY,
      },
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      console.error(`API Error: ${response.status} ${response.statusText}`)
      throw new Error(`Failed to fetch sources: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching sources:", error)
    throw error
  }
}

export async function fetchNews(query: string, language = "en", sortBy = "publishedAt") {
  try {
    const response = await fetch(`/api/news?q=${encodeURIComponent(query)}&language=${language}&sortBy=${sortBy}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch news: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error in fetchNews:", error)
    throw error
  }
}

export async function fetchTopHeadlines(country = "us", category = "general") {
  try {
    const response = await fetch(`/api/headlines?country=${country}&category=${category}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch headlines: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error in fetchTopHeadlines:", error)
    throw error
  }
}

export async function fetchSources(category = "", language = "", country = "") {
  try {
    const params = new URLSearchParams()
    if (category && category !== "all") params.append("category", category)
    if (language && language !== "all") params.append("language", language)
    if (country && country !== "all") params.append("country", country)

    const response = await fetch(`/api/sources?${params.toString()}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch sources: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error in fetchSources:", error)
    throw error
  }
}
