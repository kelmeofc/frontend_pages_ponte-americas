"use client"

import { ChevronLeft, ChevronRight, Loader2, MoreHorizontal } from "lucide-react"
import { useRouter } from "next/navigation"
import * as React from "react"

interface ClientPaginationProps {
  currentPage: number
  totalPages: number
}

export default function ClientPagination({ currentPage, totalPages }: ClientPaginationProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)

  const goToPage = async (page: number) => {
    if (page >= 1 && page <= totalPages && !isLoading) {
      setIsLoading(true)
      await router.push(`/blog?page=${page}`)
      setIsLoading(false)
    }
  }

  // Função para gerar os números das páginas com lógica inteligente
  const generatePageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      // Se temos poucas páginas, mostra todas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Lógica para mostrar páginas com ellipsis
      if (currentPage <= 3) {
        // Mostra primeiras páginas
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        // Mostra últimas páginas
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        // Mostra páginas ao redor da atual
        pages.push(1)
        pages.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      }
    }

    return pages
  }

  const pageNumbers = generatePageNumbers()

  if (totalPages <= 1) {
    return null
  }

  return (
    <nav className="flex justify-center items-center space-x-1 sm:space-x-2 mt-8" aria-label="Paginação">
      {/* Botão Anterior */}
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
        className={`
          flex items-center justify-center p-2 rounded-lg transition-all duration-200
          ${currentPage === 1 || isLoading
            ? "text-muted-foreground cursor-not-allowed opacity-50"
            : "text-primary hover:bg-primary/10 hover:text-primary-foreground"
          }
        `}
        aria-label="Página anterior"
      >
        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ChevronLeft className="w-4 h-4" />}
      </button>

      {/* Números das páginas */}
      <div className="flex items-center space-x-1">
        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-2 py-1 text-muted-foreground"
                aria-hidden="true"
              >
                <MoreHorizontal className="w-4 h-4" />
              </span>
            )
          }

          const pageNumber = page as number
          const isCurrentPage = currentPage === pageNumber

          return (
            <button
              key={pageNumber}
              onClick={() => goToPage(pageNumber)}
              disabled={isLoading}
              className={`
                flex items-center justify-center min-w-[40px] h-10 px-3 py-2 rounded-lg
                text-sm font-medium transition-all duration-200
                ${isCurrentPage
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-foreground hover:bg-muted hover:text-foreground"
                }
                ${isLoading ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
              `}
              aria-label={`Ir para página ${pageNumber}`}
              aria-current={isCurrentPage ? "page" : undefined}
            >
              {isLoading && isCurrentPage ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                pageNumber
              )}
            </button>
          )
        })}
      </div>

      {/* Botão Próximo */}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading}
        className={`
          flex items-center justify-center p-2 rounded-lg transition-all duration-200
          ${currentPage === totalPages || isLoading
            ? "text-muted-foreground cursor-not-allowed opacity-50"
            : "text-primary hover:bg-primary/10 hover:text-primary-foreground"
          }
        `}
        aria-label="Próxima página"
      >
        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ChevronRight className="w-4 h-4" />}
      </button>
    </nav>
  )
}