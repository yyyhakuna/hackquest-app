import type { HighlightBuilderQuery } from '@/graphql/generated/hooks'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@hackquest/ui/shared/card'
import { Tag } from '@hackquest/ui/shared/tag'
import Image from 'next/image'
import { HiOutlineLocationMarker } from 'react-icons/hi'

type HighlightBuilderQueryNotNull = Exclude<
  HighlightBuilderQuery['highlightBuilder'],
  null | undefined
>

interface BuilderHighlightCardProps {
  builderHighlightInfo: HighlightBuilderQueryNotNull[number]
}

const BuilderHighlightCard = (props: BuilderHighlightCardProps) => {
  const { builderHighlightInfo } = props

  return (
    <>
      <Card className="relative p-6">
        <div className="absolute top-6 right-6">
          <Image
            src="/images/explore/hot.png"
            alt="hot"
            width={32}
            height={32}
          />
        </div>
        <div className="flex justify-center">
          <Image
            src={
              builderHighlightInfo?.avatar ??
              '/images/explore/builde_avatar.png'
            }
            alt="builde_avatar"
            className="rounded-full"
            width={80}
            height={80}
          />
        </div>
        <CardHeader className="title-5 py-6 text-center text-[1.5rem] text-primary-neutral">
          {builderHighlightInfo?.nickname}
        </CardHeader>
        <div className="body-s flex h-[21px] items-center justify-center gap-[6px] text-primary-neutral">
          {builderHighlightInfo?.location && <HiOutlineLocationMarker />}
          <p> {builderHighlightInfo?.location}</p>
        </div>
        <CardContent className="body-s my-6 line-clamp-2 min-h-[42px] p-0 text-secondary-neutral">
          {builderHighlightInfo?.bio}
        </CardContent>
        <CardFooter className="gap-[6px] p-0">
          {builderHighlightInfo.profile?.techStack.map(
            (stack: string, index: number) => (
              <Tag
                key={index}
                className="body-s bg-tag-grey py-[2px] text-primary-neutral"
              >
                {stack}
              </Tag>
            ),
          )}

          {(!builderHighlightInfo.profile ||
            builderHighlightInfo.profile?.techStack.length === 0) && (
            <div className="h-[25px] py-[2px]" />
          )}
        </CardFooter>
      </Card>
    </>
  )
}

export default BuilderHighlightCard
