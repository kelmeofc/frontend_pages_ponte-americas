"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Briefcase,
  ShoppingBag,
  Utensils,
  Heart,
  GraduationCap,
  Truck,
  Palette,
  Building,
  Smartphone,
  Shirt,
} from "lucide-react"

interface Industry {
  id: string
  name: string
  icon: React.ReactNode
}

interface IndustrySelectorProps {
  onSelect: (industry: string) => void
}

export function IndustrySelector({ onSelect }: IndustrySelectorProps) {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null)

  const industries: Industry[] = [
    { id: "tech", name: "Tecnologia", icon: <Smartphone className="h-6 w-6" /> },
    { id: "retail", name: "Varejo", icon: <ShoppingBag className="h-6 w-6" /> },
    { id: "food", name: "Alimentação", icon: <Utensils className="h-6 w-6" /> },
    { id: "health", name: "Saúde", icon: <Heart className="h-6 w-6" /> },
    { id: "education", name: "Educação", icon: <GraduationCap className="h-6 w-6" /> },
    { id: "logistics", name: "Logística", icon: <Truck className="h-6 w-6" /> },
    { id: "creative", name: "Criativo", icon: <Palette className="h-6 w-6" /> },
    { id: "corporate", name: "Corporativo", icon: <Building className="h-6 w-6" /> },
    { id: "fashion", name: "Moda", icon: <Shirt className="h-6 w-6" /> },
    { id: "other", name: "Outro", icon: <Briefcase className="h-6 w-6" /> },
  ]

  const handleSelect = (industryId: string) => {
    setSelectedIndustry(industryId)
    onSelect(industryId)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Selecione seu setor para conteúdo personalizado:</h3>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {industries.map((industry) => (
          <Card
            key={industry.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedIndustry === industry.id ? "border-primary ring-2 ring-primary/20" : "border-gray-200"
            }`}
            onClick={() => handleSelect(industry.id)}
          >
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div
                className={`p-2 rounded-full mb-2 ${
                  selectedIndustry === industry.id ? "bg-primary/10 text-primary" : "bg-gray-100 text-gray-500"
                }`}
              >
                {industry.icon}
              </div>
              <span className="text-sm">{industry.name}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

