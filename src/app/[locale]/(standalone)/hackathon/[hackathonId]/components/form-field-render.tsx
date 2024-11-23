import { FormInput } from '@/components/common/form-input'
import { FormRadioCards } from '@/components/common/form-radio-cards'
import { FormTextarea } from '@/components/common/form-textarea'
import { applicationField } from '@/components/hackathon-registration'
import type { ApplicationField } from '@/components/hackathon-registration/type'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@hackquest/ui/shared/tooltip'
import { type FieldValues, useFormContext } from 'react-hook-form'
import { LuInfo } from 'react-icons/lu'

export function FormFieldRender({
  field,
  type = 'application',
}: {
  field: ApplicationField
  type?: 'application' | 'submission'
}) {
  const fieldType = field.type
  const name = field.property?.name || field.id
  const { control } = useFormContext<FieldValues>()

  const commonProps = {
    control,
    name,
    label: field.property?.label,
    requiredSymbol: !field.optional,
    tooltip: field.property?.placeholder ? (
      <DescriptionTooltip description={field.property.placeholder} />
    ) : null,
  }

  if (fieldType === 'input') {
    return type === 'application' ? (
      <FormInput
        {...commonProps}
        placeholder={field.property.label}
        maxLength={field.property.maxCharacters}
      />
    ) : (
      <FormTextarea
        {...commonProps}
        placeholder={field.property.label}
        maxLength={field.property.maxCharacters}
      />
    )
  }

  if (fieldType === 'textarea') {
    return <FormTextarea {...commonProps} placeholder={field.property.label} />
  }

  if (fieldType === 'radio') {
    return (
      <FormRadioCards
        {...commonProps}
        radioCardsProps={{
          className: 'grid grid-cols-2 gap-3',
        }}
        options={field.property.options?.map(option => ({
          label: option,
          value: option,
        }))}
      />
    )
  }

  if (applicationField[fieldType]) {
    const Component = applicationField[fieldType]?.component
    return Component ? <Component control={control} field={field} /> : null
  }

  return null
}

function DescriptionTooltip({ description }: { description: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="outline-none">
            <LuInfo className="size-4 fill-primary" />
          </button>
        </TooltipTrigger>
        <TooltipContent
          align="start"
          className="body-s w-80 rounded-xl border border-neutral-300 bg-neutral-white p-6 text-primary-neutral"
        >
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
