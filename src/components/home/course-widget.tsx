import { Link } from '@/app/navigation'
import { AspectRatio } from '@hackquest/ui/shared/aspect-ratio'
import Image from 'next/image'
import { LuArrowRight } from 'react-icons/lu'

export function CourseWidget() {
  return (
    <div className="space-y-4 border-t border-t-neutral-300 p-6">
      <AspectRatio ratio={16 / 9}>
        <Image
          src="https://devonblog.com/wp-content/uploads/2021/03/hackathon1.png"
          fill
          alt="Hackathon"
          className="rounded-lg"
        />
      </AspectRatio>
      <h3 className="title-5">Hackathon Learning Quest #1</h3>
      <Link href="/" className="inline-flex items-center gap-1">
        <p className="headline-s">Explore Course</p>
        <LuArrowRight className="size-4" />
      </Link>
    </div>
  )
}
