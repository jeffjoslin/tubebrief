"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { VideoCard } from "@/components/video-card"
import { Search } from "lucide-react"

// Mock data for demonstration
const mockVideos = [
  {
    id: "1",
    title: "How to Build a Next.js Application",
    thumbnail: "/placeholder.svg?height=120&width=200",
    date: "2023-06-15",
    url: "https://youtube.com/watch?v=123",
  },
  {
    id: "2",
    title: "The Future of Artificial Intelligence",
    thumbnail: "/placeholder.svg?height=120&width=200",
    date: "2023-05-22",
    url: "https://youtube.com/watch?v=456",
  },
  {
    id: "3",
    title: "Understanding React Hooks",
    thumbnail: "/placeholder.svg?height=120&width=200",
    date: "2023-04-10",
    url: "https://youtube.com/watch?v=789",
  },
]

export default function Dashboard() {
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!url) return

    setIsLoading(true)

    // Simulate processing
    setTimeout(() => {
      setIsLoading(false)
      setUrl("")
      // In a real app, you would redirect to the video detail page
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Enter a YouTube URL to generate a transcript and summary</p>
      </div>

      <div className="rounded-lg border bg-card">
        <div className="p-6">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              placeholder="Enter YouTube URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Processing..." : "Generate Transcript"}
            </Button>
          </form>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">My Videos</h2>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search videos..." className="w-[200px] pl-8" />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mockVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </div>
  )
}
