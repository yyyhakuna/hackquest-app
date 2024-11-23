'use client'

import type { FindEcosystemInfoQuery } from '@/graphql/generated/graphql'
import { cn } from '@hackquest/ui/lib/utils'
import { Button } from '@hackquest/ui/shared/button'
import * as React from 'react'
import { LuChevronDown } from 'react-icons/lu'
import { create } from 'zustand'

type Store = {
  phaseIds: string[]
  setPhaseId: (phaseId: string) => void
  setPhaseIds: (phaseIds: string[]) => void
}

export const useExpandStore = create<Store>(set => ({
  phaseIds: [],
  setPhaseId: (phaseId: string) =>
    set(state => ({
      phaseIds: state.phaseIds.includes(phaseId)
        ? state.phaseIds.filter(id => id !== phaseId)
        : [...state.phaseIds, phaseId],
    })),
  setPhaseIds: (phaseIds: string[]) =>
    set(() => ({
      phaseIds: phaseIds.length > 0 ? phaseIds : [],
    })),
}))

export function ExpandButton({
  ecosystemPromise,
}: {
  ecosystemPromise: Promise<FindEcosystemInfoQuery>
}) {
  const { ecosystem } = React.use(ecosystemPromise)
  const { phaseIds, setPhaseIds } = useExpandStore()

  const allPhaseIds = React.useMemo(
    () => ecosystem?.phases?.map(phase => phase.id) ?? [],
    [ecosystem],
  )

  return (
    <Button
      variant="outline"
      color="neutral"
      size="small"
      className="min-w-[7.25rem]"
      onClick={() => setPhaseIds(phaseIds.length > 0 ? [] : allPhaseIds)}
    >
      {phaseIds.length > 0 ? 'Collapse all' : 'Expand all'}
      <LuChevronDown
        className={cn(
          'size-4 transition-transform duration-300',
          phaseIds.length > 0 && 'rotate-180',
        )}
      />
    </Button>
  )
}
