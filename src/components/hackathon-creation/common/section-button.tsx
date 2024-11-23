'use client'

import { Link } from '@/app/navigation'
import {
  creationBaseTabs,
  creationMoreTabs,
} from '@/components/hackathon-creation/constants/data'
import MenuLink from '@/constants/menu-link'
import { useHackathonQuery } from '@/hooks/hackathon/query'
import { useHackathonCreationContext } from '@/providers/hackathon/hackathon-creation-provider'
import { Button } from '@hackquest/ui/shared/button'
import type React from 'react'
import { useMemo } from 'react'
import { LuArrowRight } from 'react-icons/lu'

interface SectionButtonProp {
  onContinue?: VoidFunction
  loading?: boolean
}

const SectionButton: React.FC<SectionButtonProp> = ({
  onContinue,
  loading,
}) => {
  const { data: hackathon } = useHackathonQuery()
  const {
    creationType,
    setCreationType,
    selectedTab,
    setSelectedTab,
    progress,
  } = useHackathonCreationContext()

  const continueButton = useMemo(() => {
    return (
      <Button type="submit" onClick={() => onContinue?.()} loading={loading}>
        Save & Continue
        <LuArrowRight className="size-4" />
      </Button>
    )
  }, [loading, onContinue])

  const previewHackathonButton = () => {
    return (
      <Link href={`${MenuLink.EXPLORE}/${hackathon?.alias}`}>
        <Button>
          Preview Hackathon
          <LuArrowRight className="size-4" />
        </Button>
      </Link>
    )
  }
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const renderJumpButton = useMemo(() => {
    const keys = Object.keys(progress) || []
    if (creationType === 'base') {
      let count = 0
      creationBaseTabs.forEach(tab => {
        if (keys.includes(tab.value)) {
          count++
        }
      })
      if (count === creationBaseTabs.length) {
        return (
          <>
            <Button
              onClick={() => {
                setCreationType('more')
                setSelectedTab(creationMoreTabs[0]?.value)
              }}
            >
              Edit Optional Info
              <LuArrowRight className="size-4" />
            </Button>
            {selectedTab === 'judges'
              ? previewHackathonButton()
              : continueButton}
          </>
        )
      } else {
        return continueButton
      }
    } else {
      return (
        <>
          <Button
            onClick={() => {
              setCreationType('base')
              setSelectedTab(creationBaseTabs[0]?.value)
            }}
          >
            Edit Hackathon Info
            <LuArrowRight className="size-4" />
          </Button>
          {keys.length === creationMoreTabs.length + creationBaseTabs.length
            ? previewHackathonButton()
            : continueButton}
        </>
      )
    }
  }, [creationType, progress, loading, setCreationType, setSelectedTab])
  return <div className="flex justify-end gap-2">{renderJumpButton}</div>
}

export default SectionButton
