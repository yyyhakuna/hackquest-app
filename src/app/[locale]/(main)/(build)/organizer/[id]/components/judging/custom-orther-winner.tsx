import {
  type ProjectInfo,
  useCreateHackathonWinnerMutation,
} from '@/graphql/generated/hooks'
import { Input } from '@hackquest/ui/shared/input'
import { useTranslations } from 'next-intl'
import { type Dispatch, type SetStateAction, Suspense, useState } from 'react'
import toast from 'react-hot-toast'
import OtherWinnerCard from './other-winner-card'

const CustomOtherWinner = ({
  defaultTrack,
  rewardId,
  setCunstomOrtherWinnerNum,
}: {
  defaultTrack: string
  rewardId: number
  setCunstomOrtherWinnerNum: Dispatch<SetStateAction<number>>
}) => {
  const t = useTranslations('HackathonOrganizer.manage')
  const { mutateAsync, isPending } = useCreateHackathonWinnerMutation({
    onSuccess: () => {
      setCunstomOrtherWinnerNum(prev => prev - 1)
      setSearchWords('')
      setRewardWords('')
    },
  })
  const [searchWords, setSearchWords] = useState('')
  const [rewardWords, setRewardWords] = useState('')
  const [selected, setSelected] = useState<ProjectInfo>()

  return (
    <div>
      <Input
        placeholder={t('typeToSearch')}
        className="relative h-[72px] px-6 pl-[24%]"
        value={searchWords}
        onChange={e => {
          setSearchWords(e.target.value)
        }}
      >
        <Input
          placeholder="e.g. First Prize, Best TeamWork..."
          className=" absolute left-3 h-12 w-[21%]"
          value={rewardWords}
          onChange={e => {
            setRewardWords(e.target.value)
          }}
          onKeyDown={event => {
            if (event.key === 'Enter' && !isPending) {
              if (!selected) {
                toast.error('Please choose a project')
                return
              }
              if (!rewardWords) {
                toast.error('Reward name cannot be null')
                return
              }
              toast.promise(
                mutateAsync({
                  data: {
                    projectId: selected.id,
                    name: rewardWords,
                    hackathonId: selected.hackathonId!,
                    rewardId,
                    type: 'orther',
                  },
                }),
                {
                  loading: 'Updating',
                  success: 'Update Success',
                  error: 'Failed to Update',
                },
              )
            }
          }}
        />
      </Input>
      <Suspense>
        <OtherWinnerCard
          searchWords={searchWords}
          selected={selected}
          setSelected={setSelected}
          defaultTrack={defaultTrack}
        />
      </Suspense>
    </div>
  )
}

export default CustomOtherWinner
