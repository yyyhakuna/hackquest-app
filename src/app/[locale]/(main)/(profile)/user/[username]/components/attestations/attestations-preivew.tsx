'use client'

import { Link } from '@/app/navigation'
import type { AttestationWithCreator } from '@/graphql/generated/graphql'
import useMediaQuery from '@/hooks/use-media-query'
import { useToggle } from '@/hooks/utils/use-toggle'
import { cn } from '@hackquest/ui/lib/utils'
import * as React from 'react'
import { TbTriangleFilled } from 'react-icons/tb'
import { useAttestationStore } from '../../utils/store'
import { AttestationsPreviewDialog } from './attestations-preview-dialog'

type SafeAttestation = Omit<
  AttestationWithCreator,
  'createdAt' | 'updatedAt' | 'userId'
>

const MAX_VISIBLE = 3

export function AttestationsPreview({
  attestations = [],
  className,
}: {
  attestations: SafeAttestation[]
  className?: string
}) {
  const [open, onOpenChange] = useToggle(false)
  const isSmallScreen = useMediaQuery('(max-width: 640px)')
  const { activeIds, expanded, setActiveIds, setExpanded } =
    useAttestationStore()

  const sourceId = attestations[0]?.sourceId ?? ''

  const uniqueAttesters = React.useMemo(() => {
    return attestations.reduce((acc, current) => {
      const x = acc.find((item: any) => item.creatorId === current.creatorId)
      if (!x) {
        return acc.concat([current])
      } else {
        return acc
      }
    }, [] as SafeAttestation[])
  }, [attestations])

  const displayAttesters = uniqueAttesters.slice(0, MAX_VISIBLE)
  const remainingCount = uniqueAttesters.length - MAX_VISIBLE

  function onScroll() {
    const elements = document.querySelectorAll('a[data-source]')
    if (elements.length > 0) {
      elements[0]?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  function onClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    event.stopPropagation()
    event.nativeEvent.stopImmediatePropagation()
    setActiveIds(sourceId)

    if (isSmallScreen) {
      onOpenChange(true)
      return
    }

    const isSelected = activeIds.includes(sourceId)

    if (!expanded && !isSelected) {
      setExpanded(true)
      setTimeout(onScroll, 300)
      return
    }

    if (expanded && !isSelected) {
      onScroll()
    }
  }

  if (displayAttesters.length === 0) {
    return null
  }

  return (
    <React.Fragment>
      <button
        type="button"
        data-active={activeIds.includes(sourceId)}
        className={cn(
          'group flex items-center gap-2 self-start rounded-lg border border-transparent bg-neutral-100 p-2 data-[active=true]:border-primary-600 data-[active=true]:bg-primary-50',
          className,
        )}
        onClick={onClick}
      >
        <TbTriangleFilled className="size-3 shrink-0 text-secondary-neutral" />
        <div className="text-left font-bold text-secondary-neutral text-xs leading-[150%]">
          Attested by{' '}
          {displayAttesters.map((attester: any, index: number) => (
            <span key={attester.id} className="text-primary-link">
              <object className="inline-flex items-center">
                <Link
                  href={`/user/${attester.creator.username}`}
                  target="_blank"
                  className="hover:underline"
                  rel="noopener noreferrer"
                >
                  {attester.creator.nickname || attester.creator.username}
                </Link>
              </object>
              {index < displayAttesters.length - 1 && ', '}
            </span>
          ))}
          {remainingCount > 0 && ` and other ${remainingCount}`}
        </div>
      </button>
      <AttestationsPreviewDialog open={open} onOpenChange={onOpenChange} />
    </React.Fragment>
  )
}
