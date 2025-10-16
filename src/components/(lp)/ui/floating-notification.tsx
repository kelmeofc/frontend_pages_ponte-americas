"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Bell } from "lucide-react"
import { cn } from "@/common/lib/utils"

interface FloatingNotificationProps {
  messages: string[]
  interval?: number
  position?: "top-right" | "bottom-right" | "bottom-left" | "top-left" | "bottom-center"
  className?: string
}

export function FloatingNotification({
  messages,
  interval = 8000,
  position = "bottom-right",
  className,
}: FloatingNotificationProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const positionClasses = {
    "top-right": "top-4 right-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-2 md:left-4",
    "bottom-center": "bottom-4 left-1/2 transform! -translate-x-1/2",
    "top-left": "top-4 left-4",
  }

  useEffect(() => {
    // Show first notification after a delay
    const initialTimeout = setTimeout(() => {
      setIsVisible(true)
    }, 3000)

    return () => clearTimeout(initialTimeout)
  }, [])

  useEffect(() => {
    if (!isVisible || isPaused || messages.length <= 1) return

    const rotateMessages = () => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length)
    }

    const timer = setInterval(rotateMessages, interval)

    return () => clearInterval(timer)
  }, [isVisible, isPaused, messages, interval])

  const handleClose = () => {
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={cn("fixed z-50 max-w-[350px] w-[calc(100%-20px)]", positionClasses[position], className)}
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="flex items-start gap-4 rounded-lg bg-white p-4 shadow-lg border border-gray-100">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Bell className="h-5 w-5 text-primary" />
            </div>

            <div className="flex-1">
              <p className="text-sm text-slate-600">{messages[currentMessageIndex]}</p>
            </div>

            <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

