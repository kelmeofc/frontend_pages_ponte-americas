"use client"

import { useTheme } from "next-themes"

export function ThemeToggle() {
  // Mantendo a funcionalidade do tema, mas sem renderizar o botão na interface
  const { setTheme } = useTheme()

  // Não renderiza nenhum elemento visível
  return null
}

