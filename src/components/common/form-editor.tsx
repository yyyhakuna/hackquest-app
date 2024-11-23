'use client'

import { useSingleUpload } from '@/hooks/utils/use-single-upload'
import { Editor, type EditorProps } from '@hackquest/editor/react'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@hackquest/ui/shared/form'
import type * as React from 'react'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'

export interface FormEditorProps<TFieldValues extends FieldValues = FieldValues>
  extends EditorProps {
  /**
   * @description
   * The control object from react-hook-form
   *
   * @example
   * const form = useForm()
   * <FormEditor control={form.control} name="content" />
   */
  control: Control<TFieldValues>
  /**
   * @description
   * The name of the field in the form
   *
   * @example
   * <FormEditor control={form.control} name="content" />
   */
  name: FieldPath<TFieldValues>
  /**
   * @description
   * The label of the editor
   *
   * @example
   * <FormEditor control={form.control} name="content" label="Content" />
   */
  label?: React.ReactNode
  /**
   * @description
   * The props of the label
   *
   * @example
   * <FormEditor control={form.control} name="content" label="Content" labelProps={{ className: 'text-red-500' }} />
   */
  labelProps?: React.ComponentPropsWithoutRef<typeof FormLabel>
  /**
   * @description
   * The placeholder of the editor
   *
   * @example
   * <FormEditor control={form.control} name="content" placeholder="Write something" />
   */
  placeholder?: string
  /**
   * @description
   * The tooltip of the editor
   */
  tooltip?: React.ReactNode
  /**
   * @description
   * Whether to show the required symbol
   * @default false
   */
  requiredSymbol?: boolean
}

export function FormEditor<TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  label,
  labelProps,
  tooltip,
  requiredSymbol = false,
  ...props
}: FormEditorProps<TFieldValues>) {
  const { mutateAsync } = useSingleUpload()

  async function upload(file: File) {
    const formData = new FormData()
    formData.append('files', file)
    formData.append('path', 'editor/images')
    return await mutateAsync(formData)
  }

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full text-left">
          <div className="flex items-center justify-start gap-2">
            {label && (
              <FormLabel {...labelProps}>
                {label}
                {requiredSymbol && (
                  <span className="text-destructive-600">*</span>
                )}
              </FormLabel>
            )}
            {tooltip}
          </div>
          <FormControl>
            <Editor
              {...props}
              {...field}
              value={field.value}
              onValueChange={field.onChange}
              immediatelyRender={false}
              upload={upload}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
