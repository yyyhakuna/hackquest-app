import { cn } from '@hackquest/ui/lib/utils'
import { useApplicationContext } from './application-context'
import { SelectableCard } from './selectable-card'

export function SelectSection({
  sections,
  type,
}: {
  sections: any[]
  type: string
}) {
  const context = useApplicationContext()

  function onCheckedChange(type: string, id: string, checked: boolean) {
    const newValues = context.application[type] || []
    const index = newValues?.findIndex(item => item.id === id)
    if (index !== -1) {
      newValues[index]!.selected = checked
    }
    context.setApplication((prev: any) => ({
      ...prev,
      [type]: newValues,
    }))
  }

  function onOptionalChange(type: string, id: string, optional: boolean) {
    const newValues = context.application[type] || []
    const index = newValues.findIndex(item => item.id === id)
    if (index !== -1) {
      newValues[index]!.optional = optional
    }
    context.setApplication((prev: any) => ({
      ...prev,
      [type]: newValues,
    }))
  }

  return (
    <div
      className={cn(
        'mt-2 grid grid-cols-3 gap-3 ',
        type === 'About' && 'grid-cols-2',
      )}
    >
      {sections
        .filter(item => item?.type !== 'input' && item?.type !== 'radio')
        .map(item => (
          <SelectableCard
            key={item.id}
            label={item.title}
            disabled={item.required}
            checked={item.selected}
            optional={item.optional}
            onOptionalChange={optional =>
              onOptionalChange(type, item.id, optional)
            }
            onCheckedChange={checked => onCheckedChange(type, item.id, checked)}
          />
        ))}
    </div>
  )
}
