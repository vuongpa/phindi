"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Check,
  CheckCheck,
  Copy,
  Forward,
  Mic,
  MoreVertical,
  Paperclip,
  Phone,
  Pin,
  Plus,
  Reply,
  Search,
  Send,
  Smile,
  Trash2,
  Video
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

interface Message {
  id: string;
  text: string;
  sender: "me" | "other";
  timestamp: Date;
  type: "text" | "image" | "file";
  status?: "sent" | "delivered" | "read";
  reactions?: string[];
}

interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
  status?: string;
}



const contacts: Contact[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "/avatars/sarah.jpg",
    lastMessage: "Hey! How are you doing today?",
    timestamp: "2m ago",
    unread: 2,
    online: true,
  },
  {
    id: "2",
    name: "Mike Chen",
    avatar: "/avatars/mike.jpg",
    lastMessage: "Can we schedule a call for tomorrow?",
    timestamp: "1h ago",
    unread: 0,
    online: true,
  },
  {
    id: "3",
    name: "Emily Davis",
    avatar: "/avatars/emily.jpg",
    lastMessage: "Thanks for your help!",
    timestamp: "3h ago",
    unread: 1,
    online: false,
  },
];

const initialMessages: Message[] = [
  {
    id: "1",
    text: "Hey! How are you doing today?",
    sender: "other",
    timestamp: new Date(Date.now() - 120000),
    type: "text",
  },
  {
    id: "2",
    text: "I'm doing great! Just working on some new projects. How about you?",
    sender: "me",
    timestamp: new Date(Date.now() - 60000),
    type: "text",
  },
  {
    id: "3",
    text: "That sounds exciting! I'd love to hear more about it.",
    sender: "other",
    timestamp: new Date(Date.now() - 30000),
    type: "text",
  },
];

