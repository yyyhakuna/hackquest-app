import {
  partnersData,
  speakerJudgesData,
} from '@/components/hackathon-creation/constants/data'
import {
  type HackathonPartnersContentType,
  type HackathonPartnersSpeakersValueType,
  HackathonSectionsValue,
} from '@/components/hackathon-creation/constants/type'
import type { HackathonExtend } from '@/graphql/generated/hooks'
import type React from 'react'
import { useMemo } from 'react'
import MoreSection from './more-section'
import Customs from './old/customs'
import Partners from './old/partners'
import Sponsors from './old/sponsors'

interface MoreInfoProp {
  hackathon: HackathonExtend
}

const MoreInfo: React.FC<MoreInfoProp> = ({ hackathon }) => {
  const sections = hackathon?.info?.sections || {}
  const partnersValues = [
    ...partnersData.map(v => v.value),
    ...speakerJudgesData.map(v => v.value),
  ]
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const getSectionInfo = useMemo(() => {
    let isOld = true
    for (const k in sections) {
      const keys = Object.keys(sections[k])
      if (
        keys.some(
          v => ~partnersValues.indexOf(v as HackathonPartnersSpeakersValueType),
        )
      ) {
        isOld = false
        break
      }
    }
    let partners: HackathonPartnersContentType[] = []

    if (!isOld) {
      const sectionKey = [
        {
          key: HackathonSectionsValue.PARTNERS,
          values: partnersData.map(v => v.value),
        },
        {
          key: HackathonSectionsValue.SPEAKERS_JUDGES,
          values: speakerJudgesData.map(v => v.value),
        },
      ]
      sectionKey.map(sec => {
        if (sections[sec.key]) {
          sec.values.map(v => {
            if (sections[sec.key][v]?.length > 0) {
              partners = [...partners, ...sections[sec.key][v]]
            }
          })
        }
      })
    }
    return {
      isOld,
      partners,
    }
  }, [sections])
  return (
    <div className="flex flex-col gap-12">
      {getSectionInfo.isOld ? (
        <>
          <Sponsors
            hackathon={hackathon}
            title={'Speakers & Judges'}
            type="speakers"
          />
          <Sponsors hackathon={hackathon} title={'Sponsors'} type="sponsors" />
          <Partners
            hackathon={hackathon}
            title={'Media Partners'}
            type="mediaPartners"
          />
          <Partners
            hackathon={hackathon}
            title={'Community Partners'}
            type="communityPartners"
          />
          <Partners hackathon={hackathon} title={'Partners'} type="partners" />
          <Partners hackathon={hackathon} title={'Cohost'} type="coHosts" />
          <Partners hackathon={hackathon} title={'Host'} type="hosts" />
          <Customs hackathon={hackathon} />
        </>
      ) : (
        getSectionInfo.partners?.map(v => (
          <MoreSection key={v.id} partner={v} />
        ))
      )}
    </div>
  )
}

export default MoreInfo
