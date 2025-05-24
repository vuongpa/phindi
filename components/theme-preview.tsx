"use client"

import { useTheme } from "@/components/theme-provider"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ThemePreviewProps {
  theme: "light" | "dark"
  isActive?: boolean
  onClick?: () => void
}

export function ThemePreview({ theme, isActive, onClick }: ThemePreviewProps) {
  return (
    <Card 
      className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
        isActive ? 'ring-2 ring-primary' : ''
      } ${theme === 'dark' ? 'dark' : ''}`}
      onClick={onClick}
    >
      <div className={`${theme === 'dark' ? 'dark' : ''}`}>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-primary" />
            {theme === 'dark' ? 'Dark' : 'Light'} Theme
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Sidebar Preview */}
          <div className="flex gap-2">
            <div className="w-16 h-20 bg-sidebar rounded border border-sidebar-border p-2">
              <div className="space-y-1">
                <div className="h-2 bg-sidebar-primary rounded" />
                <div className="h-1.5 bg-sidebar-accent rounded" />
                <div className="h-1.5 bg-sidebar-accent/50 rounded" />
              </div>
            </div>
            
            {/* Chat Preview */}
            <div className="flex-1 bg-background border border-border rounded p-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Avatar className="h-4 w-4">
                    <AvatarFallback className="text-xs bg-muted">A</AvatarFallback>
                  </Avatar>
                  <div className="h-1.5 bg-foreground/80 rounded w-8" />
                </div>
                
                <div className="space-y-1">
                  <div className="bg-muted p-2 rounded-lg text-xs">
                    <div className="h-1 bg-muted-foreground/60 rounded w-12 mb-1" />
                    <div className="h-1 bg-muted-foreground/40 rounded w-8" />
                  </div>
                  
                  <div className="bg-primary p-2 rounded-lg ml-6">
                    <div className="h-1 bg-primary-foreground/80 rounded w-10 mb-1" />
                    <div className="h-1 bg-primary-foreground/60 rounded w-6" />
                  </div>
                </div>
                
                <div className="flex items-center gap-1 pt-1">
                  <div className="h-1.5 bg-input rounded flex-1" />
                  <div className="h-1.5 w-1.5 bg-primary rounded" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Components Preview */}
          <div className="grid grid-cols-2 gap-2">
            <Button size="sm" className="h-6 text-xs">
              Primary
            </Button>
            <Badge variant="outline" className="justify-center text-xs">
              Badge
            </Badge>
          </div>
          
          {isActive && (
            <div className="flex items-center justify-center pt-2">
              <Badge className="text-xs">
                Currently Active
              </Badge>
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  )
}

export function ThemePreviewGrid() {
  const { setTheme, resolvedTheme } = useTheme()
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ThemePreview 
        theme="light" 
        isActive={resolvedTheme === "light"}
        onClick={() => setTheme("light")}
      />
      <ThemePreview 
        theme="dark" 
        isActive={resolvedTheme === "dark"}
        onClick={() => setTheme("dark")}
      />
    </div>
  )
}
