'use client'

import { FormDatePicker } from '@/components/common/form-date-picker'
import type { HackathonScheduleType } from '@/graphql/generated/graphql'
import { useHackathonQuery } from '@/hooks/hackathon/query'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { cn } from '@hackquest/ui/lib/utils'
import { Button } from '@hackquest/ui/shared/button'
import * as TimelinePrimitive from '@hackquest/ui/shared/timeline'
import { type Path, useFormContext } from 'react-hook-form'
import { LuPlus } from 'react-icons/lu'
import type { FormValues } from '.'
import { EditSchedule } from './edit-schedule'
import { useScheduleContext } from './schedule-context'
import { SchedulePreview } from './schedule-preview'
import { getScheduleTitle } from './utils'

export function ScheduleSection({
  type,
  isSameTime,
  name,
  closeName,
  label,
  closeLabel,
  last,
}: {
  type: HackathonScheduleType
  isSameTime: boolean
  name: Path<FormValues>
  closeName?: Path<FormValues>
  label?: string
  closeLabel?: string
  last?: boolean
}) {
  const form = useFormContext<FormValues>()

  const context = useScheduleContext()

  const [parent] = useAutoAnimate()

  const { data: hackathon } = useHackathonQuery()

  const schedules = hackathon?.timeline?.schedule ?? []

  const disabled = !form.watch(name) || (closeName && !form.watch(closeName))

  function onCancel(cancelId: string) {
    if (context.ids[type].creating?.includes(cancelId)) {
      context.setIds({
        ...context.ids,
        [type]: {
          ...context.ids[type],
          creating: context.ids[type].creating?.filter(id => id !== cancelId),
        },
      })
    } else {
      context.setIds({
        ...context.ids,
        [type]: {
          ...context.ids[type],
          editing: context.ids[type].editing?.filter(id => id !== cancelId),
        },
      })
    }
  }

  function onEdit(editingId: string) {
    context.setIds({
      ...context.ids,
      [type]: {
        ...context.ids[type],
        editing: [...context.ids[type].editing, editingId],
      },
    })
  }

  function onCreate() {
    context.setIds({
      ...context.ids,
      [type]: {
        ...context.ids[type],
        creating: [...context.ids[type].creating, crypto.randomUUID()],
      },
    })
  }

  return (
    <TimelinePrimitive.Item className="w-full">
      <TimelinePrimitive.Separator>
        <TimelinePrimitive.Dot className={cn(disabled && 'bg-neutral-200')} />
        {!last && (
          <TimelinePrimitive.Connector
            className={cn(disabled && 'bg-neutral-200')}
          />
        )}
      </TimelinePrimitive.Separator>
      <TimelinePrimitive.Content className="flex w-0 min-w-0 flex-1 flex-col gap-4 pr-0">
        <div className="space-y-4" ref={parent}>
          {isSameTime ? (
            <FormDatePicker
              control={form.control}
              name={name}
              label={label}
              requiredSymbol
            />
          ) : (
            <div className="flex gap-6">
              <FormDatePicker
                control={form.control}
                name={name}
                label={label}
                requiredSymbol
              />
              {closeName && (
                <FormDatePicker
                  control={form.control}
                  name={closeName}
                  label={closeLabel}
                  requiredSymbol
                />
              )}
            </div>
          )}
          {schedules
            ?.filter(schedule => schedule.type === type)
            ?.map(schedule =>
              context.ids[type].editing?.includes(schedule.id) ? (
                <EditSchedule
                  key={schedule.id}
                  type={type}
                  initialValues={schedule}
                  onCancel={() => onCancel(schedule.id)}
                />
              ) : (
                <SchedulePreview
                  key={schedule.id}
                  schedule={schedule}
                  onEdit={() => onEdit(schedule.id)}
                />
              ),
            )}
          {context.ids[type].creating?.map(id => (
            <EditSchedule
              key={id}
              type={type}
              initialValues={null}
              onCancel={() => onCancel(id)}
            />
          ))}
          <Button className="w-full" disabled={disabled} onClick={onCreate}>
            <LuPlus className="size-4" />
            <span>Add Schedule After {getScheduleTitle(type)}</span>
          </Button>
        </div>
      </TimelinePrimitive.Content>
    </TimelinePrimitive.Item>
  )
}
