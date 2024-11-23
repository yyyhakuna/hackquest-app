import { DeleteAlertDialog } from '@/components/common/delete-alert-dialog'
import type { HackathonRewards } from '@/graphql/generated/graphql'
import { useDeleteHackathonRewardMutation } from '@/graphql/generated/hooks'
import { useToggle } from '@/hooks/utils/use-toggle'
import { separationNumber } from '@/lib/utils'
import { Separator } from '@hackquest/ui/shared/separator'
import toast from 'react-hot-toast'
import { FiEdit } from 'react-icons/fi'
import { LuChevronsDown, LuChevronsUp, LuTrash } from 'react-icons/lu'

export function RewardPreview({
  reward,
  onEdit,
  index,
  length,
  onChangeOrder,
}: {
  index: number
  length: number
  reward: Omit<HackathonRewards, 'hackathon'>
  onEdit: () => void
  onChangeOrder: (
    reward: Omit<HackathonRewards, 'hackathon'> | null,
    type: 'up' | 'down',
  ) => void
}) {
  const [open, onOpenChange] = useToggle(false)

  const remove = useDeleteHackathonRewardMutation({
    meta: {
      invalidates: [['FindUniqueHackathon']],
    },
    onSuccess: () => {
      toast.success('Track deleted')
      onOpenChange(false)
    },
  })

  return (
    <div className="grid grid-cols-[200px_1px_1fr] gap-5 rounded-2xl border border-neutral-300 p-6">
      <div className="flex flex-col items-center">
        <h2 className="title-3 w-full truncate whitespace-nowrap text-center">
          {separationNumber(reward.totalRewards ?? 0)} {reward.currency}
        </h2>
        <p className="body-s mt-3 mb-5 w-full truncate text-center text-secondary-neutral">
          {reward.name}
        </p>
        <div className="flex items-center gap-6 px-4">
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
          {index > 0 && (
            <button
              type="button"
              className="outline-none"
              onClick={() => onChangeOrder(reward, 'up')}
            >
              <LuChevronsUp className="size-5" />
            </button>
          )}
          {index < length - 1 && (
            <button
              type="button"
              className="outline-none"
              onClick={() => onChangeOrder(reward, 'down')}
            >
              <LuChevronsDown className="size-5" />
            </button>
          )}
        </div>
      </div>
      <Separator orientation="vertical" />
      {reward.mode === 'RANK' ? (
        <ul className="flex flex-col gap-3">
          {reward.rewards?.map((item: any) => (
            <li className="flex items-center justify-between" key={item.id}>
              <span className="body-s text-neutral-400">{item.label}</span>
              <span className="headline-m">
                {separationNumber(item.value)} {reward.currency}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: reward.rule }}
        />
      )}
      <DeleteAlertDialog
        open={open}
        onOpenChange={onOpenChange}
        title="Delete Prize Track"
        loading={remove.isPending}
        description="Are you sure you want to delete this prize track? This action cannot be undone."
        onConfirm={() => remove.mutate({ rewardId: String(reward.id) })}
      />
    </div>
  )
}
