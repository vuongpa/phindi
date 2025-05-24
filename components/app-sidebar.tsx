"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Bell,
  LogOut,
  MessageCircle,
  Settings,
  User,
  Users,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

// Navigation items for the app sidebar
const navItems = [
  {
    title: "Messages",
    url: "/",
    icon: MessageCircle,
    badge: "3",
  },
  {
    title: "Contacts",
    url: "/contacts",
    icon: Users,
    badge: "12",
  },
];

export function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (url: string) => {
    router.push(url);
  };

  return (
    <div className="w-20 border-r border-border bg-card shadow-sm flex flex-col h-screen">
      {/* App Logo */}
      <div className="p-3 border-b border-border bg-card flex justify-center">
        <div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white">
          <MessageCircle className="size-5" />
        </div>
      </div>

      {/* Navigation Icons */}
      <div className="flex-1 p-2">
        <div className="space-y-2">
          {navItems.map((item) => (
            <TooltipProvider key={item.title}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={pathname === item.url ? "secondary" : "ghost"}
                    onClick={() => handleNavigation(item.url)}
                    className="w-full h-12 p-0 relative"
                    size="sm"
                  >
                    <item.icon className="!h-5 !w-5" />
                    {item.badge && (
                      <Badge
                        variant="destructive"
                        className="absolute -top-1 -right-1 h-5 w-5 justify-center rounded-full p-0 text-xs"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{item.title}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>

      {/* Theme Toggle & User Profile */}
      <div className="p-2 border-t border-border space-y-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full h-12 p-0">
              <Avatar>
                <AvatarImage
                  src="https://avatar.vercel.sh/you"
                  alt="Your avatar"
                />
                <AvatarFallback className="rounded-lg">JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="end" className="w-56">
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src="https://avatar.vercel.sh/you"
                    alt="Your avatar"
                  />
                  <AvatarFallback className="rounded-lg">JD</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">John Doe</span>
                  <span className="truncate text-xs text-muted-foreground">
                    john@example.com
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleNavigation("/profile")}>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleNavigation("/settings")}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleNavigation("/notifications")}
            >
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
