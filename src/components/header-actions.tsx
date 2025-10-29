"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { PrimaryButton } from "@/components/primary-button"
import { ThemeToggle } from "@/components/theme-toggle"
import { HeaderLanguageDropdown } from "./header-language-dropdown"

interface HeaderActionsProps {
  variant?: "desktop" | "mobile"
}

export function HeaderActions({ 
  variant = "desktop", 
}: HeaderActionsProps) {
  if (variant === "mobile") {
    return (
      <div className="space-y-4">
    
          <PrimaryButton 
            className="w-full" 
            variant="outline" 
            size="lg"
            icon={<ArrowRight className="h-5 w-5" />}
            href="/coming-soon"
          >
            JÁ SOU ALUNO
          </PrimaryButton>
        

          <PrimaryButton
            icon={<ArrowRight className="h-5 w-5" />}
            className="w-full"
            href="/coming-soon"
            size="lg"
          >
            COMEÇAR AGORA
          </PrimaryButton>
      
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-3">
      <ThemeToggle />
      <HeaderLanguageDropdown variant="desktop" />
      
   
        <PrimaryButton
          href="/coming-soon"
          icon={<ArrowRight className="h-4 w-4" />}
          size="sm"
          variant="outline"
          className="px-3 whitespace-nowrap"
        >
          JÁ SOU ALUNO
        </PrimaryButton>
   

   
        <PrimaryButton
          icon={<ArrowRight className="h-4 w-4" />}
          size="sm"
          href="/coming-soon"
          className="px-3 whitespace-nowrap"
        >
          COMEÇAR AGORA
        </PrimaryButton>
  
    </div>
  )
}
