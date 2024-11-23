import HackathonJudge from '@/components/hackathon/hackathon-judge-reward/hackathon-judge'
import type {
  HackathonJudgeUpdate,
} from '@/graphql/generated/hooks'
import { Dialog, DialogContent } from '@hackquest/ui/shared/dialog'
import type React from 'react'

interface TrackModalProp {
  open: boolean
  onClose: VoidFunction
  judge: HackathonJudgeUpdate
}

const TrackModal: React.FC<TrackModalProp> = ({ open, onClose, judge }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="!rounded-none flex h-screen w-screen max-w-[100vw] justify-center sm:max-w-[100vw] sm:bg-neutral-200">
        <div className="no-scrollbar flex h-full w-full flex-col gap-6 overflow-auto sm:w-[51.5rem] sm:rounded-[1.5rem] sm:bg-neutral-white sm:p-8">
          <HackathonJudge judge={judge} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default TrackModal
