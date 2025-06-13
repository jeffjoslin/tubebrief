import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"

interface Video {
  id: string
  title: string
  thumbnail: string
  date: string
  url: string
}

interface VideoCardProps {
  video: Video
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <Link href={`/dashboard/video/${video.id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <div className="aspect-video overflow-hidden bg-muted">
          <img src={video.thumbnail || "/placeholder.svg"} alt={video.title} className="h-full w-full object-cover" />
        </div>
        <CardContent className="p-4">
          <h3 className="line-clamp-2 font-medium">{video.title}</h3>
          <p className="mt-1 text-xs text-muted-foreground">{formatDate(video.date)}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
