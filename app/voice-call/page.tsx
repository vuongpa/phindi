"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
    MessageSquare,
    Mic,
    MicOff,
    PhoneOff,
    Settings,
    Speaker,
    UserPlus,
    Volume2
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

interface CallState {
  status: "connecting" | "ringing" | "connected" | "ended"
  duration: number
  contact: {
    name: string
    avatar: string
    phone: string
  }
}

export default function VoiceCallPage() {
  const [callState, setCallState] = useState<CallState>({
    status: "connecting",
    duration: 0,
    contact: {
      name: "Sarah Johnson",
      avatar: "/avatars/sarah.jpg", 
      phone: "+1 (555) 123-4567"
    }
  })
  const [isMicOn, setIsMicOn] = useState(true)
  const [isSpeakerOn, setIsSpeakerOn] = useState(false)
  const [audioLevel, setAudioLevel] = useState(0)

  useEffect(() => {
    // Simulate call connection sequence
    const connectTimer = setTimeout(() => {
      setCallState(prev => ({ ...prev, status: "ringing" }))
    }, 1000)

    const answerTimer = setTimeout(() => {
      setCallState(prev => ({ ...prev, status: "connected" }))
    }, 3000)

    return () => {
      clearTimeout(connectTimer)
      clearTimeout(answerTimer)
    }
  }, [])

  useEffect(() => {
    let durationTimer: NodeJS.Timeout

    if (callState.status === "connected") {
      durationTimer = setInterval(() => {
        setCallState(prev => ({ ...prev, duration: prev.duration + 1 }))
      }, 1000)
    }

    return () => {
      if (durationTimer) clearInterval(durationTimer)
    }
  }, [callState.status])

  useEffect(() => {
    // Simulate audio level animation
    let audioTimer: NodeJS.Timeout
    
    if (callState.status === "connected" && isMicOn) {
      audioTimer = setInterval(() => {
        setAudioLevel(Math.random() * 100)
      }, 200)
    } else {
      setAudioLevel(0)
    }

    return () => {
      if (audioTimer) clearInterval(audioTimer)
    }
  }, [callState.status, isMicOn])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const endCall = () => {
    setCallState(prev => ({ ...prev, status: "ended" }))
    setTimeout(() => {
      window.history.back()
    }, 2000)
  }

  const getStatusText = () => {
    switch (callState.status) {
      case "connecting":
        return "Connecting..."
      case "ringing":
        return "Ringing..."
      case "connected":
        return formatDuration(callState.duration)
      case "ended":
        return "Call ended"
      default:
        return ""
    }
  }

  const getStatusColor = () => {
    switch (callState.status) {
      case "connecting":
        return "bg-yellow-600"
      case "ringing":
        return "bg-blue-600"
      case "connected":
        return "bg-green-600"
      case "ended":
        return "bg-gray-600"
      default:
        return "bg-gray-600"
    }
  }

  return (
    <div className="h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full animate-pulse delay-1000"></div>
      </div>

      {/* Call Card */}
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-lg border-white/20 text-white relative z-10">
        <CardContent className="p-8 text-center">
          {/* Status Badge */}
          <div className="flex justify-center mb-6">
            <Badge className={`${getStatusColor()} text-white px-4 py-1`}>
              {getStatusText()}
            </Badge>
          </div>

          {/* Contact Avatar */}
          <div className="relative mb-6 flex justify-center">
            <div className={`absolute inset-0 rounded-full ${
              callState.status === "connected" ? "animate-ping bg-green-400/30" : ""
            }`}></div>
            <Avatar className="h-32 w-32 relative z-10 border-4 border-white/20">
              <AvatarImage src={callState.contact.avatar} alt={callState.contact.name} />
              <AvatarFallback className="text-3xl bg-white/20">
                {callState.contact.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Contact Info */}
          <h2 className="text-2xl font-semibold mb-2">{callState.contact.name}</h2>
          <p className="text-white/70 mb-6">{callState.contact.phone}</p>

          {/* Enhanced Audio Level Indicator */}
          {callState.status === "connected" && (
            <div className="mb-6">
              <div className="flex items-center justify-center gap-1 mb-3">
                <div className="flex gap-1">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-1 rounded-full transition-all duration-200 ${
                        audioLevel > i * 12.5 
                          ? "bg-green-400 h-8" 
                          : "bg-white/20 h-4"
                      }`}
                      style={{
                        animationDelay: `${i * 50}ms`,
                        height: audioLevel > i * 12.5 ? `${Math.max(16, audioLevel / 5)}px` : '16px'
                      }}
                    ></div>
                  ))}
                </div>
              </div>
              <p className="text-sm text-white/70 flex items-center justify-center gap-2">
                {isMicOn ? (
                  <>
                    <Mic className="h-4 w-4 text-green-400" />
                    <span>Speaking...</span>
                  </>
                ) : (
                  <>
                    <MicOff className="h-4 w-4 text-red-400" />
                    <span>Muted</span>
                  </>
                )}
              </p>
            </div>
          )}

          {/* Call Quality Indicator */}
          {callState.status === "connected" && (
            <div className="mb-6">
              <div className="flex items-center justify-center gap-2 text-sm text-white/70">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>HD Audio Quality</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Enhanced Call Controls */}
      <div className="mt-8 flex items-center justify-center gap-6 relative z-10">
        {callState.status === "connected" && (
          <>
            {/* Mute Button with tooltip */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="lg"
                    variant={isMicOn ? "secondary" : "destructive"}
                    onClick={() => setIsMicOn(!isMicOn)}
                    className="rounded-full h-14 w-14 bg-white/20 hover:bg-white/30 border-white/30 transition-all duration-200 hover:scale-110"
                  >
                    {isMicOn ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isMicOn ? "Mute" : "Unmute"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Speaker Button with tooltip */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="lg"
                    variant={isSpeakerOn ? "secondary" : "outline"}
                    onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                    className="rounded-full h-14 w-14 bg-white/20 hover:bg-white/30 border-white/30 transition-all duration-200 hover:scale-110"
                  >
                    {isSpeakerOn ? <Volume2 className="h-6 w-6" /> : <Speaker className="h-6 w-6" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isSpeakerOn ? "Turn off speaker" : "Turn on speaker"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        )}

        {/* End Call Button */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="lg"
                variant="destructive"
                onClick={endCall}
                disabled={callState.status === "ended"}
                className="rounded-full h-16 w-16 bg-red-600 hover:bg-red-700 text-white transition-all duration-200 hover:scale-110 shadow-lg"
              >
                <PhoneOff className="h-7 w-7" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>End call</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {callState.status === "connected" && (
          <>
            {/* Add Participant Button */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full h-14 w-14 bg-white/20 hover:bg-white/30 border-white/30 transition-all duration-200 hover:scale-110"
                  >
                    <UserPlus className="h-6 w-6" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add participant</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Settings Button */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full h-14 w-14 bg-white/20 hover:bg-white/30 border-white/30 transition-all duration-200 hover:scale-110"
                  >
                    <Settings className="h-6 w-6" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Audio settings</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        )}
      </div>

      {/* Quick Actions */}
      {callState.status === "connected" && (
        <div className="mt-8 flex gap-4 relative z-10">
          <Button variant="ghost" className="text-white/80 hover:text-white" asChild>
            <Link href="/chat">
              <MessageSquare className="h-4 w-4 mr-2" />
              Open Chat
            </Link>
          </Button>
        </div>
      )}

      {/* Call Ended State */}
      {callState.status === "ended" && (
        <div className="mt-8 text-center relative z-10">
          <p className="text-white/80 mb-4">Call duration: {formatDuration(callState.duration)}</p>
          <div className="flex gap-4 justify-center">
            <Button variant="outline" className="bg-white/20 border-white/30 text-white" asChild>
              <Link href="/chat">Return to Chat</Link>
            </Button>
            <Button variant="outline" className="bg-white/20 border-white/30 text-white">
              Call Again
            </Button>
          </div>
        </div>
      )}

      {/* Ringing Animation */}
      {callState.status === "ringing" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-96 h-96 border border-white/20 rounded-full animate-ping"></div>
          <div className="w-80 h-80 border border-white/30 rounded-full animate-ping delay-300 absolute"></div>
          <div className="w-64 h-64 border border-white/40 rounded-full animate-ping delay-700 absolute"></div>
        </div>
      )}
    </div>
  )
}
