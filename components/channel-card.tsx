"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

interface Channel {
  id: string
  name: string
  handle: string
  thumbnail: string
  subscriberCount: string
  videoCount: number
}

interface ChannelCardProps {
  channel: Channel
  onSelect: () => void
  onRemove: () => void
}

export function ChannelCard({ channel, onSelect, onRemove }: ChannelCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-0">
        <div className="flex cursor-pointer items-center gap-4 p-4" onClick={onSelect}>
          <div className="h-16 w-16 overflow-hidden rounded-full">
            <img
              src={channel.thumbnail || "/placeholder.svg"}
              alt={channel.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1 overflow-hidden">
            <h3 className="truncate font-medium">{channel.name}</h3>
            <p className="text-sm text-muted-foreground">{channel.handle}</p>
            <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
              <span>{channel.subscriberCount} subscribers</span>
              <span>•</span>
              <span>{channel.videoCount} videos</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t bg-muted/50 px-4 py-2">
        <Button variant="ghost" size="sm" onClick={onSelect}>
          View Videos
        </Button>
        <Button variant="ghost" size="sm" onClick={onRemove}>
          <Trash2 className="h-4 w-4 text-muted-foreground" />
        </Button>
      </CardFooter>
    </Card>
  )
}
