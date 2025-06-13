"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Check } from "lucide-react"

// Mock data for demonstration
const mockVideo = {
  id: "1",
  title: "How to Build a Next.js Application",
  thumbnail: "/placeholder.svg?height=240&width=426",
  url: "https://youtube.com/watch?v=123",
  transcript: [
    { time: "0:00", text: "Hello and welcome to this tutorial on building Next.js applications." },
    {
      time: "0:15",
      text: "Next.js is a React framework that enables server-side rendering and static site generation.",
    },
    { time: "0:30", text: "In this video, we'll cover project setup, routing, and data fetching." },
    { time: "1:00", text: "Let's start by creating a new Next.js project using create-next-app." },
    { time: "1:30", text: "This command sets up a new project with all the necessary configurations." },
    { time: "2:00", text: "Next, we'll explore the file structure and understand how routing works in Next.js." },
    { time: "2:30", text: "The pages directory is where you define your routes." },
    { time: "3:00", text: "Each file in this directory becomes a route in your application." },
    { time: "3:30", text: "Now, let's look at data fetching methods like getStaticProps and getServerSideProps." },
    { time: "4:00", text: "These functions allow you to fetch data at build time or request time." },
  ],
  summary:
    "This tutorial provides a comprehensive introduction to building applications with Next.js, a powerful React framework. The video covers essential topics including project setup using create-next-app, the Next.js file structure and routing system based on the pages directory, and various data fetching methods such as getStaticProps and getServerSideProps. The tutorial explains how Next.js enables both server-side rendering and static site generation, making it a versatile choice for modern web development. Viewers will learn how to create routes, fetch data efficiently, and leverage Next.js features to build performant React applications.",
}

export default function VideoDetail({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("transcript")
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  const copyTranscript = () => {
    const text = mockVideo.transcript.map((item) => `${item.time} - ${item.text}`).join("\n")
    copyToClipboard(text, "transcript")
  }

  const copySummary = () => {
    copyToClipboard(mockVideo.summary, "summary")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{mockVideo.title}</h1>
          <p className="text-muted-foreground">Video ID: {params.id}</p>
        </div>
        <Button variant="outline" asChild>
          <a href={mockVideo.url} target="_blank" rel="noopener noreferrer">
            View on YouTube
          </a>
        </Button>
      </div>

      <div className="aspect-video overflow-hidden rounded-lg">
        <img
          src={mockVideo.thumbnail || "/placeholder.svg"}
          alt={mockVideo.title}
          className="h-full w-full object-cover"
        />
      </div>

      <Tabs defaultValue="transcript" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="transcript">Transcript</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
        </TabsList>

        <TabsContent value="transcript" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Video Transcript</CardTitle>
              <Button variant="ghost" size="sm" className="gap-1" onClick={copyTranscript}>
                {copied === "transcript" ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy
                  </>
                )}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="max-h-[400px] space-y-2 overflow-y-auto pr-2">
                {mockVideo.transcript.map((item, index) => (
                  <div key={index} className="flex gap-4 text-sm">
                    <span className="w-12 shrink-0 font-mono text-muted-foreground">{item.time}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="summary" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>AI Summary</CardTitle>
              <Button variant="ghost" size="sm" className="gap-1" onClick={copySummary}>
                {copied === "summary" ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy
                  </>
                )}
              </Button>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{mockVideo.summary}</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
