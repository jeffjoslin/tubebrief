import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { formatDate } from "@/lib/utils"

interface Video {
  id: string
  title: string
  thumbnail: string
  publishedAt: string
  duration: string
  views: string
}

interface VideoListProps {
  videos: Video[]
  selectedVideos: string[]
  onSelectVideo: (videoId: string) => void
  className?: string
}

export function VideoList({ videos, selectedVideos, onSelectVideo, className }: VideoListProps) {
  return (
    <div className={`space-y-3 w-full ${className || ""}`}>
      {videos.map((video) => (
        <Card key={video.id} className="overflow-hidden w-full">
          <CardContent className="p-0">
            <div className="flex items-center gap-4 p-4 w-full">
              <Checkbox
                id={`video-${video.id}`}
                checked={selectedVideos.includes(video.id)}
                onCheckedChange={() => onSelectVideo(video.id)}
              />
              <div className="relative h-20 w-36 flex-shrink-0 overflow-hidden rounded-md">
                <img
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute bottom-1 right-1 rounded bg-black/80 px-1 py-0.5 text-xs text-white">
                  {video.duration}
                </div>
              </div>
              <div className="flex-1 overflow-hidden">
                <h3 className="line-clamp-2 font-medium">{video.title}</h3>
                <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{video.views} views</span>
                  <span>•</span>
                  <span>{formatDate(video.publishedAt)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {videos.length === 0 && (
        <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
          <p className="text-muted-foreground">No videos found for this channel</p>
        </div>
      )}
    </div>
  )
}
