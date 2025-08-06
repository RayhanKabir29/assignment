'use client'
import { useAppSelector, useAppDispatch } from '@/lib/hooks'
import { setCurrentPage } from '@/lib/features/products/productSlice'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Pagination() {
  const dispatch = useAppDispatch()
  const { currentPage, totalPages } = useAppSelector((state) => state.products)

  if (totalPages <= 1) return null

  const getPageNumbers = () => {
    const pages = []
    const maxVisible = 5
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
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

  return (
    <div className="flex items-center justify-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => dispatch(setCurrentPage(currentPage - 1))}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>
      
      {getPageNumbers().map((page, index) => (
        <Button
          key={index}
          variant={page === currentPage ? 'default' : 'outline'}
          size="sm"
          onClick={() => typeof page === 'number' && dispatch(setCurrentPage(page))}
          disabled={page === '...'}
          className={page === currentPage ? 'bg-emerald-600' : ''}
        >
          {page}
        </Button>
      ))}
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => dispatch(setCurrentPage(currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  )
}