import { LucideIcon } from "lucide-react"

export interface INavItem {
  title: string
  href: string
  hasDropdown?: boolean
  dropdownItems?: INavItem[]
  icon?: LucideIcon
}

export interface IHeaderProps {
  navItems: INavItem[]
}

