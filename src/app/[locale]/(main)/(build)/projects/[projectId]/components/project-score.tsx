import { AnimatedNumber } from '@/components/common/animated-number'
import { Card } from './card'

export function ProjectScore({ score = 10 }: { score?: number }) {
  return (
    <Card data-complete={score >= 100} className="group">
      {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
      <label className="body-s text-neutral-400">
        {score >= 100
          ? 'You Can Submission Hackathon'
          : 'Can’t Submission Hackathon'}
      </label>
      <div className="mt-3 flex items-center gap-6">
        <div className="inline-flex size-[60px] items-center justify-center rounded-full border border-neutral-200 bg-neutral-50">
          <AnimatedNumber
            className="title-3 text-neutral-black group-data-[complete='false']:text-destructive-600"
            value={score}
          />
        </div>
        <span className="headline-m text-neutral-black group-data-[complete='false']:text-destructive-600">
          {score >= 100 ? 'Complete Project' : 'Incomplete Project'}
        </span>
      </div>
    </Card>
  )
}
