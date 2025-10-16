"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Quote } from "lucide-react"
import { cn } from "@/common/lib/utils"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  company: string
  avatarSrc?: string
  className?: string
}

export function TestimonialCard({ quote, author, role, company, avatarSrc, className }: TestimonialCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={cn("h-full", className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="h-full border-0 bg-white shadow-md transition-all duration-300 hover:shadow-lg">
        <CardContent className="flex h-full flex-col p-6">
          <div className="mb-4 flex items-center justify-between">
            <Avatar className="h-12 w-12 border-2 border-primary/10">
              <AvatarImage src={avatarSrc} alt={author} />
              <AvatarFallback className="bg-primary/10 text-primary">
                {author
                  .split(" ")
                  .map((name) => name[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <Quote className="h-8 w-8 text-primary/20" />
          </div>

          <motion.p
            className="flex-1 text-slate-600"
            animate={{ scale: isHovered ? 1.02 : 1 }}
            transition={{ duration: 0.3 }}
          >
            "{quote}"
          </motion.p>

          <div className="mt-6 border-t border-gray-100 pt-4">
            <p className="font-bold text-slate-900">{author}</p>
            <p className="text-sm text-slate-500">
              {role}, {company}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

