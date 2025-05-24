"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion } from "framer-motion"
import { Archive, Edit, Filter, MessageSquare, MoreHorizontal, Phone, Search, Star, UserPlus, Users, UserX, Video } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

interface Contact {
  id: string
  name: string
  username: string
  avatar: string
  status: "online" | "away" | "busy" | "offline"
  lastSeen: Date
  isStarred: boolean
  phone?: string
  email?: string
  bio?: string
  mutualFriends?: number
}

const contacts: Contact[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    username: "@sarah.j",
    avatar: "/avatars/sarah.jpg",
    status: "online",
    lastSeen: new Date(),
    isStarred: true,
    phone: "+1 (555) 123-4567",
    email: "sarah@example.com",
    bio: "Product Designer at Tech Corp. Love creating beautiful experiences!",
    mutualFriends: 12
  },
  {
    id: "2",
    name: "Mike Chen",
    username: "@mike.dev",
    avatar: "/avatars/mike.jpg",
    status: "away",
    lastSeen: new Date(Date.now() - 15 * 60 * 1000),
    isStarred: false,
    phone: "+1 (555) 987-6543",
    email: "mike@example.com",
    bio: "Full-stack developer. Building the future, one line of code at a time.",
    mutualFriends: 8
  },
  {
    id: "3",
    name: "Emily Davis",
    username: "@emily_d",
    avatar: "/avatars/emily.jpg",
    status: "busy",
    lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000),
    isStarred: true,
    phone: "+1 (555) 456-7890",
    email: "emily@example.com",
    bio: "Marketing lead with a passion for growth and innovation.",
    mutualFriends: 15
  },
  {
    id: "4",
    name: "Alex Thompson",
    username: "@alex.t",
    avatar: "/avatars/alex.jpg",
    status: "offline",
    lastSeen: new Date(Date.now() - 24 * 60 * 60 * 1000),
    isStarred: false,
    phone: "+1 (555) 321-0987",
    email: "alex@example.com",
    bio: "Data scientist and AI enthusiast. Always exploring new possibilities.",
    mutualFriends: 6
  },
  {
    id: "5",
    name: "Jessica Liu",
    username: "@jess.liu",
    avatar: "/avatars/jessica.jpg",
    status: "online",
    lastSeen: new Date(),
    isStarred: true,
    phone: "+1 (555) 654-3210",
    email: "jessica@example.com",
    bio: "UX researcher focused on human-centered design.",
    mutualFriends: 10
  },
  {
    id: "6",
    name: "David Rodriguez",
    username: "@david.r",
    avatar: "/avatars/david.jpg",
    status: "away",
    lastSeen: new Date(Date.now() - 45 * 60 * 1000),
    isStarred: false,
    phone: "+1 (555) 789-0123",
    email: "david@example.com",
    bio: "Project manager keeping teams aligned and projects on track.",
    mutualFriends: 9
  }
]

const getStatusColor = (status: Contact["status"]) => {
  switch (status) {
    case "online": return "bg-green-500"
    case "away": return "bg-yellow-500"
    case "busy": return "bg-red-500"
    case "offline": return "bg-gray-400"
  }
}

const getStatusText = (status: Contact["status"]) => {
  switch (status) {
    case "online": return "Online"
    case "away": return "Away"
    case "busy": return "Busy"
    case "offline": return "Offline"
  }
}

const formatLastSeen = (date: Date) => {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (minutes < 1) return "Just now"
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  return `${days}d ago`
}

