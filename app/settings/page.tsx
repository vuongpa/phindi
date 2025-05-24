/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import {
    Archive,
    Bell,
    Camera,
    Download,
    Eye,
    EyeOff,
    Globe,
    Info,
    Lock,
    Mic,
    Monitor,
    RotateCcw,
    Save,
    Settings,
    Shield,
    Trash2,
    User,
    Volume2
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { ThemePreviewGrid } from "@/components/theme-preview"
import Link from "next/link"
import { useEffect, useState } from "react"

interface SettingsData {
  profile: {
    name: string
    username: string
    email: string
    bio: string
    phone: string
    avatar: string
  }
  notifications: {
    pushNotifications: boolean
    emailNotifications: boolean
    messageNotifications: boolean
    callNotifications: boolean
    groupNotifications: boolean
    soundEnabled: boolean
    vibrationEnabled: boolean
    doNotDisturbMode: boolean
    quietHours: {
      enabled: boolean
      start: string
      end: string
    }
  }
  privacy: {
    onlineStatus: boolean
    lastSeen: boolean
    readReceipts: boolean
    profilePhotoVisibility: "everyone" | "contacts" | "nobody"
    whoCanCallMe: "everyone" | "contacts" | "nobody"
    whoCanMessageMe: "everyone" | "contacts" | "nobody"
    blockedUsers: string[]
  }
  audio: {
    microphoneVolume: number[]
    speakerVolume: number[]
    echoCancellation: boolean
    noiseSuppression: boolean
    automaticGainControl: boolean
    defaultMicrophone: string
    defaultSpeaker: string
  }
  video: {
    cameraQuality: "720p" | "1080p" | "4k"
    defaultCamera: string
    backgroundBlur: boolean
    virtualBackground: boolean
    mirrorVideo: boolean
  }
  general: {
    language: string
    theme: "light" | "dark" | "system"
    fontSize: "small" | "medium" | "large"
    autoStart: boolean
    minimizeToTray: boolean
    closeToTray: boolean
    dataUsage: "high" | "medium" | "low"
  }
}

const defaultSettings: SettingsData = {
  profile: {
    name: "John Doe",
    username: "@johndoe",
    email: "john@example.com",
    bio: "Building amazing things with technology.",
    phone: "+1 (555) 123-4567",
    avatar: "/avatars/user.jpg"
  },
  notifications: {
    pushNotifications: true,
    emailNotifications: true,
    messageNotifications: true,
    callNotifications: true,
    groupNotifications: true,
    soundEnabled: true,
    vibrationEnabled: true,
    doNotDisturbMode: false,
    quietHours: {
      enabled: false,
      start: "22:00",
      end: "08:00"
    }
  },
  privacy: {
    onlineStatus: true,
    lastSeen: true,
    readReceipts: true,
    profilePhotoVisibility: "everyone",
    whoCanCallMe: "everyone",
    whoCanMessageMe: "everyone",
    blockedUsers: []
  },
  audio: {
    microphoneVolume: [80],
    speakerVolume: [70],
    echoCancellation: true,
    noiseSuppression: true,
    automaticGainControl: true,
    defaultMicrophone: "Default Microphone",
    defaultSpeaker: "Default Speaker"
  },
  video: {
    cameraQuality: "1080p",
    defaultCamera: "Default Camera",
    backgroundBlur: false,
    virtualBackground: false,
    mirrorVideo: true
  },
  general: {
    language: "en-US",
    theme: "system",
    fontSize: "medium",
    autoStart: false,
    minimizeToTray: true,
    closeToTray: false,
    dataUsage: "medium"
  }
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingsData>(defaultSettings)
  const [hasChanges, setHasChanges] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    // Load settings from localStorage or API
    const savedSettings = localStorage.getItem('phindi-settings')
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  const updateSettings = (section: keyof SettingsData, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }))
    setHasChanges(true)
  }

  const updateNestedSettings = (section: keyof SettingsData, nestedKey: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [nestedKey]: {
          ...(prev[section] as any)[nestedKey],
          [key]: value
        }
      }
    }))
    setHasChanges(true)
  }

  const saveSettings = () => {
    localStorage.setItem('phindi-settings', JSON.stringify(settings))
    setHasChanges(false)
    // Show success message
  }

  const resetSettings = () => {
    setSettings(defaultSettings)
    localStorage.removeItem('phindi-settings')
    setHasChanges(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 text-slate-900 dark:text-white hover:text-blue-600 transition-colors">
                <Settings className="h-6 w-6" />
                <h1 className="text-xl font-bold">Settings</h1>
              </Link>
            </div>

            <div className="flex items-center gap-2">
              {hasChanges && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2"
                >
                  <Badge variant="secondary" className="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
                    Unsaved changes
                  </Badge>
                  <Button size="sm" variant="outline" onClick={resetSettings}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                  <Button size="sm" onClick={saveSettings}>
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid grid-cols-2 lg:grid-cols-6 w-full lg:w-auto">
            <TabsTrigger value="profile" className="gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="gap-2">
              <Shield className="h-4 w-4" />
              Privacy
            </TabsTrigger>
            <TabsTrigger value="audio" className="gap-2">
              <Volume2 className="h-4 w-4" />
              Audio
            </TabsTrigger>
            <TabsTrigger value="video" className="gap-2">
              <Camera className="h-4 w-4" />
              Video
            </TabsTrigger>
            <TabsTrigger value="general" className="gap-2">
              <Monitor className="h-4 w-4" />
              General
            </TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
                <CardDescription>
                  Manage your personal information and profile settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <div className="relative">
                    <Avatar className="h-20 w-20 ring-4 ring-white dark:ring-slate-800 shadow-lg">
                      <AvatarImage src={settings.profile.avatar} alt={settings.profile.name} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xl">
                        {settings.profile.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0">
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Display Name</Label>
                        <Input
                          id="name"
                          value={settings.profile.name}
                          onChange={(e) => updateSettings('profile', 'name', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          value={settings.profile.username}
                          onChange={(e) => updateSettings('profile', 'username', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={settings.profile.email}
                          onChange={(e) => updateSettings('profile', 'email', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={settings.profile.phone}
                          onChange={(e) => updateSettings('profile', 'phone', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        placeholder="Tell us about yourself..."
                        value={settings.profile.bio}
                        onChange={(e) => updateSettings('profile', 'bio', e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Account Security</h3>
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="current-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter current password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        placeholder="Enter new password"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>
                  <Button variant="outline" className="gap-2">
                    <Lock className="h-4 w-4" />
                    Update Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Configure how and when you receive notifications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">General Notifications</h3>
                    {[
                      { key: 'pushNotifications', label: 'Push Notifications', description: 'Receive notifications on your device' },
                      { key: 'emailNotifications', label: 'Email Notifications', description: 'Get notified via email' },
                      { key: 'soundEnabled', label: 'Sound', description: 'Play notification sounds' },
                      { key: 'vibrationEnabled', label: 'Vibration', description: 'Vibrate for notifications' }
                    ].map(({ key, label, description }) => (
                      <div key={key} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                        <div>
                          <Label htmlFor={key} className="font-medium">{label}</Label>
                          <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
                        </div>
                        <Switch
                          id={key}
                          checked={(settings.notifications as any)[key]}
                          onCheckedChange={(checked) => updateSettings('notifications', key, checked)}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Message Types</h3>
                    {[
                      { key: 'messageNotifications', label: 'Messages', description: 'Direct messages and replies' },
                      { key: 'callNotifications', label: 'Calls', description: 'Incoming voice and video calls' },
                      { key: 'groupNotifications', label: 'Groups', description: 'Group messages and mentions' }
                    ].map(({ key, label, description }) => (
                      <div key={key} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                        <div>
                          <Label htmlFor={key} className="font-medium">{label}</Label>
                          <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
                        </div>
                        <Switch
                          id={key}
                          checked={(settings.notifications as any)[key]}
                          onCheckedChange={(checked) => updateSettings('notifications', key, checked)}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">Do Not Disturb</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Temporarily pause all notifications</p>
                    </div>
                    <Switch
                      checked={settings.notifications.doNotDisturbMode}
                      onCheckedChange={(checked) => updateSettings('notifications', 'doNotDisturbMode', checked)}
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="quiet-hours" className="font-medium">Quiet Hours</Label>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Automatically enable DND during specific hours</p>
                      </div>
                      <Switch
                        id="quiet-hours"
                        checked={settings.notifications.quietHours.enabled}
                        onCheckedChange={(checked) => updateNestedSettings('notifications', 'quietHours', 'enabled', checked)}
                      />
                    </div>
                    
                    {settings.notifications.quietHours.enabled && (
                      <div className="grid grid-cols-2 gap-4 ml-4">
                        <div className="space-y-2">
                          <Label htmlFor="quiet-start">Start Time</Label>
                          <Input
                            id="quiet-start"
                            type="time"
                            value={settings.notifications.quietHours.start}
                            onChange={(e) => updateNestedSettings('notifications', 'quietHours', 'start', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="quiet-end">End Time</Label>
                          <Input
                            id="quiet-end"
                            type="time"
                            value={settings.notifications.quietHours.end}
                            onChange={(e) => updateNestedSettings('notifications', 'quietHours', 'end', e.target.value)}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Settings */}
          <TabsContent value="privacy" className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privacy & Security
                </CardTitle>
                <CardDescription>
                  Control your privacy settings and who can contact you.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Visibility Settings</h3>
                  {[
                    { key: 'onlineStatus', label: 'Show Online Status', description: 'Let others see when you\'re online' },
                    { key: 'lastSeen', label: 'Show Last Seen', description: 'Let others see when you were last active' },
                    { key: 'readReceipts', label: 'Read Receipts', description: 'Let others know when you\'ve read their messages' }
                  ].map(({ key, label, description }) => (
                    <div key={key} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                      <div>
                        <Label htmlFor={key} className="font-medium">{label}</Label>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
                      </div>
                      <Switch
                        id={key}
                        checked={(settings.privacy as any)[key]}
                        onCheckedChange={(checked) => updateSettings('privacy', key, checked)}
                      />
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Contact Permissions</h3>
                  {[
                    { key: 'profilePhotoVisibility', label: 'Profile Photo Visibility', description: 'Who can see your profile photo' },
                    { key: 'whoCanCallMe', label: 'Who Can Call Me', description: 'Control who can call you' },
                    { key: 'whoCanMessageMe', label: 'Who Can Message Me', description: 'Control who can send you messages' }
                  ].map(({ key, label, description }) => (
                    <div key={key} className="space-y-2">
                      <Label className="font-medium">{label}</Label>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
                      <Select
                        value={(settings.privacy as any)[key]}
                        onValueChange={(value) => updateSettings('privacy', key, value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="everyone">Everyone</SelectItem>
                          <SelectItem value="contacts">My Contacts</SelectItem>
                          <SelectItem value="nobody">Nobody</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Blocked Users</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    You haven&apos;t blocked any users yet. Blocked users won&apos;t be able to contact you.
                  </p>
                  <Button variant="outline" className="gap-2">
                    <Info className="h-4 w-4" />
                    Manage Blocked Users
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Audio Settings */}
          <TabsContent value="audio" className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Volume2 className="h-5 w-5" />
                  Audio Settings
                </CardTitle>
                <CardDescription>
                  Configure your microphone and speaker settings for calls.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Volume Controls</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="flex items-center gap-2">
                            <Mic className="h-4 w-4" />
                            Microphone Volume
                          </Label>
                          <span className="text-sm text-slate-500">{settings.audio.microphoneVolume[0]}%</span>
                        </div>
                        <Slider
                          value={settings.audio.microphoneVolume}
                          onValueChange={(value) => updateSettings('audio', 'microphoneVolume', value)}
                          max={100}
                          step={1}
                          className="w-full"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="flex items-center gap-2">
                            <Volume2 className="h-4 w-4" />
                            Speaker Volume
                          </Label>
                          <span className="text-sm text-slate-500">{settings.audio.speakerVolume[0]}%</span>
                        </div>
                        <Slider
                          value={settings.audio.speakerVolume}
                          onValueChange={(value) => updateSettings('audio', 'speakerVolume', value)}
                          max={100}
                          step={1}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Audio Devices</h3>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label>Default Microphone</Label>
                        <Select
                          value={settings.audio.defaultMicrophone}
                          onValueChange={(value) => updateSettings('audio', 'defaultMicrophone', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Default Microphone">Default Microphone</SelectItem>
                            <SelectItem value="Built-in Microphone">Built-in Microphone</SelectItem>
                            <SelectItem value="External Microphone">External Microphone</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Default Speaker</Label>
                        <Select
                          value={settings.audio.defaultSpeaker}
                          onValueChange={(value) => updateSettings('audio', 'defaultSpeaker', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Default Speaker">Default Speaker</SelectItem>
                            <SelectItem value="Built-in Speakers">Built-in Speakers</SelectItem>
                            <SelectItem value="Headphones">Headphones</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Audio Processing</h3>
                  {[
                    { key: 'echoCancellation', label: 'Echo Cancellation', description: 'Reduce echo during calls' },
                    { key: 'noiseSuppression', label: 'Noise Suppression', description: 'Filter out background noise' },
                    { key: 'automaticGainControl', label: 'Automatic Gain Control', description: 'Automatically adjust microphone volume' }
                  ].map(({ key, label, description }) => (
                    <div key={key} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                      <div>
                        <Label htmlFor={key} className="font-medium">{label}</Label>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
                      </div>
                      <Switch
                        id={key}
                        checked={(settings.audio as any)[key]}
                        onCheckedChange={(checked) => updateSettings('audio', key, checked)}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Video Settings */}
          <TabsContent value="video" className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Video Settings
                </CardTitle>
                <CardDescription>
                  Configure your camera and video call preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Camera Settings</h3>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label>Default Camera</Label>
                        <Select
                          value={settings.video.defaultCamera}
                          onValueChange={(value) => updateSettings('video', 'defaultCamera', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Default Camera">Default Camera</SelectItem>
                            <SelectItem value="Built-in Camera">Built-in Camera</SelectItem>
                            <SelectItem value="External Camera">External Camera</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Video Quality</Label>
                        <Select
                          value={settings.video.cameraQuality}
                          onValueChange={(value) => updateSettings('video', 'cameraQuality', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="720p">720p (HD)</SelectItem>
                            <SelectItem value="1080p">1080p (Full HD)</SelectItem>
                            <SelectItem value="4k">4K (Ultra HD)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Video Effects</h3>
                    {[
                      { key: 'backgroundBlur', label: 'Background Blur', description: 'Blur your background during calls' },
                      { key: 'virtualBackground', label: 'Virtual Background', description: 'Use custom backgrounds' },
                      { key: 'mirrorVideo', label: 'Mirror Video', description: 'Mirror your video preview' }
                    ].map(({ key, label, description }) => (
                      <div key={key} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                        <div>
                          <Label htmlFor={key} className="font-medium">{label}</Label>
                          <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
                        </div>
                        <Switch
                          id={key}
                          checked={(settings.video as any)[key]}
                          onCheckedChange={(checked) => updateSettings('video', key, checked)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="h-5 w-5" />
                  General Settings
                </CardTitle>
                <CardDescription>
                  Configure general application preferences and behavior.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Appearance</h3>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label>Theme Preference</Label>
                        <div className="flex items-center justify-between p-3 border rounded-lg bg-card">
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Choose your preferred theme</p>
                            <p className="text-xs text-muted-foreground">
                              System will automatically switch between light and dark based on your OS preference
                            </p>
                          </div>
                          <ThemeToggle variant="full" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Theme Preview</Label>
                        <ThemePreviewGrid />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Font Size</Label>
                        <Select
                          value={settings.general.fontSize}
                          onValueChange={(value) => updateSettings('general', 'fontSize', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="small">Small</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="large">Large</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Language</Label>
                        <Select
                          value={settings.general.language}
                          onValueChange={(value) => updateSettings('general', 'language', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en-US">
                              <div className="flex items-center gap-2">
                                <Globe className="h-4 w-4" />
                                English (US)
                              </div>
                            </SelectItem>
                            <SelectItem value="es-ES">Español</SelectItem>
                            <SelectItem value="fr-FR">Français</SelectItem>
                            <SelectItem value="de-DE">Deutsch</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Application Behavior</h3>
                    {[
                      { key: 'autoStart', label: 'Auto Start', description: 'Start Phindi when your computer starts' },
                      { key: 'minimizeToTray', label: 'Minimize to Tray', description: 'Minimize to system tray instead of taskbar' },
                      { key: 'closeToTray', label: 'Close to Tray', description: 'Keep running in system tray when closed' }
                    ].map(({ key, label, description }) => (
                      <div key={key} className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-900/50 rounded-lg">
                        <div>
                          <Label htmlFor={key} className="font-medium">{label}</Label>
                          <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
                        </div>
                        <Switch
                          id={key}
                          checked={(settings.general as any)[key]}
                          onCheckedChange={(checked) => updateSettings('general', key, checked)}
                        />
                      </div>
                    ))}

                    <div className="space-y-2">
                      <Label>Data Usage</Label>
                      <Select
                        value={settings.general.dataUsage}
                        onValueChange={(value) => updateSettings('general', 'dataUsage', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low (Save data)</SelectItem>
                          <SelectItem value="medium">Medium (Balanced)</SelectItem>
                          <SelectItem value="high">High (Best quality)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Data Management</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Button variant="outline" className="gap-2">
                      <Download className="h-4 w-4" />
                      Export Data
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Archive className="h-4 w-4" />
                      Clear Cache
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="gap-2">
                          <Trash2 className="h-4 w-4" />
                          Delete Account
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove all your data from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                            Delete Account
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
