"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, BellOff, Check, Heart, MessageSquare, Trash2, UserPlus, Video, X } from "lucide-react"
import { useState } from "react"

interface Notification {
  id: string
  type: "message" | "call" | "friend_request" | "reaction" | "system"
  title: string
  message: string
  timestamp: Date
  isRead: boolean
  avatar?: string
  sender?: string
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "message",
      title: "New Message",
      message: "Sarah sent you a message: 'Hey! How are you doing?'",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      isRead: false,
      avatar: "",
      sender: "Sarah Wilson"
    },
    {
      id: "2",
      type: "call",
      title: "Missed Call",
      message: "You missed a video call from Mike Chen",
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      isRead: false,
      avatar: "",
      sender: "Mike Chen"
    },
    {
      id: "3",
      type: "friend_request",
      title: "Friend Request",
      message: "Emma Thompson wants to connect with you",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      isRead: true,
      avatar: "",
      sender: "Emma Thompson"
    },
    {
      id: "4",
      type: "reaction",
      title: "Message Reaction",
      message: "Alex liked your message in Group Chat",
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      isRead: true,
      avatar: "",
      sender: "Alex Johnson"
    },
    {
      id: "5",
      type: "system",
      title: "System Update",
      message: "Phindi has been updated with new features and improvements",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: true
    }
  ])

  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: false,
    messageNotifications: true,
    callNotifications: true,
    soundEnabled: true,
    vibrationEnabled: true
  })

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    )
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "message": return <MessageSquare className="h-5 w-5 text-blue-500" />
      case "call": return <Video className="h-5 w-5 text-green-500" />
      case "friend_request": return <UserPlus className="h-5 w-5 text-purple-500" />
      case "reaction": return <Heart className="h-5 w-5 text-red-500" />
      default: return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  const unreadCount = notifications.filter(n => !n.isRead).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-4xl mx-auto p-6">
          <Tabs defaultValue="notifications" className="w-full">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  <Bell className="h-8 w-8" />
                  Notifications
                  {unreadCount > 0 && (
                    <Badge variant="destructive" className="ml-2">
                      {unreadCount}
                    </Badge>
                  )}
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  Stay updated with your latest activity
                </p>
              </div>
              <TabsList>
                <TabsTrigger value="notifications">All</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="notifications" className="space-y-6">
              {/* Action Buttons */}
              {notifications.length > 0 && (
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {unreadCount > 0 && (
                          <Button onClick={markAllAsRead} variant="outline" size="sm">
                            <Check className="h-4 w-4 mr-2" />
                            Mark All Read
                          </Button>
                        )}
                        <Button onClick={clearAll} variant="outline" size="sm">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Clear All
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500">
                        {notifications.length} notification{notifications.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Notifications List */}
              <Card>
                <CardContent className="p-0">
                  {notifications.length === 0 ? (
                    <div className="text-center py-12">
                      <BellOff className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        No notifications
                      </h3>
                      <p className="text-gray-500">
                        You&apos;re all caught up! New notifications will appear here.
                      </p>
                    </div>
                  ) : (
                    <ScrollArea className="h-[600px]">
                      <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50 ${
                              !notification.isRead ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''
                            }`}
                          >
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0">
                                {notification.sender ? (
                                  <Avatar className="h-10 w-10">
                                    <AvatarImage src={notification.avatar} alt={notification.sender} />
                                    <AvatarFallback>
                                      {notification.sender.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                ) : (
                                  <div className="h-10 w-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                                    {getNotificationIcon(notification.type)}
                                  </div>
                                )}
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                                      {notification.title}
                                    </h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                      {notification.message}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-2">
                                      {formatTimeAgo(notification.timestamp)}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2 ml-4">
                                    {!notification.isRead && (
                                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    )}
                                    <Button
                                      onClick={() => deleteNotification(notification.id)}
                                      variant="ghost"
                                      size="sm"
                                      className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>

                                {!notification.isRead && (
                                  <Button
                                    onClick={() => markAsRead(notification.id)}
                                    variant="ghost"
                                    size="sm"
                                    className="mt-2 h-7 text-xs"
                                  >
                                    Mark as read
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>
                    Customize how you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Push Notifications</h4>
                      <p className="text-sm text-gray-500">
                        Receive notifications on this device
                      </p>
                    </div>
                    <Switch
                      checked={settings.pushNotifications}
                      onCheckedChange={(checked) =>
                        setSettings(prev => ({ ...prev, pushNotifications: checked }))
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Email Notifications</h4>
                      <p className="text-sm text-gray-500">
                        Receive notification summaries via email
                      </p>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) =>
                        setSettings(prev => ({ ...prev, emailNotifications: checked }))
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Message Notifications</h4>
                      <p className="text-sm text-gray-500">
                        Get notified when you receive new messages
                      </p>
                    </div>
                    <Switch
                      checked={settings.messageNotifications}
                      onCheckedChange={(checked) =>
                        setSettings(prev => ({ ...prev, messageNotifications: checked }))
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Call Notifications</h4>
                      <p className="text-sm text-gray-500">
                        Get notified about incoming calls
                      </p>
                    </div>
                    <Switch
                      checked={settings.callNotifications}
                      onCheckedChange={(checked) =>
                        setSettings(prev => ({ ...prev, callNotifications: checked }))
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Sound</h4>
                      <p className="text-sm text-gray-500">
                        Play sounds for notifications
                      </p>
                    </div>
                    <Switch
                      checked={settings.soundEnabled}
                      onCheckedChange={(checked) =>
                        setSettings(prev => ({ ...prev, soundEnabled: checked }))
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Vibration</h4>
                      <p className="text-sm text-gray-500">
                        Vibrate for notifications on mobile devices
                      </p>
                    </div>
                    <Switch
                      checked={settings.vibrationEnabled}
                      onCheckedChange={(checked) =>
                        setSettings(prev => ({ ...prev, vibrationEnabled: checked }))
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
    </div>
  )
}
