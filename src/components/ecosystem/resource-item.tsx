import { Link } from '@/app/navigation'
import { Card } from '@hackquest/ui/shared/card'
import Image from 'next/image'

export function ResourceItem() {
  return (
    <div className="my-6 space-y-6">
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
            Resource
          </span>
          <div className="flex items-center gap-3">
            <h3 className="title-5" title={'More Resources'}>
              More Resources
            </h3>
          </div>
        </div>
      </div>
      <div className="ml-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link href={'/'}>
          <Card className="space-y-4 rounded-2xl border-2 border-neutral-200 bg-neutral-white p-6">
            <div className="size-16">Logo</div>
            <h2 className="headline-l">Glossary</h2>
            <p className="body-s line-clamp-3 text-secondary-neutral">
              HackArcode is where retro meets innovation! Join us for a 24-hour
              hackathon combining arcade games and ..
            </p>
          </Card>
        </Link>
        <Link href={'/'}>
          <Card className="space-y-4 rounded-2xl border-2 border-neutral-200 bg-neutral-white p-6">
            <div className="size-16">Logo</div>
            <h2 className="headline-l">Glossary</h2>
            <p className="body-s line-clamp-3 text-secondary-neutral">
              HackArcode is where retro meets innovation! Join us for a 24-hour
              hackathon combining arcade games and ..
            </p>
          </Card>
        </Link>
      </div>
    </div>
  )
}
