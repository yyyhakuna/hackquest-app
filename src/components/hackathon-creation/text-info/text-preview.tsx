import type React from 'react'
import { useMemo } from 'react'
import PreviewHeader from '../common/preview-header'
import {
  type HackathonTextInfoContentType,
  HackathonTextInfoValueType,
} from '../constants/type'

interface TextPreviewProp {
  type: HackathonTextInfoValueType
  initValue: HackathonTextInfoContentType
  onEdit: VoidFunction
  onDelete: VoidFunction
}

const TextPreview: React.FC<TextPreviewProp> = ({
  initValue,
  type,
  onEdit,
  onDelete,
}) => {
  const title = useMemo(() => {
    switch (type) {
      case HackathonTextInfoValueType.FAQS:
        return 'FAQS'
      case HackathonTextInfoValueType.RESOURCE:
        return 'Resources'
      default:
        return initValue.title
    }
  }, [type, initValue])
  const renderComponent = useMemo(() => {
    switch (type) {
      case HackathonTextInfoValueType.FAQS:
        return (
          <>
            <p className="headline-m mt-4">{initValue.question}</p>
            <div
              className="prose mt-3"
              dangerouslySetInnerHTML={{
                __html: initValue.description as string,
              }}
            />
          </>
        )

      default:
        return (
          <>
            <div
              className="prose mt-3"
              dangerouslySetInnerHTML={{
                __html: initValue.description as string,
              }}
            />
          </>
        )
    }
  }, [type, initValue])

  return (
    <div className="rounded-xl border border-neutral-300 px-6 py-3">
      <PreviewHeader
        title={title as string}
        onEdit={onEdit}
        onDelete={onDelete}
      />
      {renderComponent}
    </div>
  )
}

export default TextPreview