export default function ChatPage() {
  const [selectedContact, setSelectedContact] = useState<Contact>(contacts[0]);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage,
        sender: "me",
        timestamp: new Date(),
        type: "text",
        status: "sent",
      };
      setMessages((prev) => [...prev, message]);
      setNewMessage("");

      // Simulate message status updates
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === message.id ? { ...m, status: "delivered" } : m
          )
        );
      }, 1000);

      setTimeout(() => {
        setMessages((prev) =>
          prev.map((m) => (m.id === message.id ? { ...m, status: "read" } : m))
        );
      }, 2000);

      // Simulate typing indicator
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        // Simulate reply
        const reply: Message = {
          id: (Date.now() + 1).toString(),
          text: "Thanks for your message! I'll get back to you soon.",
          sender: "other",
          timestamp: new Date(),
          type: "text",
        };
        setMessages((prev) => [...prev, reply]);
      }, 3000);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Filter contacts based on active tab
  const filteredContacts = contacts.filter((contact) => {
    switch (activeTab) {
      case "unread":
        return contact.unread > 0;
      case "groups":
        return false; // For now, no groups
      default:
        return true;
    }
  });

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex">
          {/* Chat List Sidebar */}
          <div className="w-80 border-r border-border bg-card shadow-sm flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-border bg-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-semibold text-foreground">
                    Chats
                  </h1>
                  <Badge
                    variant="outline"
                    className="bg-muted text-xs border-border text-muted-foreground"
                  >
                    {filteredContacts.length}
                  </Badge>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent rounded-full transition-colors"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent rounded-full transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent rounded-full transition-colors"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-3">
                <TabsList className="grid w-full grid-cols-3 bg-muted p-1 rounded-lg">
                  <TabsTrigger 
                    value="all" 
                    className="text-xs data-[state=active]:bg-background data-[state=active]:text-foreground"
                  >
                    Tất cả
                  </TabsTrigger>
                  <TabsTrigger 
                    value="unread" 
                    className="text-xs data-[state=active]:bg-background data-[state=active]:text-foreground"
                  >
                    Chưa đọc
                  </TabsTrigger>
                  <TabsTrigger 
                    value="groups" 
                    className="text-xs data-[state=active]:bg-background data-[state=active]:text-foreground"
                  >
                    Phân loại
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Chat List */}
            <ScrollArea className="flex-1 py-2">
              <div className="px-2">
                {filteredContacts.length > 0 ? (
                  filteredContacts.map((contact) => (
                    <div
                      key={contact.id}
                      className={`p-3 mb-1 cursor-pointer transition-colors rounded-lg flex items-center gap-3 ${
                        selectedContact.id === contact.id
                          ? "bg-muted"
                          : "hover:bg-muted"
                      }`}
                      onClick={() => setSelectedContact(contact)}
                    >
                      <div className="relative">
                        <Avatar className="h-12 w-12 border border-border">
                          <AvatarImage src={contact.avatar} alt={contact.name} />
                          <AvatarFallback className="bg-muted text-foreground">
                            {contact.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {contact.online && (
                          <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-background" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-sm truncate text-foreground">
                            {contact.name}
                          </h3>
                          <span className="text-xs text-muted-foreground">
                            {contact.timestamp}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-xs  text-muted-foreground truncate">
                            {contact.lastMessage}
                          </p>
                          {contact.unread > 0 && (
                            <span className="bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center ml-2">
                              {contact.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="text-muted-foreground text-sm">
                      {activeTab === "unread" 
                        ? "Không có tin nhắn chưa đọc" 
                        : activeTab === "groups"
                        ? "Chưa có nhóm nào"
                        : "Không có cuộc trò chuyện"
                      }
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-border bg-background flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={selectedContact.avatar}
                    alt={selectedContact.name}
                  />
                  <AvatarFallback>
                    {selectedContact.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold text-foreground">
                    {selectedContact.name}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {selectedContact.online ? "Online" : "Last seen 2h ago"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  asChild
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent rounded-full"
                >
                  <Link href="/voice-call">
                    <Phone className="!size-5" />
                  </Link>
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  asChild
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent rounded-full"
                >
                  <Link href="/video-call">
                    <Video className="!size-5" />
                  </Link>
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent rounded-full"
                >
                  <Search className="!size-5" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent rounded-full"
                    >
                      <MoreVertical className="!size-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="bg-popover border-border text-popover-foreground"
                  >
                    <DropdownMenuItem className="hover:bg-accent focus:bg-accent">
                      View Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-accent focus:bg-accent">
                      Mute Notifications
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-accent focus:bg-accent">
                      Block User
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4 bg-background">
              <div className="space-y-4">
                {messages.map((message) => (
                  <ContextMenu key={message.id}>
                  <ContextMenuTrigger>
                    <div
                      className={`flex ${
                        message.sender === "me"
                          ? "justify-end"
                          : "justify-start"
                      } group`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 relative ${
                          message.sender === "me"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-foreground"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <div className="flex items-center justify-between mt-1">
                          <p
                            className={`text-xs ${
                              message.sender === "me"
                                ? "text-primary-foreground/70"
                                : "text-muted-foreground"
                            }`}
                          >
                            {formatTime(message.timestamp)}
                          </p>
                          {message.sender === "me" && (
                            <div className="flex items-center gap-1">
                              {message.status === "read" ? (
                                <CheckCheck className="h-3 w-3 text-primary-foreground/70" />
                              ) : message.status === "delivered" ? (
                                <CheckCheck className="h-3 w-3 text-primary-foreground/70" />
                              ) : (
                                <Check className="h-3 w-3 text-primary-foreground/70" />
                              )}
                            </div>
                          )}
                        </div>

                        {/* Message reactions */}
                        {message.reactions && message.reactions.length > 0 && (
                          <div className="flex gap-1 mt-2">
                            {message.reactions.map((reaction, index) => (
                              <span
                                key={index}
                                className="text-xs bg-background/80 rounded-full px-2 py-1"
                              >
                                {reaction}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </ContextMenuTrigger>
                  <ContextMenuContent className="bg-popover border-border text-popover-foreground">
                    <ContextMenuItem className="hover:bg-accent focus:bg-accent">
                      <Reply className="h-4 w-4 mr-2" />
                      Reply
                    </ContextMenuItem>
                    <ContextMenuItem className="hover:bg-accent focus:bg-accent">
                      <Forward className="h-4 w-4 mr-2" />
                      Forward
                    </ContextMenuItem>
                    <ContextMenuItem className="hover:bg-accent focus:bg-accent">
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </ContextMenuItem>
                    <ContextMenuItem className="hover:bg-accent focus:bg-accent">
                      <Pin className="h-4 w-4 mr-2" />
                      Pin Message
                    </ContextMenuItem>
                    {message.sender === "me" && (
                      <ContextMenuItem className="text-destructive hover:bg-accent focus:bg-accent">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </ContextMenuItem>
                    )}
                  </ContextMenuContent>
                </ContextMenu>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />

              {/* Call Notification - Similar to the one in the image */}
              <div className="fixed bottom-20 right-4 bg-primary text-primary-foreground rounded-lg shadow-lg p-4 w-64">
                <div className="flex flex-col">
                  <div className="text-center mb-2">
                    <p className="text-sm font-medium">Cuộc gọi thoại đi</p>
                    <p className="text-xs text-primary-foreground/70">
                      0 phút 19 giây
                    </p>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90 w-full">
                    Gọi lại
                  </Button>
                </div>
              </div>
            </div>
          </ScrollArea>

          {/* Enhanced Message Input */}
          <div className="p-4 border-t border-border bg-background">
            <div className="flex items-end gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-10 w-10 p-0 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md"
                    >
                      <Paperclip className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Attach file</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <div className="flex-1 relative">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  className="pr-20 min-h-[40px] bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-1 focus:ring-ring"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                        >
                          <Smile className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Add emoji</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                        >
                          <Mic className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Voice message</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={sendMessage}
                      disabled={!newMessage.trim()}
                      className="h-10 w-10 p-0 bg-primary hover:bg-primary/90 text-primary-foreground disabled:bg-primary/50 disabled:text-primary-foreground/50"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Send message</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
