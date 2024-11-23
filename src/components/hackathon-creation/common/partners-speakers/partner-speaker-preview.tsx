import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@hackquest/ui/shared/avatar'
import type React from 'react'
import {
  HackathonPartnerAccountValueType,
  type HackathonPartnersContentType,
} from '../../constants/type'
import PreviewHeader from '../preview-header'

type PartnerSpeakerPreviewProp = {
  initValue: HackathonPartnersContentType
  onEdit: VoidFunction
  onDelete: VoidFunction
}

const PartnerSpeakerPreview: React.FC<PartnerSpeakerPreviewProp> = ({
  initValue,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-neutral-300 px-6 py-3">
      <PreviewHeader
        title={initValue.title}
        onEdit={onEdit}
        onDelete={onDelete}
      />
      <div className="flex w-full flex-wrap gap-3">
        {initValue.accounts?.map(v => (
          <div
            className="body-s flex w-[calc((100%-0.75rem)/2)] flex-col gap-3 rounded-[.375rem] border border-neutral-300 p-2 text-neutral-800"
            key={v.id}
          >
            <div className="flex items-center gap-2 ">
              <Avatar className="size-8">
                <AvatarImage className="object-cover" src={v.avatar} />
                <AvatarFallback className="bg-neutral-100">
                  {v.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <p className="line-clamp-1 flex-1 flex-shrink-0">{v.name}</p>
            </div>
            {initValue.type === HackathonPartnerAccountValueType.INTRO && (
              <div
                className={`line-clamp-1 h-[1.3125rem] ${!v.intro && 'text-neutral-400'}`}
              >
                {v.intro || 'No one-line intro'}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default PartnerSpeakerPreview
