import { Link } from '@/app/navigation'
import type { CourseExtend } from '@/graphql/generated/graphql'
import Image from 'next/image'
import { LuChevronRight } from 'react-icons/lu'
import { UnitItem } from './unit-item'

export function CourseItem({
  course,
  href,
}: {
  course: CourseExtend
  href: string
}) {
  return (
    <div className="mt-6 space-y-6">
      <Link href={href}>
        <div className="flex items-center gap-3 rounded-lg p-1 transition-colors duration-300 hover:bg-neutral-100">
          <div className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-neutral-300 bg-neutral-white">
            <Image
              src="/images/project/project-default.png"
              alt="phase"
              width={32}
              height={32}
            />
          </div>
          <div className="flex flex-col items-start gap-1">
            <span className="body-xs font-semibold text-secondary-neutral">
              {course?.type}
            </span>
            <div className="flex items-center gap-3">
              <h3 className="title-5" title={course?.title}>
                {course?.title}
              </h3>
              <div className="flex items-center gap-1">
                <span className="body-s font-normal text-neutral-600">+20</span>
                <Image
                  src="/images/layout/coin.svg"
                  alt="coin"
                  width={16}
                  height={16}
                />
              </div>
            </div>
          </div>
          <LuChevronRight className="ml-auto size-6 text-secondary-neutral" />
        </div>
      </Link>
      <div className="ml-12 space-y-4">
        {course.units?.map(unit => (
          <UnitItem key={unit.id} unit={unit} alias={course?.alias} />
        ))}
      </div>
    </div>
  )
}
