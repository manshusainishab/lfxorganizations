import type { JSX } from "react"
import { Moon, Sun, Sparkles, TrendingUp, Users } from "lucide-react"
import { useTheme } from "next-themes"
import type { HeaderProps } from '../types/index'

export function Header({ title = "LFX Organizations" }: HeaderProps): JSX.Element {
  const { theme, setTheme } = useTheme()

  const toggleTheme = (): void => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-linear-to-r from-background via-background to-background/95 backdrop-blur-xl supports-backdrop-filter:bg-background/80">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-blue-500/5 via-cyan-500/5 to-purple-500/5 animate-pulse opacity-50" />
      
      <div className="relative px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left section - Logo and Title */}
          <div className="flex items-center gap-3 sm:gap-4 group">
            {/* Animated logo */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all group-hover:scale-105">
                <span className="text-white font-bold text-base sm:text-lg tracking-tight">LFX</span>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-background animate-pulse" />
              </div>
            </div>

            {/* Title with gradient */}
            <div className="flex flex-col">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:via-cyan-500 group-hover:to-purple-500 transition-all duration-300">
                {title}
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Open Source Intelligence Platform
              </p>
            </div>
          </div>

          {/* Right section - Stats and Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Quick stats - hidden on mobile */}
            <div className="hidden lg:flex items-center gap-4 mr-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/15 transition-colors">
                <Users className="h-4 w-4 text-blue-500" />
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-foreground">234</span>
                  <span className="text-[10px] text-muted-foreground">Orgs</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/15 transition-colors">
                <TrendingUp className="h-4 w-4 text-emerald-500" />
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-foreground">12.4K</span>
                  <span className="text-[10px] text-muted-foreground">Active</span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-8 bg-border/50" />

            {/* Premium badge */}
            <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 hover:from-amber-500/15 hover:to-orange-500/15 transition-all hover:scale-105">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span className="text-xs font-semibold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                Pro
              </span>
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="relative p-2 rounded-lg bg-muted/50 hover:bg-muted transition-all hover:scale-105 border border-border/50 group"
              aria-label="Toggle theme"
            >
              <Sun className="h-5 w-5 text-amber-500 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 group-hover:text-amber-600" />
              <Moon className="absolute top-2 left-2 h-5 w-5 text-blue-400 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 group-hover:text-blue-300" />
              <span className="sr-only">Toggle theme</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
    </header>
  )
}