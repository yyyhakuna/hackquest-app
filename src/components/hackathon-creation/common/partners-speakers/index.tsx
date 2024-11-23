'use client'

import { DeleteAlertDialog } from '@/components/common/delete-alert-dialog'
import { useUpdateHackathonMutation } from '@/graphql/generated/hooks'
import { useHackathonQuery } from '@/hooks/hackathon/query'
import { useHackathonCreationContext } from '@/providers/hackathon/hackathon-creation-provider'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Button } from '@hackquest/ui/shared/button'
import { Callout, CalloutText } from '@hackquest/ui/shared/callout'
import { useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { LuArrowRight } from 'react-icons/lu'
import { partnersData, speakerJudgesData } from '../../constants/data'
import type {
  HackathonPartnerAccountValueType,
  HackathonPartnersContentType,
  HackathonPartnersSpeakersType,
  HackathonPartnersSpeakersValueType,
} from '../../constants/type'
import SectionButton from '../section-button'
import PartnerSpeakerEdit from './partner-speaker-edit'
import PartnerSpeakerPreview from './partner-speaker-preview'

interface PartnersSpeakersProp {
  progressType: 'partners' | 'speakersJudges'
}

const PartnersSpeakers: React.FC<PartnersSpeakersProp> = ({ progressType }) => {
  const { data: hackathon } = useHackathonQuery()
  const { selectedTab, setSelectedTab } = useHackathonCreationContext()
  const psData = progressType === 'partners' ? partnersData : speakerJudgesData
  const sections = hackathon?.info?.sections
  const partners = sections?.[progressType] as HackathonPartnersSpeakersType

  const [parent] = useAutoAnimate()

  const [editIds, setEditIds] = useState<string[]>([])

  const [addPartners, setAddPartners] =
    useState<HackathonPartnersSpeakersType>()

  const confirmItem = useRef<HackathonPartnersContentType>()
  const confirmType = useRef<HackathonPartnersSpeakersValueType>()

  const [confirmOpen, setConfirmOpen] = useState(false)

  const _queryClient = useQueryClient()

  const { mutate: update, isPending } = useUpdateHackathonMutation({
    meta:{
      invalidates:[['FindUniqueHackathon']]
    },
    onSuccess: () => {
      toast.success('Hackathon updated')
      removeEditItem(confirmItem.current!, confirmType.current!)
      setConfirmOpen(false)
    },
    onError: (error: string) => {
      toast.error(error)
    },
  })

  const renderComponent = (
    type: HackathonPartnersSpeakersValueType,
    info: HackathonPartnersContentType,
  ) => {
    if (~editIds.indexOf(info.id)) {
      return (
        <PartnerSpeakerEdit
          type={info.type}
          initValue={info}
          onSubmit={val => {
            confirmItem.current = val
            confirmType.current = type
            onSubmit(val, type, 'update')
          }}
          onCancel={() => {
            removeEditItem(info, type)
          }}
          loading={isPending}
        />
      )
    } else {
      return (
        <PartnerSpeakerPreview
          onEdit={() => setEditIds([...editIds, info.id])}
          onDelete={() => {
            setConfirmOpen(true)
            confirmItem.current = info
            confirmType.current = type
          }}
          initValue={info}
        />
      )
    }
  }

  const removeEditItem = (
    item: HackathonPartnersContentType,
    type: HackathonPartnersSpeakersValueType,
  ) => {
    setEditIds(editIds.filter(v => v !== item.id))
    if (addPartners?.[type]?.some(v => v.id === item.id)) {
      setAddPartners({
        ...addPartners,
        [type]: addPartners[type].filter(v => v.id !== item.id),
      })
    }
  }

  const onAdd = (
    type: HackathonPartnersSpeakersValueType,
    accountType: HackathonPartnerAccountValueType,
  ) => {
    const info = {
      id: crypto.randomUUID(),
      type: accountType,
      title: '',
      accounts: [],
    }
    setEditIds([...editIds, info?.id as string])
    const newAddPartners = (structuredClone(addPartners) ||
      {}) as HackathonPartnersSpeakersType
    const typeContent = newAddPartners[type] || []
    setAddPartners({
      ...newAddPartners,
      [type]: [...typeContent, info],
    })
  }

  const onSubmit = (
    val: HackathonPartnersContentType,
    type: HackathonPartnersSpeakersValueType,
    handleType: 'update' | 'delete',
  ) => {
    const newPartners = structuredClone(partners) || {}
    if (handleType === 'update') {
      if (newPartners[type]?.find(v => v.id === val.id)) {
        const index = newPartners[type]?.findIndex(v => v.id === val.id)
        newPartners[type][index] = val
      } else {
        newPartners[type] = newPartners[type] || []
        newPartners[type].push(val)
      }
    } else {
      newPartners[type] = newPartners[type].filter(v => v.id !== val.id)
    }
    update({
      updateHackathonId: hackathon?.id!,
      data: {
        progress: progressType,
        info: {
          upsert: {
            create: {
              sections: {
                ...sections,
                [progressType]: newPartners,
              },
            },
            update: {
              sections: {
                ...sections,
                [progressType]: newPartners,
              },
            },
          },
        },
      },
    })
  }

  return (
    <div className="flex h-full flex-col gap-8">
      <div className="flex flex-1 flex-col gap-8">
        <Callout className="rounded-lg bg-neutral-100 px-6 py-3">
          <CalloutText className="body-s font-normal">
            {progressType === 'partners'
              ? 'Please Select Partner Section'
              : ' Please Enter Partner X Account and One-line intro'}
          </CalloutText>
        </Callout>
        <div className="flex flex-col gap-4">
          {psData.map(p => (
            <div key={p.value}>
              <p className="body-s mb-2 text-neutral-600">{p.title}</p>
              <div className="flex flex-col gap-4" ref={parent}>
                {partners?.[p.value]?.map(v => (
                  <React.Fragment key={v.id}>
                    {renderComponent(p.value, v)}
                  </React.Fragment>
                ))}
                {addPartners?.[p.value]?.map(v => (
                  <React.Fragment key={v.id}>
                    {renderComponent(p.value, v)}
                  </React.Fragment>
                ))}
                <Button onClick={() => onAdd(p.value, p.type)}>
                  <span>Add {p.title}</span>
                  <LuArrowRight className="size-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <DeleteAlertDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        loading={isPending}
        title={
          <p className="px-8">
            {`Delete the partner ${confirmItem.current?.title}?`}
          </p>
        }
        description="Are you sure you want to delete this partner? This action cannot be undone."
        onConfirm={() => {
          onSubmit(confirmItem.current!, confirmType.current!, 'delete')
        }}
      />
      <SectionButton
        onContinue={() =>
          setSelectedTab(selectedTab === 'partners' ? 'speakersJudges' : 'todo')
        }
      />
    </div>
  )
}

export default PartnersSpeakers
