"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Slider } from "@/components/ui/slider"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
    Circle,
    Maximize,
    MessageSquare,
    Mic,
    MicOff,
    Minimize2,
    MoreVertical,
    PhoneOff,
    ScreenShare,
    ScreenShareOff,
    Send,
    Settings,
    UserPlus,
    Users,
    Video,
    VideoOff,
    Volume2
} from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

interface Participant {
  id: string
  name: string
  avatar: string
  isMuted: boolean
  isVideoOff: boolean
  isHost: boolean
}

const participants: Participant[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "/avatars/sarah.jpg",
    isMuted: false,
    isVideoOff: false,
    isHost: true
  },
  {
    id: "2",
    name: "Mike Chen", 
    avatar: "/avatars/mike.jpg",
    isMuted: true,
    isVideoOff: false,
    isHost: false
  },
  {
    id: "3",
    name: "Emily Davis",
    avatar: "/avatars/emily.jpg", 
    isMuted: false,
    isVideoOff: true,
    isHost: false
  }
]

export default function VideoCallPage() {
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isMicOn, setIsMicOn] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showParticipants, setShowParticipants] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [volume, setVolume] = useState([80])
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Start the timer
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1)
    }, 1000)

    // Get user media for video preview
    const currentVideoRef = videoRef.current
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia && currentVideoRef) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((stream) => {
          if (currentVideoRef) {
            currentVideoRef.srcObject = stream
          }
        })
        .catch((err) => {
          console.error("Error accessing media devices:", err)
        })
    }

    return () => {
      clearInterval(timer)
      // Clean up media stream
      if (currentVideoRef && currentVideoRef.srcObject) {
        const stream = currentVideoRef.srcObject as MediaStream
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn)
    const currentVideoRef = videoRef.current
    if (currentVideoRef && currentVideoRef.srcObject) {
      const stream = currentVideoRef.srcObject as MediaStream
      const videoTrack = stream.getVideoTracks()[0]
      if (videoTrack) {
        videoTrack.enabled = !isVideoOn
      }
    }
  }

  const toggleMic = () => {
    setIsMicOn(!isMicOn)
    const currentVideoRef = videoRef.current
    if (currentVideoRef && currentVideoRef.srcObject) {
      const stream = currentVideoRef.srcObject as MediaStream
      const audioTrack = stream.getAudioTracks()[0]
      if (audioTrack) {
        audioTrack.enabled = !isMicOn
      }
    }
  }

  const endCall = () => {
    const currentVideoRef = videoRef.current
    if (currentVideoRef && currentVideoRef.srcObject) {
      const stream = currentVideoRef.srcObject as MediaStream
      stream.getTracks().forEach(track => track.stop())
    }
    // Navigate back or show end call screen
    window.history.back()
  }

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50' : 'h-screen'} bg-black flex flex-col`}>
      {/* Header */}
      <div className="p-4 bg-black/50 backdrop-blur-sm text-white flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold">Video Call</h1>
          <Badge variant="secondary" className="bg-green-600 text-white">
            {formatDuration(callDuration)}
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            className="text-white hover:bg-white/20"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-white hover:bg-white/20"
            onClick={() => setShowParticipants(!showParticipants)}
          >
            <Users className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem>Share Screen</DropdownMenuItem>
              <DropdownMenuItem>Record Call</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Main Video Area */}
      <div className="flex-1 relative">
        {/* Main video grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 h-full">
          {/* Local video */}
          <Card className="relative overflow-hidden bg-gray-900 border-gray-700">
            <CardContent className="p-0 h-full flex items-center justify-center">
              {isVideoOn ? (
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/avatars/you.jpg" />
                    <AvatarFallback className="text-2xl">ME</AvatarFallback>
                  </Avatar>
                </div>
              )}
              
              {/* Video overlay info */}
              <div className="absolute bottom-2 left-2 flex items-center gap-2">
                <Badge variant="secondary" className="bg-black/50 text-white">
                  You
                </Badge>
                {!isMicOn && (
                  <div className="bg-red-600 p-1 rounded">
                    <MicOff className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Participant videos */}
          {participants.map((participant) => (
            <Card key={participant.id} className="relative overflow-hidden bg-gray-900 border-gray-700">
              <CardContent className="p-0 h-full flex items-center justify-center">
                {!participant.isVideoOff ? (
                  <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
                    {/* Simulated video feed */}
                    <div className="text-white text-lg">📹 Video Feed</div>
                  </div>
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={participant.avatar} />
                      <AvatarFallback className="text-2xl">
                        {participant.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                )}
                
                {/* Video overlay info */}
                <div className="absolute bottom-2 left-2 flex items-center gap-2">
                  <Badge variant="secondary" className="bg-black/50 text-white">
                    {participant.name}
                    {participant.isHost && ' (Host)'}
                  </Badge>
                  {participant.isMuted && (
                    <div className="bg-red-600 p-1 rounded">
                      <MicOff className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Chat sidebar */}
        {showChat && (
          <div className="absolute top-0 right-0 w-80 h-full bg-black/90 backdrop-blur-sm border-l border-white/20">
            <div className="flex flex-col h-full">
              {/* Chat Header */}
              <div className="p-4 border-b border-white/20">
                <div className="flex items-center justify-between">
                  <h3 className="text-white text-lg font-semibold">Chat</h3>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowChat(false)}
                    className="text-white hover:bg-white/20"
                  >
                    ×
                  </Button>
                </div>
              </div>

              {/* Chat Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-3">
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/avatars/sarah.jpg" />
                        <AvatarFallback>SJ</AvatarFallback>
                      </Avatar>
                      <span className="text-white text-sm font-medium">Sarah</span>
                      <span className="text-white/50 text-xs">2:30 PM</span>
                    </div>
                    <p className="text-white/90 text-sm">Can everyone see my screen now?</p>
                  </div>
                  
                  <div className="bg-blue-600/80 rounded-lg p-3 ml-6">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white text-sm font-medium">You</span>
                      <span className="text-white/70 text-xs">2:31 PM</span>
                    </div>
                    <p className="text-white text-sm">Yes, it&apos;s coming through clearly!</p>
                  </div>

                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/avatars/mike.jpg" />
                        <AvatarFallback>MC</AvatarFallback>
                      </Avatar>
                      <span className="text-white text-sm font-medium">Mike</span>
                      <span className="text-white/50 text-xs">2:32 PM</span>
                    </div>
                    <p className="text-white/90 text-sm">Perfect! Thanks for sharing.</p>
                  </div>
                </div>
              </ScrollArea>

              {/* Chat Input */}
              <div className="p-4 border-t border-white/20">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Participants sidebar */}
        {showParticipants && !showChat && (
          <div className="absolute top-0 right-0 w-80 h-full bg-black/80 backdrop-blur-sm p-4">
            <h3 className="text-white text-lg font-semibold mb-4">
              Participants ({participants.length + 1})
            </h3>
            <div className="space-y-2">
              {/* You */}
              <div className="flex items-center gap-3 p-2 rounded bg-white/10">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/you.jpg" />
                  <AvatarFallback>ME</AvatarFallback>
                </Avatar>
                <span className="text-white flex-1">You (Host)</span>
                <div className="flex gap-1">
                  {!isMicOn && <MicOff className="h-4 w-4 text-red-400" />}
                  {!isVideoOn && <VideoOff className="h-4 w-4 text-red-400" />}
                </div>
              </div>
              
              {/* Other participants */}
              {participants.map((participant) => (
                <div key={participant.id} className="flex items-center gap-3 p-2 rounded bg-white/10">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={participant.avatar} />
                    <AvatarFallback>
                      {participant.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-white flex-1">
                    {participant.name}
                    {participant.isHost && ' (Host)'}
                  </span>
                  <div className="flex gap-1">
                    {participant.isMuted && <MicOff className="h-4 w-4 text-red-400" />}
                    {participant.isVideoOff && <VideoOff className="h-4 w-4 text-red-400" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Controls */}
      <div className="p-6 bg-black/50 backdrop-blur-sm">
        {/* Main Controls Row */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="lg"
                  variant={isMicOn ? "secondary" : "destructive"}
                  onClick={toggleMic}
                  className="rounded-full h-12 w-12"
                >
                  {isMicOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isMicOn ? "Mute" : "Unmute"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="lg"
                  variant={isVideoOn ? "secondary" : "destructive"}
                  onClick={toggleVideo}
                  className="rounded-full h-12 w-12"
                >
                  {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isVideoOn ? "Turn off camera" : "Turn on camera"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="lg"
                  variant={isScreenSharing ? "default" : "secondary"}
                  onClick={() => setIsScreenSharing(!isScreenSharing)}
                  className="rounded-full h-12 w-12"
                >
                  {isScreenSharing ? <ScreenShareOff className="h-5 w-5" /> : <ScreenShare className="h-5 w-5" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isScreenSharing ? "Stop sharing" : "Share screen"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="lg"
                  variant="destructive"
                  onClick={endCall}
                  className="rounded-full h-14 w-14 bg-red-600 hover:bg-red-700"
                >
                  <PhoneOff className="h-6 w-6" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>End call</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="lg"
                  variant={isRecording ? "destructive" : "secondary"}
                  onClick={() => setIsRecording(!isRecording)}
                  className="rounded-full h-12 w-12"
                >
                  <Circle className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isRecording ? "Stop recording" : "Start recording"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="lg"
                  variant={showChat ? "default" : "secondary"}
                  onClick={() => setShowChat(!showChat)}
                  className="rounded-full h-12 w-12"
                >
                  <MessageSquare className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{showChat ? "Hide chat" : "Show chat"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Secondary Controls Row */}
        <div className="flex items-center justify-center gap-6">
          <div className="flex items-center gap-2 text-white">
            <Volume2 className="h-4 w-4" />
            <Slider
              value={volume}
              onValueChange={setVolume}
              max={100}
              step={1}
              className="w-20"
            />
            <span className="text-sm w-8">{volume[0]}</span>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuItem>Audio Settings</DropdownMenuItem>
              <DropdownMenuItem>Video Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Background Blur</DropdownMenuItem>
              <DropdownMenuItem>Virtual Background</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Report Issue</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
            <UserPlus className="h-4 w-4 mr-2" />
            Invite
          </Button>
          
          <Button variant="ghost" className="text-white hover:bg-white/20" asChild>
            <Link href="/chat">Return to Chat</Link>
          </Button>
        </div>

        {/* Status Indicators */}
        <div className="flex justify-center mt-4 gap-4">
          {isRecording && (
            <Badge variant="destructive" className="animate-pulse">
              <Circle className="h-3 w-3 mr-1" />
              Recording
            </Badge>
          )}
          {isScreenSharing && (
            <Badge variant="default">
              <ScreenShare className="h-3 w-3 mr-1" />
              Screen Sharing
            </Badge>
          )}
        </div>
      </div>
    </div>
  )
}
