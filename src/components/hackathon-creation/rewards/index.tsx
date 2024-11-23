import type { HackathonRewards } from '@/graphql/generated/graphql'
import { useUpdateHackathonRewardMutation } from '@/graphql/generated/hooks'
import { useHackathonQuery } from '@/hooks/hackathon/query'
import { useSetState } from '@/hooks/use-set-state'
import { useHackathonCreationContext } from '@/providers/hackathon/hackathon-creation-provider'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Button } from '@hackquest/ui/shared/button'
import { Callout, CalloutText } from '@hackquest/ui/shared/callout'
import { Label } from '@hackquest/ui/shared/label'
import { useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { LuPlus } from 'react-icons/lu'
import SectionButton from '../common/section-button'
import { EditReward } from './edit-reward'
import { RewardPreview } from './reward-preview'

type IDs = {
  creating: string[]
  editing: number[]
}

export function Rewards() {
  const queryClient = useQueryClient()
  const { data: hackathon } = useHackathonQuery()
  const context = useHackathonCreationContext()
  const [parent] = useAutoAnimate()

  const [ids, setIds] = useSetState<IDs>({
    creating: [],
    editing: [],
  })

  const rewards = hackathon?.rewards || []

  const sortedRewards = rewards.sort((a, b) => a.order - b.order)

  const isValid = rewards.length > 0

  function onCancel(cancelId: number | string) {
    if (typeof cancelId === 'number') {
      setIds({
        editing: ids.editing.filter(id => id !== cancelId),
      })
    } else {
      setIds({
        creating: ids.creating.filter(id => id !== cancelId),
      })
    }
  }

  function onCreate() {
    setIds({ creating: [...ids.creating, crypto.randomUUID()] })
  }

  function onEdit(editingId: number) {
    setIds({ editing: [...ids.editing, editingId] })
  }

  const mutation = useUpdateHackathonRewardMutation({
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['FindUniqueHackathon'] })
    },
  })

  function onChangeOrder(
    reward: Omit<HackathonRewards, 'hackathon'> | null,
    type: 'up' | 'down',
  ) {
    const newRewards = structuredClone(sortedRewards)
    const index = newRewards.findIndex(v => v.id === reward?.id)
    const changedIndex = type === 'up' ? index - 1 : index + 1

    const changedOrder = newRewards[changedIndex]?.order || 1

    toast.promise(
      mutation.mutateAsync({
        rewardId: String(reward?.id),
        data: {
          order: {
            set: changedOrder,
          },
        },
      }),
      {
        loading: 'Updating order...',
        success: 'Order updated',
        error: 'Failed to update order',
      },
    )
  }

  function onValid() {
    if (!isValid) {
      toast.error('Please add at least one prize track')
      return
    }
    context.setSelectedTab('judges')
  }

  return (
    <div className="flex flex-col gap-6">
      {!isValid && (
        <Callout className="rounded-lg bg-neutral-100 px-6 py-3">
          <CalloutText className="body-s font-normal">
            Please add at least one prize track
          </CalloutText>
        </Callout>
      )}
      <div className="space-y-4" ref={parent}>
        <Label>Prize Track</Label>
        {sortedRewards.map(reward =>
          ~ids.editing.indexOf(reward.id) ? (
            <EditReward
              key={reward.id}
              initialValues={reward}
              rewards={sortedRewards}
              onCancel={() => onCancel(reward.id)}
            />
          ) : (
            <RewardPreview
              key={reward.id}
              onEdit={() => onEdit(reward.id)}
              onChangeOrder={onChangeOrder}
              reward={reward}
              index={rewards.findIndex(v => v.id === reward.id)}
              length={rewards.length}
            />
          ),
        )}
        {ids.creating.map(addedId => (
          <EditReward
            key={addedId}
            initialValues={null}
            rewards={sortedRewards}
            onCancel={() => onCancel(addedId)}
          />
        ))}
        <Button className="w-full" onClick={onCreate}>
          <LuPlus className="size-5" />
          <span className="headline-m">Add Prize Track</span>
        </Button>
      </div>
      <SectionButton onContinue={onValid} />
    </div>
  )
}
