'use client'

import { cn } from '@hackquest/ui/lib/utils'
import {
  PaginationContent,
  PaginationItem,
  Pagination as PaginationRoot,
} from '@hackquest/ui/shared/pagination'
import * as React from 'react'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu'

function PaginationButton({
  className,
  ...props
}: React.ComponentProps<'button'>) {
  return (
    <button
      className={cn(
        'body-s inline-flex h-8 w-8 items-center justify-center rounded border border-transparent px-3 py-1 outline-none transition-colors duration-300 enabled:hover:bg-neutral-100 enabled:aria-[current="true"]:border-neutral-200',
        className,
      )}
      {...props}
    />
  )
}

function PaginationPrevious({ ...props }: React.ComponentProps<'button'>) {
  return (
    <PaginationItem>
      <PaginationButton
        aria-label="Go to previous page"
        className="w-fit gap-1 px-2"
        {...props}
      >
        <LuChevronLeft className="size-[18px]" />
        <span className="hidden sm:block">Previous</span>
      </PaginationButton>
    </PaginationItem>
  )
}

function PaginationNext({ ...props }: React.ComponentProps<'button'>) {
  return (
    <PaginationItem>
      <PaginationButton
        aria-label="Go to next page"
        className="w-fit gap-1 px-2"
        {...props}
      >
        <span className="hidden sm:block">Next</span>
        <LuChevronRight className="size-[18px]" />
      </PaginationButton>
    </PaginationItem>
  )
}

export function Pagination({
  total = 0,
  page = 1,
  limit = 12,
  onPageChange,
}: {
  total?: number
  page?: number
  limit?: number
  onPageChange?: (page: number) => void
}) {
  const totalPages = Math.ceil(total / limit)

  const renderPageButtons = React.useCallback(() => {
    const buttons = []
    const showEllipsisStart = totalPages > 4
    const showEllipsisEnd = page < totalPages - 3

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= page - 1 && i <= page + 1) ||
        (i <= 4 && page <= 4) ||
        (i >= totalPages - 3 && page >= totalPages - 3)
      ) {
        buttons.push(
          <PaginationItem key={i}>
            <PaginationButton
              aria-current={i === page}
              onClick={() => onPageChange?.(i)}
            >
              {i}
            </PaginationButton>
          </PaginationItem>,
        )
      } else if (
        (i === 2 && showEllipsisStart) ||
        (i === totalPages - 1 && showEllipsisEnd)
      ) {
        buttons.push(
          <PaginationItem key={i}>
            <HiOutlineDotsHorizontal className="size-4" />
          </PaginationItem>,
        )
      }
    }

    return buttons
  }, [totalPages, page, onPageChange])

  if (total <= limit) return null

  return (
    <PaginationRoot>
      <PaginationContent className="body-s gap-1 sm:gap-1.5">
        <PaginationPrevious
          disabled={page === 1}
          onClick={() => onPageChange?.(Math.max(1, page - 1))}
        />
        {renderPageButtons()}
        <PaginationNext
          disabled={page === totalPages}
          onClick={() => onPageChange?.(Math.min(totalPages, page + 1))}
        />
      </PaginationContent>
    </PaginationRoot>
  )
}
