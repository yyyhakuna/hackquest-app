import { HackathonActionButton } from '@/components/hackathon/hackathon-action-button'
import type { HackathonExtend } from '@/graphql/generated/hooks'
import {
  Tabs,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from '@hackquest/ui/shared/tabs'
import type React from 'react'
import { infoTabs } from '../../constants/data'
import type { InfoType } from '../../constants/type'
import Back from '../back'

interface InfoTabsProps {
  curTab: InfoType
  changeCurTab: (tab: InfoType) => void
  isSticky: boolean
  hackathon: HackathonExtend
}

const InfoTabs: React.FC<InfoTabsProps> = ({
  curTab,
  changeCurTab,
  isSticky,
  hackathon,
}) => {
  return (
    <>
      <div
        className={`container relative hidden h-[6.25rem] items-center justify-center sm:flex`}
      >
        {isSticky && <div className='absolute top-0 left-[2rem] flex h-full items-center'>
          <Back /></div>}
        <div className="flex items-center gap-6">
          <Tabs
            className="rounded-[.75rem] bg-neutral-100 p-[.375rem]"
            value={curTab}
            onValueChange={tab => changeCurTab(tab as unknown as InfoType)}
          >
            <TabsList className="headline-s gap-6">
              {infoTabs.map(v => (
                <TabsTrigger
                  key={v.value}
                  value={v.value}
                  className="data-[state=active]:bg-neutral-white data-[state=inactive]:hover:bg-neutral-white"
                >
                  {v.label}
                </TabsTrigger>
              ))}
              <TabsIndicator className="bg-neutral-white" />
            </TabsList>
          </Tabs>
          {isSticky && (
            <div className='absolute top-0 right-[2rem] flex h-full items-center'>
              <HackathonActionButton
              hackathon={hackathon}
              className="h-[52px]"
              showArrow={false}
              isDetail={true}
            />
            </div>
            
          )}
        </div>
      </div>
      <div className="sm:hidden">
        {isSticky && (
          <div className="flex h-[3.5rem] items-center px-6 ">
            <Back />
          </div>
        )}
        <div className="no-scrollbar overflow-auto border-neutral-200 border-t px-6">
          <Tabs
            className="w-fit rounded-[.75rem] py-3"
            value={curTab}
            onValueChange={tab => changeCurTab(tab as unknown as InfoType)}
          >
            <TabsList className="headline-s gap-3">
              {infoTabs.map(v => (
                <TabsTrigger
                  key={v.value}
                  value={v.value}
                  className="data-[state=active]:bg-neutral-100 data-[state=inactive]:hover:bg-neutral-white"
                >
                  {v.label}
                </TabsTrigger>
              ))}
              <TabsIndicator className="bg-neutral-100" />
            </TabsList>
          </Tabs>
        </div>
      </div>
    </>
  )
}

export default InfoTabs
