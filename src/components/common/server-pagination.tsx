'use client'

import { usePathname } from '@/app/navigation'
import { Link } from '@/app/navigation'
import { createUrl } from '@/lib/utils'
import { cn } from '@hackquest/ui/lib/utils'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@hackquest/ui/shared/pagination'
import { useSearchParams } from 'next/navigation'
import * as React from 'react'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu'

type PaginationLinkProps = React.ComponentProps<typeof Link> & {
  isActive?: boolean
}

const PaginationLink = ({
  className,
  isActive,
  ...props
}: PaginationLinkProps) => (
  <Link
    aria-current={isActive ? 'page' : undefined}
    className={cn(
      'inline-flex size-8 items-center justify-center whitespace-nowrap rounded border border-transparent px-2 transition-colors duration-300 hover:bg-neutral-100',
      {
        'border-neutral-200': isActive,
      },
      className,
    )}
    {...props}
  />
)

export function ServerPagination({
  total,
  limit,
  totalPages,
  currentPage,
  className,
}: {
  total: number
  limit: number
  totalPages: number
  currentPage: number
  className?: string
}) {
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const createPageLink = React.useCallback(
    (page: number) => {
      const validPage = Math.max(1, Math.min(page, totalPages))

      const params = new URLSearchParams(searchParams)
      if (validPage === 1) {
        params.delete('page')
      } else {
        params.set('page', validPage.toString())
      }
      return createUrl(pathname, params)
    },
    [pathname, searchParams, totalPages],
  )

  const renderPageButtons = React.useCallback(() => {
    const buttons = []
    const showEllipsisStart = totalPages > 4
    const showEllipsisEnd = currentPage < totalPages - 3

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1) ||
        (i <= 4 && currentPage <= 4) ||
        (i >= totalPages - 3 && currentPage >= totalPages - 3)
      ) {
        buttons.push(
          <PaginationItem key={i}>
            <PaginationLink
              href={createPageLink(i)}
              isActive={i === currentPage}
            >
              {i}
            </PaginationLink>
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
  }, [totalPages, currentPage, createPageLink])

  if (total <= limit) return null

  return (
    <Pagination className={cn('mt-6', className)}>
      <PaginationContent className="body-s gap-1 sm:gap-1.5">
        <PaginationItem>
          <PaginationLink
            aria-label="Go to previous page"
            className="h-8 w-8 gap-1 pr-1 pl-1 sm:w-fit sm:pr-3"
            href={createPageLink(currentPage - 1)}
          >
            <LuChevronLeft className="size-[18px]" />
            <span className="hidden sm:block">Previous</span>
          </PaginationLink>
        </PaginationItem>
        {renderPageButtons()}
        <PaginationItem>
          <PaginationLink
            aria-label="Go to next page"
            className="h-8 w-8 gap-1 pr-1 pl-1 sm:w-fit sm:pl-3"
            href={createPageLink(currentPage + 1)}
          >
            <span className="hidden sm:block">Next</span>
            <LuChevronRight className="size-[18px]" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
