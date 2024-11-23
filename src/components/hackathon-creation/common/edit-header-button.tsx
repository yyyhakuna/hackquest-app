import { Button } from '@hackquest/ui/shared/button'
import type React from 'react'

interface EditHeaderButtonProp {
  confirmDisabled?: boolean
  onCancel: VoidFunction
  confirmLoading?: boolean
  title?: string | null
}

const EditHeaderButton: React.FC<EditHeaderButtonProp> = ({
  confirmDisabled = false,
  onCancel,
  confirmLoading = false,
  title,
}) => {
  return (
    <div className='flex items-center justify-between'>
      {title && <p className="headline-m text-neutral-800">{title}</p>}
      <div className="flex flex-1 justify-end gap-4">
        <Button
          type="submit"
          size={'small'}
          loading={confirmLoading}
          disabled={confirmDisabled}
        >
          Confirm
        </Button>
        <Button
          variant={'outline'}
          size={'small'}
          color={'neutral'}
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}

export default EditHeaderButton
