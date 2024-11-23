'use client'

import { useAutoAnimate } from '@formkit/auto-animate/react'
import { LuPlus } from 'react-icons/lu'
import { useApplicationContext } from './application-context'
import { EditQuestion } from './edit-question'
import { SectionPreview } from './section-preview'

export function CustomSection({
  sections,
  type,
}: {
  sections: any[]
  type: string
}) {
  const [parent] = useAutoAnimate()
  const context = useApplicationContext()

  function onCreate(type: string) {
    context.setIds({
      ...context.ids,
      [type]: {
        ...context.ids[type]!,
        creating: [...context.ids[type]!.creating, crypto.randomUUID()],
      },
    })
  }

  function onCancel(type: string, cancelId: string) {
    if (context.ids[type]!.creating.includes(cancelId)) {
      context.setIds({
        ...context.ids,
        [type]: {
          ...context.ids[type]!,
          creating: context.ids[type]!.creating.filter(id => id !== cancelId),
        },
      })
    } else {
      context.setIds({
        ...context.ids,
        [type]: {
          ...context.ids[type]!,
          editing: context.ids[type]!.editing.filter(id => id !== cancelId),
        },
      })
    }
  }

  function onEdit(type: string, editingId: string) {
    context.setIds({
      ...context.ids,
      [type]: {
        ...context.ids[type]!,
        editing: [...context.ids[type]!.editing, editingId],
      },
    })
  }

  return (
    <div ref={parent} className="space-y-3">
      {sections
        ?.filter(
          section => section.type === 'input' || section.type === 'radio',
        )
        .map(section =>
          context.ids[type]!.editing?.includes(section.id) ? (
            <EditQuestion
              key={section.id}
              type={type}
              initialValues={section}
              onCancel={() => onCancel(type, section.id)}
            />
          ) : (
            <SectionPreview
              key={section.id}
              section={section}
              type={type}
              onEdit={() => onEdit(type, section.id)}
            />
          ),
        )}
      {context.ids[type]!.creating?.map(id => (
        <EditQuestion
          key={id}
          type={type}
          onCancel={() => onCancel(type, id)}
          initialValues={null}
        />
      ))}
      {/* biome-ignore lint/a11y/useFocusableInteractive: <explanation> */}
      <div
        // biome-ignore lint/a11y/useSemanticElements: <explanation>
        role="button"
        className="flex h-10 items-center justify-center gap-2 rounded-xl border border-neutral-300 p-2 transition-colors duration-300 hover:bg-neutral-100"
        onClick={() => onCreate(type)}
      >
        <LuPlus />
        <span className="body-s">Q&A</span>
      </div>
    </div>
  )
}
