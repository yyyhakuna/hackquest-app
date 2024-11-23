'use client'
import {
  Carousel,
  CarouselNext,
  CarouselPrevious,
} from '@hackquest/ui/shared/carousel'
import {
  Tabs,
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from '@hackquest/ui/shared/tabs'

import useHighExplore from '@/hooks/hackathon-explore/use-high-explore'
import useQueryToUrl from '@/hooks/use-query-to-url'
import { Spinner } from '@hackquest/ui/shared/spinner'
import { Suspense } from 'react'
import { ExploreHighlightConfig } from './explore-hightlight-config'

const ExploreHighlight = () => {
  const { hackathonHighlightTab } = useHighExplore()

  const { searchParam, onChange } = useQueryToUrl({
    key: 'hight',
    defaultValue: hackathonHighlightTab[0]?.value,
    isScroll: true,
  })

  const ExploreHighlightConfigArray = Object.values(ExploreHighlightConfig)

  return (
    <div className=" pt-6">
      <Carousel>
        <Tabs
          defaultValue={searchParam ?? hackathonHighlightTab[0]?.value}
          onValueChange={(value: string) => {
            onChange(value)
          }}
        >
          <TabsList className="relative overflow-x-auto">
            {hackathonHighlightTab.map((highlightTab, index) => (
              <TabsTrigger key={index} value={highlightTab.value}>
                {highlightTab.label}
              </TabsTrigger>
            ))}

            <TabsIndicator />
            {/* mobile hidden */}
            <div className="absolute top-0 right-0 hidden h-full items-center sm:flex">
              <CarouselPrevious className="mr-[10px]" />
              <CarouselNext />
            </div>
          </TabsList>
          <div className="my-6 h-[1px] w-full bg-neutral-200" />
          <Suspense
            fallback={
              <div className="flex justify-center">
                <Spinner />
              </div>
            }
          >
            <div className="relative">
              {ExploreHighlightConfigArray.map((hightlight, index) => (
                <TabsContent key={index} value={hightlight.value}>
                  {hightlight.highlightCom}
                </TabsContent>
              ))}
            </div>
          </Suspense>
        </Tabs>
      </Carousel>
    </div>
  )
}

export default ExploreHighlight
