import type { EcosystemInfo } from '@/graphql/generated/graphql'
import { cn } from '@hackquest/ui/lib/utils'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@hackquest/ui/shared/card'
import Image from 'next/image'
import { PiCode } from 'react-icons/pi'

export function EcosystemCard({
  ecosystem,
  className,
}: {
  ecosystem: EcosystemInfo
  className?: string
}) {
  return (
    <Card>
      <CardContent className={cn('space-y-4 p-4', className)}>
        <div className="relative size-12 p-2">
          <Image
            src={ecosystem.basic?.image}
            alt={ecosystem.name}
            fill
            className="rounded-full"
          />
        </div>
        <CardTitle className="headline-m sm:headline-l line-clamp-1">
          {ecosystem.name}
        </CardTitle>
        <CardDescription className="body-m hidden h-[4.5rem] text-secondary-neutral sm:line-clamp-3">
          {ecosystem.description}
        </CardDescription>
        <CardFooter className="flex items-center gap-5 p-0 text-neutral-600">
          <div className="flex items-center gap-2">
            <PiCode className="size-4" />
            <span className="body-s">{ecosystem.basic?.language}</span>
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  )
}
