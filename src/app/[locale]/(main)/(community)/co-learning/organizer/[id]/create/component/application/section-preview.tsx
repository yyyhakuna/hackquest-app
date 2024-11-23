import { DeleteAlertDialog } from '@/components/common/delete-alert-dialog'
import { useUpdateCoLearningMutation } from '@/graphql/generated/hooks'
import { useToggle } from '@/hooks/utils/use-toggle'
import { Input, InputSlot } from '@hackquest/ui/shared/input'
import { useParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { FiEdit } from 'react-icons/fi'
import { LuTrash } from 'react-icons/lu'
import { useApplicationContext } from './application-context'

export function SectionPreview({
  section,
  type,
  onEdit,
}: {
  section: any
  type: string
  onEdit: () => void
}) {
  const context = useApplicationContext()

  const [open, onOpenChange] = useToggle(false)

  const id = useParams().id as string
  const { isPending, mutateAsync, isSuccess } = useUpdateCoLearningMutation()
  async function onConfirm() {
    const application = structuredClone(context.application)

    const newApplication = Object.entries(application).reduce<
      Record<string, any[]>
    >((acc, [key, items]) => {
      if (Array.isArray(items)) {
        acc[key] = items.filter(item => item.id !== section.id)
      }
      return acc
    }, {})

    await toast
      .promise(
        mutateAsync({
          id,
          data: {
            application: newApplication,
          },
        }),
        {
          loading: 'Loading',
          success: 'Delete Success',
          error: 'Failed to delete',
        },
      )
      .then(() => {
        onOpenChange(!open)
        context.setApplication(newApplication)
      })
  }
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-neutral-300 px-6 py-3">
      <div className="flex items-center justify-end gap-4">
        <button type="button" className="outline-none" onClick={onEdit}>
          <FiEdit className="size-5" />
        </button>
        <button
          type="button"
          className="outline-none"
          onClick={() => onOpenChange(true)}
        >
          <LuTrash className="size-5" />
        </button>
      </div>
      <h3 className="headline-m truncate">{section.property.label}</h3>
      {section.property?.placeholder && (
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: section.property.placeholder }}
        />
      )}
      {section.property?.options && section.property.options.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {section.property.options.map((option: any, index: number) => (
            <Input
              key={index}
              readOnly
              value={option}
              onChange={() => {}}
              className="gap-2"
            >
              <InputSlot>
                <span className="body-s inline-flex size-5 shrink-0 items-center justify-center rounded border border-neutral-300">
                  {index + 1}
                </span>
              </InputSlot>
            </Input>
          ))}
        </div>
      )}
      {section.property?.maxCharacters && (
        <p className="body-s text-neutral-600">
          Answer MAX Character: {section.property.maxCharacters}
        </p>
      )}
      <DeleteAlertDialog
        open={open}
        onOpenChange={onOpenChange}
        title="Delete Section"
        loading={isPending}
        description="Are you sure you want to delete this section? This action cannot be undone."
        onConfirm={onConfirm}
      />
    </div>
  )
}
