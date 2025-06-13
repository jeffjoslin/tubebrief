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
    <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${className || ""}`}>
      {videos.map((video) => (
        <div key={video.id} className="relative group">
          <div className="absolute top-3 left-3 z-10 h-5 w-5 flex items-center justify-center">
            <Checkbox
              id={`video-${video.id}`}
              checked={selectedVideos.includes(video.id)}
              onCheckedChange={() => onSelectVideo(video.id)}
              className="h-5 w-5 bg-white/90 border-transparent data-[state=checked]:translate-y-0"
            />
          </div>
          <Card className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
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
                <span>{video.views} views</span>
                <span>{formatDate(video.publishedAt)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}

      {videos.length === 0 && (
        <div className="col-span-full flex h-40 items-center justify-center rounded-md border border-dashed">
          <p className="text-muted-foreground">No videos found for this channel</p>
        </div>
      )}
    </div>
  )
}