export default function ContactsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTab, setSelectedTab] = useState("all")
  const [isAddContactOpen, setIsAddContactOpen] = useState(false)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [filteredContacts, setFilteredContacts] = useState(contacts)

  useEffect(() => {
    let filtered = contacts

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(contact =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by tab
    switch (selectedTab) {
      case "online":
        filtered = filtered.filter(contact => contact.status === "online")
        break
      case "starred":
        filtered = filtered.filter(contact => contact.isStarred)
        break
      case "all":
      default:
        break
    }

    setFilteredContacts(filtered)
  }, [searchQuery, selectedTab])

  const handleStarToggle = (contactId: string) => {
    setFilteredContacts(prev =>
      prev.map(contact =>
        contact.id === contactId
          ? { ...contact, isStarred: !contact.isStarred }
          : contact
      )
    )
  }

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 text-slate-900 dark:text-white hover:text-blue-600 transition-colors">
                <Users className="h-6 w-6" />
                <h1 className="text-xl font-bold">Contacts</h1>
              </Link>
              <Badge variant="secondary" className="hidden sm:flex">
                {filteredContacts.length} contacts
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              <Dialog open={isAddContactOpen} onOpenChange={setIsAddContactOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="gap-2">
                    <UserPlus className="h-4 w-4" />
                    Add Contact
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Contact</DialogTitle>
                    <DialogDescription>
                      Enter the details to add a new contact to your list.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input id="name" placeholder="John Doe" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        Username
                      </Label>
                      <Input id="username" placeholder="@johndoe" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">
                        Email
                      </Label>
                      <Input id="email" type="email" placeholder="john@example.com" className="col-span-3" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddContactOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsAddContactOpen(false)}>
                      Add Contact
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Sort by Name</DropdownMenuItem>
                  <DropdownMenuItem>Sort by Status</DropdownMenuItem>
                  <DropdownMenuItem>Sort by Last Seen</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Export Contacts</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Contacts List */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <Input
                      placeholder="Search contacts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-white/50 dark:bg-slate-900/50"
                    />
                  </div>
                  <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full sm:w-auto">
                    <TabsList className="grid grid-cols-3 w-full sm:w-auto">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="online">Online</TabsTrigger>
                      <TabsTrigger value="starred">Starred</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                <ScrollArea className="h-[600px]">
                  <div className="space-y-1 p-4">
                    {filteredContacts.map((contact, index) => (
                      <motion.div
                        key={contact.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Card 
                          className="p-4 hover:shadow-md transition-all duration-200 cursor-pointer border-slate-200/50 dark:border-slate-700/50 hover:border-blue-300 dark:hover:border-blue-600 bg-gradient-to-r from-white to-slate-50 dark:from-slate-800 dark:to-slate-750"
                          onClick={() => setSelectedContact(contact)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="relative">
                                <Avatar className="h-12 w-12 ring-2 ring-white dark:ring-slate-800">
                                  <AvatarImage src={contact.avatar} alt={contact.name} />
                                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                                    {contact.name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <div className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white dark:border-slate-800 ${getStatusColor(contact.status)}`} />
                              </div>
                              
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold text-slate-900 dark:text-white">
                                    {contact.name}
                                  </h3>
                                  {contact.isStarred && (
                                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                  )}
                                </div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                  {contact.username}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge 
                                    variant="secondary" 
                                    className={`text-xs px-2 py-0 ${
                                      contact.status === 'online' 
                                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                                        : contact.status === 'away'
                                        ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                        : contact.status === 'busy'
                                        ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                        : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                                    }`}
                                  >
                                    {getStatusText(contact.status)}
                                  </Badge>
                                  <span className="text-xs text-slate-400">
                                    {contact.status === 'online' ? 'Active now' : formatLastSeen(contact.lastSeen)}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-1">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        // Handle chat action
                                      }}
                                    >
                                      <MessageSquare className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent><p>Chat</p></TooltipContent>
                                </Tooltip>
                              </TooltipProvider>

                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0 hover:bg-green-100 dark:hover:bg-green-900/30"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        // Handle call action
                                      }}
                                    >
                                      <Phone className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent><p>Call</p></TooltipContent>
                                </Tooltip>
                              </TooltipProvider>

                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0 hover:bg-purple-100 dark:hover:bg-purple-900/30"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        // Handle video call action
                                      }}
                                    >
                                      <Video className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent><p>Video Call</p></TooltipContent>
                                </Tooltip>
                              </TooltipProvider>

                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-8 w-8 p-0"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handleStarToggle(contact.id)}>
                                    <Star className="h-4 w-4 mr-2" />
                                    {contact.isStarred ? 'Remove Star' : 'Add Star'}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit Contact
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Archive className="h-4 w-4 mr-2" />
                                    Archive
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">
                                    <UserX className="h-4 w-4 mr-2" />
                                    Remove Contact
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Contact Details Sidebar */}
          <div className="lg:col-span-1">
            {selectedContact ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="shadow-lg border-0 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <div className="relative inline-block">
                        <Avatar className="h-20 w-20 mx-auto ring-4 ring-white dark:ring-slate-800 shadow-lg">
                          <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xl">
                            {selectedContact.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 h-6 w-6 rounded-full border-3 border-white dark:border-slate-800 ${getStatusColor(selectedContact.status)}`} />
                      </div>
                      
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-4">
                        {selectedContact.name}
                      </h2>
                      <p className="text-slate-600 dark:text-slate-400">
                        {selectedContact.username}
                      </p>
                      
                      <Badge 
                        variant="secondary" 
                        className={`mt-2 ${
                          selectedContact.status === 'online' 
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                            : selectedContact.status === 'away'
                            ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                            : selectedContact.status === 'busy'
                            ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                            : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                        }`}
                      >
                        {getStatusText(selectedContact.status)}
                      </Badge>
                    </div>

                    <div className="space-y-4">
                      <div className="flex flex-col gap-2">
                        <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Bio</Label>
                        <p className="text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg">
                          {selectedContact.bio || "No bio available"}
                        </p>
                      </div>

                      <Separator />

                      <div className="space-y-3">
                        {selectedContact.email && (
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                              <span className="text-blue-600 dark:text-blue-400 text-sm font-semibold">@</span>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500 dark:text-slate-400">Email</p>
                              <p className="text-sm text-slate-900 dark:text-white">{selectedContact.email}</p>
                            </div>
                          </div>
                        )}

                        {selectedContact.phone && (
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                              <Phone className="h-4 w-4 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                              <p className="text-xs text-slate-500 dark:text-slate-400">Phone</p>
                              <p className="text-sm text-slate-900 dark:text-white">{selectedContact.phone}</p>
                            </div>
                          </div>
                        )}

                        {selectedContact.mutualFriends && (
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                              <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                              <p className="text-xs text-slate-500 dark:text-slate-400">Mutual Friends</p>
                              <p className="text-sm text-slate-900 dark:text-white">{selectedContact.mutualFriends} friends</p>
                            </div>
                          </div>
                        )}
                      </div>

                      <Separator />

                      <div className="flex flex-col gap-2">
                        <Button className="w-full gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" asChild>
                          <Link href="/chat">
                            <MessageSquare className="h-4 w-4" />
                            Send Message
                          </Link>
                        </Button>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <Button variant="outline" className="gap-2" asChild>
                            <Link href="/voice-call">
                              <Phone className="h-4 w-4" />
                              Call
                            </Link>
                          </Button>
                          <Button variant="outline" className="gap-2" asChild>
                            <Link href="/video-call">
                              <Video className="h-4 w-4" />
                              Video
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <Card className="shadow-lg border-0 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    Select a Contact
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    Choose a contact from the list to view their details and start a conversation.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
