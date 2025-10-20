"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { PrimaryButton } from "@/components/primary-button"
import { ThemeToggle } from "@/components/theme-toggle"
import { HeaderLanguageDropdown } from "./header-language-dropdown"

interface HeaderActionsProps {
  variant?: "desktop" | "mobile"
  onLinkClick?: () => void
}

export function HeaderActions({ 
  variant = "desktop", 
  onLinkClick
}: HeaderActionsProps) {
  if (variant === "mobile") {
    return (
      <div className="space-y-4">
        <Link
          href="/coming-soon"
          onClick={onLinkClick}
          className="block"
        >
          <PrimaryButton 
            className="w-full" 
            variant="outline" 
            size="lg"
            icon={<ArrowRight className="h-5 w-5" />}
          >
            JÁ SOU ALUNO
          </PrimaryButton>
        </Link>

        <Link
          href="/coming-soon"
          onClick={onLinkClick}
          className="block"
        >
          <PrimaryButton
            icon={<ArrowRight className="h-5 w-5" />}
            className="w-full"
            size="lg"
          >
            COMEÇAR AGORA
          </PrimaryButton>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-3">
      <ThemeToggle />
      <HeaderLanguageDropdown variant="desktop" />
      
      <Link href="/coming-soon">
        <PrimaryButton
          icon={<ArrowRight className="h-4 w-4" />}
          size="sm"
          variant="outline"
          className="px-3 whitespace-nowrap"
        >
          JÁ SOU ALUNO
        </PrimaryButton>
      </Link>

      <Link href="/coming-soon">
        <PrimaryButton
          icon={<ArrowRight className="h-4 w-4" />}
          size="sm"
          className="px-3 whitespace-nowrap"
        >
          COMEÇAR AGORA
        </PrimaryButton>
      </Link>
    </div>
  )
}
