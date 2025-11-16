import { LucideIcon } from "lucide-react"
import React from "react"

export interface INavItem {
  title: string
  href: string
  hasDropdown?: boolean
  dropdownItems?: INavItem[]
  icon?: LucideIcon
}

export interface IActionButton {
  href: string
  text: string
  variant?: "default" | "outline" | "outline-solid" | "white"
  icon?: React.ReactNode
  mobileIcon?: React.ReactNode
}

export interface IActionButtons {
  member: IActionButton
  cta: IActionButton
}

export interface ILanguageOption {
  value: string
  label: string
}

export interface ILanguageOptions {
  current: string
  display: string
  options: readonly ILanguageOption[]
}

export type HeaderVariant = "default" | "title-only"
export type FooterVariant = "default" | "simplified"

export interface IHeaderProps {
  navItems?: INavItem[]
  actionButtons?: IActionButtons
  languageOptions?: ILanguageOptions
  variant?: HeaderVariant
}

