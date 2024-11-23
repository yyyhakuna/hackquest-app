import { Link } from '@/app/navigation'
import { AspectRatio } from '@hackquest/ui/shared/aspect-ratio'
import { Card } from '@hackquest/ui/shared/card'
import { Tag } from '@hackquest/ui/shared/tag'
import Image from 'next/image'

export function HackathonItem() {
  return (
    <div className="mt-6 space-y-6">
      <div className="flex items-center gap-3 p-1">
        <div className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-neutral-300 bg-neutral-white">
          <Image
            src="/images/project/project-default.png"
            alt="phase"
            width={32}
            height={32}
          />
        </div>
        <div className="flex flex-col items-start gap-1">
          <span className="body-xs font-semibold text-secondary-neutral uppercase">
            build
          </span>
          <div className="flex items-center gap-3">
            <h3 className="title-5" title={'Join Hackathon'}>
              Join Hackathon
            </h3>
          </div>
        </div>
      </div>
      <div className="ml-12 space-y-4">
        <Link href={'/'}>
          <Card className="grid gap-6 rounded-xl border-2 border-neutral-200 bg-neutral-white p-4 sm:grid-cols-[1fr_329px] sm:p-6">
            <div className="sm:py-6">
              <h3 className="font-bold font-next-book text-lg leading-none sm:text-2xl">
                HackTheSpace Season 2
              </h3>
              <p className="body-s mt-3 text-secondary-neutral">
                HackArcode is where retro meets innovation! Join us for a
                24-hour hackathon combining arcade games and ..
              </p>
              <div className="mt-3 flex flex-wrap gap-3 sm:mt-6">
                <Tag className="headline-s rounded bg-success-100 px-2 py-1">
                  Live
                </Tag>
                <Tag className="headline-s rounded bg-blue-100 px-2 py-1">
                  19 days left
                </Tag>
              </div>
            </div>
            <AspectRatio ratio={16 / 9}>
              <Image
                src="https://devonblog.com/wp-content/uploads/2021/03/hackathon1.png"
                alt="hackathon"
                fill
                className="rounded-xl"
              />
            </AspectRatio>
          </Card>
        </Link>
      </div>
    </div>
  )
}
