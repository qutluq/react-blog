import { useEffect, useState } from 'react'
import { Button } from 'src/components/button'
import { PageSize } from 'src/config'
import { classNames } from 'src/utils'

const paginateData = (data: any[], currentPage: number) => {
  const startIndex = (currentPage - 1) * PageSize
  const endIndex = startIndex + PageSize
  return data.slice(startIndex, endIndex)
}

export const usePagination = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [allItems, setAllItems] = useState<any[]>([])
  const [items, setItems] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [display, setDisplay] = useState(false)

  const loadItems = async (itemsInitial: any[]) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setAllItems(itemsInitial)
    setIsLoading(false)
  }

  useEffect(() => {
    setCurrentPage(1)
    const nPages = Math.ceil(allItems.length / PageSize)
    setTotalPages(nPages)

    const displayPagination = nPages > 1 && !isLoading
    setDisplay(displayPagination)

    const paginated = paginateData(allItems, 1)
    setItems(paginated)
  }, [allItems])

  useEffect(() => {
    const paginated = paginateData(allItems, currentPage)
    setItems(paginated)
  }, [currentPage])

  return {
    display,
    items,
    allItems,
    setAllItems,
    isLoading,
    setIsLoading,
    currentPage,
    setCurrentPage,
    totalPages,
    loadItems
  }
}

type PaginationType = {
  currentPage: number
  setCurrentPage: Function
  totalPages: number
  display: boolean
}

export const Pagination = ({
  currentPage,
  setCurrentPage,
  totalPages,
  display
}: PaginationType) => {
  const handleClickPrevious = (page: number) => {
    if (page < 1) return
    setCurrentPage(page)
  }

  const handleClickNext = (page: number) => {
    if (page > totalPages) return
    setCurrentPage(page)
  }

  return (
    <nav
      className={classNames(
        !display && 'hidden',
        'flex flex-row items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6'
      )}
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Showing page <span className="font-medium">{currentPage}</span> of{' '}
          <span className="font-medium">{totalPages}</span>
        </p>
      </div>
      <div className="block sm:hidden">
        <p className="text-sm text-gray-700">
          page{' '}
          <span className="font-medium">
            {currentPage}/{totalPages}
          </span>
        </p>
      </div>
      <div className="flex flex-row gap-1 sm:justify-end">
        <Button
          onClick={() => handleClickPrevious(currentPage - 1)}
          isRounded
          className="w-24"
        >
          Previous
        </Button>
        <Button
          onClick={() => handleClickNext(currentPage + 1)}
          isRounded
          className="w-24"
        >
          Next
        </Button>
      </div>
    </nav>
  )
}
