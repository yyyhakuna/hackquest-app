import { DeleteAlertDialog } from '@/components/common/delete-alert-dialog'
import { useUpdateHackathonMutation } from '@/graphql/generated/hooks'
import { useHackathonQuery } from '@/hooks/hackathon/query'
import { useHackathonCreationContext } from '@/providers/hackathon/hackathon-creation-provider'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Button } from '@hackquest/ui/shared/button'
import { useQueryClient } from '@tanstack/react-query'
import React, { useRef } from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { LuArrowRight } from 'react-icons/lu'
import SectionButton from '../common/section-button'
import {
  type HackathonTextInfoContentType,
  type HackathonTextInfoType,
  HackathonTextInfoValueType,
} from '../constants/type'
import TextEdit from './text-edit'
import TextPreview from './text-preview'

const TextInfo: React.FC = () => {
  const { data: hackathon } = useHackathonQuery()
  const { setSelectedTab } = useHackathonCreationContext()
  const sections = hackathon?.info?.sections
  const textInfo = sections?.textInfo as HackathonTextInfoType

  const [parent] = useAutoAnimate()

  const [editIds, setEditIds] = useState<string[]>([])

  const [addTextInfo, setAddTextInfo] = useState<HackathonTextInfoType>()

  const confirmItem = useRef<HackathonTextInfoContentType>()
  const confirmType = useRef<HackathonTextInfoValueType>()

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
    type: HackathonTextInfoValueType,
    info: HackathonTextInfoContentType,
  ) => {
    if (~editIds.indexOf(info.id)) {
      return (
        <TextEdit
          type={type}
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
        <TextPreview
          type={type}
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

  const onAdd = (type: HackathonTextInfoValueType) => {
    let info
    switch (type) {
      case HackathonTextInfoValueType.FAQS:
        info = {
          id: crypto.randomUUID(),
          question: '',
          answer: '',
        }
        break
      case HackathonTextInfoValueType.RESOURCE:
        info = {
          id: crypto.randomUUID(),
          description: '',
        }
        break
      default:
        info = {
          id: crypto.randomUUID(),
          title: '',
          description: '',
        }
    }

    setEditIds([...editIds, info?.id as string])
    const newAddTextInfo = (structuredClone(addTextInfo) ||
      {}) as HackathonTextInfoType
    const typeContent = newAddTextInfo[type] || []
    setAddTextInfo({
      ...newAddTextInfo,
      [type]: [...typeContent, info],
    })
  }

  const removeEditItem = (
    item: HackathonTextInfoContentType,
    type: HackathonTextInfoValueType,
  ) => {
    setEditIds(editIds.filter(v => v !== item.id))
    if (addTextInfo?.[type]?.some(v => v.id === item.id)) {
      setAddTextInfo({
        ...addTextInfo,
        [type]: addTextInfo[type].filter(v => v.id !== item.id),
      })
    }
  }

  const onSubmit = (
    val: HackathonTextInfoContentType,
    type: HackathonTextInfoValueType,
    handleType: 'update' | 'delete',
  ) => {
    const newTextInfo = structuredClone(textInfo) || {}
    if (handleType === 'update') {
      if (newTextInfo[type]?.find(v => v.id === val.id)) {
        const index = newTextInfo[type]?.findIndex(v => v.id === val.id)
        newTextInfo[type][index] = val
      } else {
        newTextInfo[type] = newTextInfo[type] || []
        newTextInfo[type].push(val)
      }
    } else {
      newTextInfo[type] = newTextInfo[type].filter(v => v.id !== val.id)
    }
    update({
      updateHackathonId: hackathon?.id!,
      data: {
        progress: 'textInfo',
        info: {
          upsert: {
            create: {
              sections: {
                ...sections,
                textInfo: newTextInfo,
              },
            },
            update: {
              sections: {
                ...sections,
                textInfo: newTextInfo,
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
        <div className="">
          <p className="body-s mb-2 text-neutral-600">FAQs</p>
          <div className="flex flex-col gap-4" ref={parent}>
            {textInfo?.[HackathonTextInfoValueType.FAQS]?.map(v => (
              <React.Fragment key={v.id}>
                {renderComponent(HackathonTextInfoValueType.FAQS, v)}
              </React.Fragment>
            ))}
            {addTextInfo?.[HackathonTextInfoValueType.FAQS]?.map(v => (
              <React.Fragment key={v.id}>
                {renderComponent(HackathonTextInfoValueType.FAQS, v)}
              </React.Fragment>
            ))}
            <Button
              className="w-full"
              onClick={() => onAdd(HackathonTextInfoValueType.FAQS)}
            >
              <span>Add FAQs</span>
              <LuArrowRight className="size-4" />
            </Button>
          </div>
        </div>
        <div className="">
          <p className="body-s mb-2 text-neutral-600">Resources</p>
          <div className="flex flex-col gap-4" ref={parent}>
            {textInfo?.[HackathonTextInfoValueType.RESOURCE]?.map(v => (
              <React.Fragment key={v.id}>
                {renderComponent(HackathonTextInfoValueType.RESOURCE, v)}
              </React.Fragment>
            ))}
            {addTextInfo?.[HackathonTextInfoValueType.RESOURCE]?.map(v => (
              <React.Fragment key={v.id}>
                {renderComponent(HackathonTextInfoValueType.RESOURCE, v)}
              </React.Fragment>
            ))}
            <Button
              className="w-full"
              onClick={() => onAdd(HackathonTextInfoValueType.RESOURCE)}
            >
              <span>Add Text Info</span>
              <LuArrowRight className="size-4" />
            </Button>
          </div>
        </div>
        <div className="">
          <p className="body-s mb-2 text-neutral-600">Another Text Block</p>
          <div className="flex flex-col gap-4" ref={parent}>
            {textInfo?.[HackathonTextInfoValueType.ANOTHER]?.map(v => (
              <React.Fragment key={v.id}>
                {renderComponent(HackathonTextInfoValueType.ANOTHER, v)}
              </React.Fragment>
            ))}
            {addTextInfo?.[HackathonTextInfoValueType.ANOTHER]?.map(v => (
              <React.Fragment key={v.id}>
                {renderComponent(HackathonTextInfoValueType.ANOTHER, v)}
              </React.Fragment>
            ))}
            <Button
              className="w-full"
              onClick={() => onAdd(HackathonTextInfoValueType.ANOTHER)}
            >
              <span>Add Another Text Block</span>
              <LuArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
      <SectionButton onContinue={() => setSelectedTab('partners')} />
      <DeleteAlertDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Delete Text Info"
        description="Are you sure you want to delete this text info? This action cannot be undone."
        loading={isPending}
        onConfirm={() =>
          onSubmit(confirmItem.current!, confirmType.current!, 'delete')
        }
      />
    </div>
  )
}

export default TextInfo
