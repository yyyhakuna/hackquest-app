import { useHackathonQuery } from '@/hooks/hackathon/query'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { LuPlus } from 'react-icons/lu'
import { useApplicationContext } from './application-context'
import { EditQuestion } from './edit-question'
import { EditSelection } from './edit-selection'
import { SectionPreview } from './section-preview'

export function Submission() {
  const [parent] = useAutoAnimate()
  const { data: hackathon } = useHackathonQuery()
  const context = useApplicationContext()

  const submission = Array.isArray(hackathon?.info?.submission)
    ? hackathon.info.submission
    : Object.values(hackathon?.info?.submission ?? {}).flat()

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
    <div className="space-y-3" ref={parent}>
      <h2 className="headline-l">User Submission</h2>
      {submission?.map((item: any) => {
        const type =
          item.type === 'radio' ? 'SubmissionSelection' : 'SubmissionQuestion'
        const isEditing = context.ids[type]?.editing.includes(item.id)

        if (isEditing) {
          return type === 'SubmissionSelection' ? (
            <EditSelection
              key={item.id}
              type={type}
              initialValues={item}
              onCancel={() => onCancel(type, item.id)}
            />
          ) : (
            <EditQuestion
              key={item.id}
              type={type}
              initialValues={item}
              onCancel={() => onCancel(type, item.id)}
            />
          )
        }

        return (
          <SectionPreview
            key={item.id}
            section={item}
            type={type}
            onEdit={() => onEdit(type, item.id)}
          />
        )
      })}

      {context.ids['SubmissionSelection']?.creating?.map(id => (
        <EditSelection
          key={id}
          type="SubmissionSelection"
          initialValues={null}
          onCancel={() => onCancel('SubmissionSelection', id)}
        />
      ))}
      {context.ids['SubmissionQuestion']?.creating?.map(id => (
        <EditQuestion
          key={id}
          type="SubmissionQuestion"
          initialValues={null}
          onCancel={() => onCancel('SubmissionQuestion', id)}
        />
      ))}
      <div className="grid grid-cols-2 gap-2">
        <div
          role="button"
          className="flex h-10 items-center justify-center gap-2 rounded-xl border border-neutral-300 p-2 transition-colors duration-300 hover:bg-neutral-100"
          onClick={() => onCreate('SubmissionSelection')}
        >
          <LuPlus />
          <span className="body-s">Selection</span>
        </div>
        <div
          role="button"
          className="flex h-10 items-center justify-center gap-2 rounded-xl border border-neutral-300 p-2 transition-colors duration-300 hover:bg-neutral-100"
          onClick={() => onCreate('SubmissionQuestion')}
        >
          <LuPlus />
          <span className="body-s">Q&A</span>
        </div>
      </div>
    </div>
  )
}
