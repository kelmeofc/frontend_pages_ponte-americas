"use client"

import { Globe } from "lucide-react"
import { cn } from "@/common/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface HeaderLanguageDropdownProps {
  className?: string
  variant?: "desktop" | "mobile"
}

export function HeaderLanguageDropdown({ 
  className, 
  variant = "desktop" 
}: HeaderLanguageDropdownProps) {
  if (variant === "mobile") {
    return (
      <div className={cn("flex items-center border border-gray-700 rounded-md px-3 py-2 bg-gray-900/50", className)}>
        <Globe className="h-5 w-5 mr-3 text-gray-400" />
        <select
          className="w-full bg-transparent text-white focus:outline-none"
          defaultValue="pt-BR"
        >
          <option value="pt-BR" className="bg-gray-900">PT</option>
        </select>
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center text-base font-normal text-white hover:text-primary">
          <Globe className="h-4 w-4 mr-1" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-fit text-center">
        <DropdownMenuItem className="text-center w-fit">
          Português
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
