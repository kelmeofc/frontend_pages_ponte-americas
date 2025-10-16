"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/common/lib/utils"

interface FAQItem {
  question: string
  answer: string
}

interface AnimatedFAQProps {
  items: FAQItem[]
  className?: string
}

export function AnimatedFAQ({ items, className }: AnimatedFAQProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <div className={cn("space-y-4", className)}>
      {items.map((item, index) => (
        <motion.div
          key={index}
          className="overflow-hidden rounded-lg border border-gray-200 bg-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <button className="flex w-full items-center justify-between p-6 text-left" onClick={() => toggleItem(index)}>
            <h3 className="text-lg font-bold text-slate-900">{item.question}</h3>
            <motion.div animate={{ rotate: activeIndex === index ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronDown className="h-5 w-5 text-primary" />
            </motion.div>
          </button>

          <AnimatePresence>
            {activeIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="border-t border-gray-100 p-6 text-slate-600">{item.answer}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  )
}

