"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Search, CalendarIcon } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { format } from "date-fns"

// Mock data for processed videos
const mockProcessedVideos = [
  {
    id: "1",
    title: "Understanding Neural Networks - Part 1",
    thumbnail: "/placeholder.svg?height=240&width=426",
    processedAt: "2023-12-15",
    duration: "15:42",
    views: "245K views",
    channel: "Tech Insights",
    channelId: "1",
    subject: "AI & Machine Learning",
  },
  {
    id: "2",
    title: "The Future of Large Language Models",
    thumbnail: "/placeholder.svg?height=240&width=426",
    processedAt: "2023-11-22",
    duration: "22:18",
    views: "189K views",
    channel: "Tech Insights",
    channelId: "1",
    subject: "AI & Machine Learning",
  },
  {
    id: "3",
    title: "How Transformers Work - Explained Simply",
    thumbnail: "/placeholder.svg?height=240&width=426",
    processedAt: "2023-10-10",
    duration: "18:05",
    views: "312K views",
    channel: "AI Explained",
    channelId: "3",
    subject: "AI & Machine Learning",
  },
  {
    id: "4",
    title: "Building Your First Machine Learning Model",
    thumbnail: "/placeholder.svg?height=240&width=426",
    processedAt: "2023-09-05",
    duration: "25:30",
    views: "178K views",
    channel: "Code With Me",
    channelId: "2",
    subject: "Programming",
  },
  {
    id: "5",
    title: "Data Science Career Paths in 2023",
    thumbnail: "/placeholder.svg?height=240&width=426",
    processedAt: "2023-08-12",
    duration: "20:15",
    views: "203K views",
    channel: "Tech Insights",
    channelId: "1",
    subject: "Career",
  },
  {
    id: "6",
    title: "Python Tips and Tricks for Data Analysis",
    thumbnail: "/placeholder.svg?height=240&width=426",
    processedAt: "2023-07-18",
    duration: "17:45",
    views: "156K views",
    channel: "Code With Me",
    channelId: "2",
    subject: "Programming",
  },
]

// Get unique channels, subjects for filters
const channels = Array.from(new Set(mockProcessedVideos.map((video) => video.channel)))
const subjects = Array.from(new Set(mockProcessedVideos.map((video) => video.subject)))

export default function ProcessedVideosPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [channelFilter, setChannelFilter] = useState<string>("all")
  const [subjectFilter, setSubjectFilter] = useState<string>("all")
  const [dateFilter, setDateFilter] = useState<Date | null>(null)

  // Filter videos based on search query and filters
  const filteredVideos = mockProcessedVideos.filter((video) => {
    // Search query filter
    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.channel.toLowerCase().includes(searchQuery.toLowerCase())

    // Channel filter
    const matchesChannel = channelFilter === "all" ? true : video.channel === channelFilter

    // Subject filter
    const matchesSubject = subjectFilter === "all" ? true : video.subject === subjectFilter

    // Date filter
    const matchesDate = dateFilter
      ? format(new Date(video.processedAt), "yyyy-MM-dd") === format(dateFilter, "yyyy-MM-dd")
      : true

    return matchesSearch && matchesChannel && matchesSubject && matchesDate
  })

  const handleVideoClick = (videoId: string) => {
    router.push(`/dashboard/video/${videoId}`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Processed Videos</h1>
        <p className="text-muted-foreground">View and manage your processed YouTube videos</p>
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>

        <Select value={channelFilter} onValueChange={(value) => setChannelFilter(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by channel" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Channels</SelectItem>
            {channels.map((channel) => (
              <SelectItem key={channel} value={channel}>
                {channel}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={subjectFilter} onValueChange={(value) => setSubjectFilter(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subjects</SelectItem>
            {subjects.map((subject) => (
              <SelectItem key={subject} value={subject}>
                {subject}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[180px] justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateFilter ? format(dateFilter, "PPP") : "Filter by date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={dateFilter || undefined}
              onSelect={(date) => setDateFilter(date)}
              initialFocus
            />
            {dateFilter && (
              <div className="p-3 border-t">
                <Button variant="ghost" size="sm" onClick={() => setDateFilter(null)} className="w-full">
                  Clear Date
                </Button>
              </div>
            )}
          </PopoverContent>
        </Popover>

        {(searchQuery || channelFilter || subjectFilter || dateFilter) && (
          <Button
            variant="ghost"
            onClick={() => {
              setSearchQuery("")
              setChannelFilter("all")
              setSubjectFilter("all")
              setDateFilter(null)
            }}
          >
            Clear Filters
          </Button>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredVideos.map((video) => (
          <Card
            key={video.id}
            className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleVideoClick(video.id)}
          >
            <div className="relative aspect-video overflow-hidden bg-muted">
              <img
                src={video.thumbnail || "/placeholder.svg"}
                alt={video.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-xs text-white">
                {video.duration}
              </div>
            </div>
            <CardContent className="p-3">
              <h3 className="font-medium line-clamp-2 text-base">{video.title}</h3>
              <div className="mt-1 flex flex-col text-xs text-muted-foreground">
                <span>{video.channel}</span>
                <span>
                  {video.views} • {formatDate(video.processedAt)}
                </span>
                <span className="mt-1 inline-block px-2 py-0.5 bg-muted rounded-full text-xs">{video.subject}</span>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredVideos.length === 0 && (
          <div className="col-span-full flex h-60 items-center justify-center rounded-md border border-dashed">
            <p className="text-muted-foreground">No processed videos found</p>
          </div>
        )}
      </div>
    </div>
  )
}
