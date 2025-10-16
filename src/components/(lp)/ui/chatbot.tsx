"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, Send, X, Loader2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useGSAP } from "@/common/hooks/use-gsap"
import gsap from "gsap"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Olá! Sou o assistente virtual da PPPI. Como posso ajudar com o registro da sua marca?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatbotRef = useRef<HTMLDivElement>(null)
  const buttonRef = useGSAP<HTMLButtonElement>({
    from: { scale: 0, opacity: 0 },
    to: { scale: 1, opacity: 1 },
    duration: 0.5,
    delay: 1.5,
    ease: "back.out(1.7)",
  })

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Animation for opening/closing the chatbot
  useEffect(() => {
    if (chatbotRef.current) {
      if (isOpen) {
        gsap.fromTo(
          chatbotRef.current,
          { opacity: 0, y: 20, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power2.out" },
        )
      }
    }
  }, [isOpen])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponse = getBotResponse(inputValue)
      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1000)
  }

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (input.includes("preço") || input.includes("custo") || input.includes("valor")) {
      return "O custo para registro de marca varia de acordo com a complexidade do caso e número de classes. Na consulta gratuita, apresentaremos um orçamento personalizado para sua situação específica."
    }

    if (input.includes("tempo") || input.includes("prazo") || input.includes("demora")) {
      return "O processo completo de registro no INPI leva em média de 12 a 18 meses. No entanto, a proteção começa a partir do depósito do pedido. Na análise gratuita, explicaremos todas as etapas e prazos."
    }

    if (input.includes("negado") || input.includes("negação") || input.includes("recusado")) {
      return "Aproximadamente 70% dos pedidos de registro são negados por falhas que poderiam ser identificadas previamente. Nossa análise gratuita ajuda a identificar esses problemas antes do depósito, aumentando suas chances de aprovação."
    }

    if (input.includes("bônus") || input.includes("surpresa") || input.includes("brinde")) {
      return "O bônus surpresa é um material exclusivo que oferecemos aos clientes que completam a análise gratuita. Seu conteúdo é revelado apenas após a consulta, mas posso adiantar que contém informações valiosas para proteger seu negócio."
    }

    if (input.includes("agendar") || input.includes("marcar") || input.includes("consulta")) {
      return "Para agendar sua análise gratuita, basta preencher o formulário na página. Um de nossos especialistas entrará em contato em até 24 horas para confirmar sua consulta."
    }

    return "Obrigado pela sua pergunta. Para informações mais detalhadas sobre esse assunto, recomendo agendar nossa análise gratuita. Um especialista poderá fornecer orientações específicas para o seu caso."
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  // Animation for new messages
  useEffect(() => {
    if (messages.length > 1) {
      const messageElements = document.querySelectorAll(".message-bubble:not(.animated)")

      messageElements.forEach((element) => {
        gsap.fromTo(
          element,
          {
            opacity: 0,
            y: 20,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
            onComplete: () => {
              element.classList.add("animated")
            },
          },
        )
      })
    }
  }, [messages])

  return (
    <>
      {!isOpen && (
        <Button
          ref={buttonRef}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 rounded-full h-14 w-14 shadow-lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {isOpen && (
        <Card ref={chatbotRef} className="fixed bottom-6 right-6 w-80 md:w-96 shadow-xl border z-50">
          <CardHeader className="p-4 border-b bg-primary text-white flex flex-row justify-between items-center">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="PPPI Assistant" />
                <AvatarFallback>PP</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-sm">Assistente PPPI</h3>
                <p className="text-xs opacity-80">Especialista em Marcas</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 text-white hover:bg-primary/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent className="p-0">
            <div className="h-80 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`message-bubble max-w-[80%] rounded-lg p-3 ${
                      message.sender === "user" ? "bg-primary text-white" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1 text-right">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="message-bubble bg-gray-100 text-gray-800 rounded-lg p-3">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </CardContent>

          <CardFooter className="p-3 border-t">
            <div className="flex w-full gap-2">
              <Input
                placeholder="Digite sua mensagem..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button size="icon" onClick={handleSendMessage} disabled={!inputValue.trim() || isTyping}>
                {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </>
  )
}

