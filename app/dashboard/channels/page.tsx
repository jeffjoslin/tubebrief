"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus } from "lucide-react"
import { ChannelCard } from "@/components/channel-card"
import { VideoList } from "@/components/video-list"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

// Mock data for demonstration
const mockChannels = [
  {
    id: "1",
    name: "Tech Insights",
    handle: "@techinsights",
    thumbnail: "/placeholder.svg?height=80&width=80",
    subscriberCount: "1.2M",
    videoCount: 245,
  },
  {
    id: "2",
    name: "Code With Me",
    handle: "@codewithme",
    thumbnail: "/placeholder.svg?height=80&width=80",
    subscriberCount: "850K",
    videoCount: 189,
  },
  {
    id: "3",
    name: "AI Explained",
    handle: "@aiexplained",
    thumbnail: "/placeholder.svg?height=80&width=80",
    subscriberCount: "2.5M",
    videoCount: 312,
  },
]

// Mock videos for a channel
const mockVideos = [
  {
    id: "v1",
    title: "Understanding Neural Networks - Part 1",
    thumbnail: "/placeholder.svg?height=120&width=200",
    publishedAt: "2023-05-15",
    duration: "15:42",
    views: "245K",
  },
  {
    id: "v2",
    title: "The Future of Large Language Models",
    thumbnail: "/placeholder.svg?height=120&width=200",
    publishedAt: "2023-06-22",
    duration: "22:18",
    views: "189K",
  },
  {
    id: "v3",
    title: "How Transformers Work - Explained Simply",
    thumbnail: "/placeholder.svg?height=120&width=200",
    publishedAt: "2023-07-10",
    duration: "18:05",
    views: "312K",
  },
  {
    id: "v4",
    title: "Building Your First Machine Learning Model",
    thumbnail: "/placeholder.svg?height=120&width=200",
    publishedAt: "2023-08-05",
    duration: "25:30",
    views: "178K",
  },
  {
    id: "v5",
    title: "Data Science Career Paths in 2023",
    thumbnail: "/placeholder.svg?height=120&width=200",
    publishedAt: "2023-09-12",
    duration: "20:15",
    views: "203K",
  },
]

export default function ChannelsPage() {
  const [channels, setChannels] = useState(mockChannels)
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [newChannelUrl, setNewChannelUrl] = useState("")
  const [isAddingChannel, setIsAddingChannel] = useState(false)
  const [selectedVideos, setSelectedVideos] = useState<string[]>([])

  const handleAddChannel = () => {
    // In a real app, this would validate and fetch channel data from YouTube API
    if (!newChannelUrl) return

    // Mock adding a new channel
    const newChannel = {
      id: `new-${Date.now()}`,
      name: "New Channel",
      handle: newChannelUrl.includes("@") ? newChannelUrl : "@newchannel",
      thumbnail: "/placeholder.svg?height=80&width=80",
      subscriberCount: "0",
      videoCount: 0,
    }

    setChannels([...channels, newChannel])
    setNewChannelUrl("")
    setIsAddingChannel(false)
  }

  const handleRemoveChannel = (channelId: string) => {
    setChannels(channels.filter((channel) => channel.id !== channelId))
    if (selectedChannel === channelId) {
      setSelectedChannel(null)
    }
  }

  const handleSelectVideo = (videoId: string) => {
    setSelectedVideos((prev) => (prev.includes(videoId) ? prev.filter((id) => id !== videoId) : [...prev, videoId]))
  }

  const handleProcessVideos = () => {
    // In a real app, this would send the selected videos for processing
    console.log("Processing videos:", selectedVideos)
    // Reset selection after processing
    setSelectedVideos([])
  }

  const filteredChannels = channels.filter(
    (channel) =>
      channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      channel.handle.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Channels</h1>
          <p className="text-muted-foreground">Manage YouTube channels and select videos for processing</p>
        </div>
        <Dialog open={isAddingChannel} onOpenChange={setIsAddingChannel}>
          <DialogTrigger asChild>
            <Button className="gap-1">
              <Plus className="h-4 w-4" />
              Add Channel
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add YouTube Channel</DialogTitle>
              <DialogDescription>Enter a YouTube channel URL or handle to add it to your list.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="channel-url">Channel URL or Handle</Label>
                <Input
                  id="channel-url"
                  placeholder="https://youtube.com/c/channelname or @channelname"
                  value={newChannelUrl}
                  onChange={(e) => setNewChannelUrl(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddingChannel(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddChannel}>Add Channel</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="channels" className="w-full">
        <TabsList>
          <TabsTrigger value="channels">My Channels</TabsTrigger>
          {selectedChannel && <TabsTrigger value="videos">Channel Videos</TabsTrigger>}
        </TabsList>

        <TabsContent value="channels" className="mt-4 space-y-4">
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search channels..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredChannels.map((channel) => (
              <ChannelCard
                key={channel.id}
                channel={channel}
                onSelect={() => setSelectedChannel(channel.id)}
                onRemove={() => handleRemoveChannel(channel.id)}
              />
            ))}

            {filteredChannels.length === 0 && (
              <Card className="col-span-full">
                <CardContent className="flex flex-col items-center justify-center py-8 text-center">
                  <p className="mb-4 text-muted-foreground">No channels found</p>
                  <Button variant="outline" onClick={() => setIsAddingChannel(true)}>
                    Add Your First Channel
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {selectedChannel && (
          <TabsContent value="videos" className="mt-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">{channels.find((c) => c.id === selectedChannel)?.name} Videos</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={() => setSelectedVideos([])} disabled={selectedVideos.length === 0}>
                  Clear Selection
                </Button>
                <Button onClick={handleProcessVideos} disabled={selectedVideos.length === 0}>
                  Process {selectedVideos.length} {selectedVideos.length === 1 ? "Video" : "Videos"}
                </Button>
              </div>
            </div>

            <VideoList videos={mockVideos} selectedVideos={selectedVideos} onSelectVideo={handleSelectVideo} />
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
