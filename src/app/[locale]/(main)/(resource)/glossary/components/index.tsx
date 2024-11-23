'use client'

import { usePathname, useRouter } from '@/app/navigation'
import PageHeader from '@/components/resource/blog-glossary/page-header'
import { createUrl } from '@/lib/utils'
import { AuthType, useAuthStore } from '@/store/auth'
import { useAuthenticated } from '@/store/user'
import { Button } from '@hackquest/ui/shared/button'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import { IoMdArrowForward } from 'react-icons/io'
import { useShallow } from 'zustand/react/shallow'
import type { GlossaryListType, OffsetTopsType } from '../constants/type'
import BackTop from './back-top'
import FilterLetter, { type LetterDataType } from './filter-letter'
import FilterTrack from './filter-track'
import GlossaryList from './glossary-list'
import SelectTrack from './select-track'
import SubmitWordModal from './submit-word-modal'

interface GlossaryProp {
  list: GlossaryListType[]
  letterData: LetterDataType[]
  tracks: string[]
  filterTracks: string[]
}
const GlossaryContent: React.FC<GlossaryProp> = ({
  list,
  letterData,
  tracks,
  filterTracks,
}) => {
  const t = useTranslations('Glossary')
  const isAuthenticated = useAuthenticated()
  const { setAuthType, setAuthModalOpen } = useAuthStore(
    useShallow(state => ({
      setAuthType: state.setAuthType,
      setAuthModalOpen: state.setAuthModalOpen,
    })),
  )
  const searchParams = useSearchParams()
  const currentParams = new URLSearchParams(searchParams.toString())
  const pathname = usePathname()
  const router = useRouter()
  const [submitOpen, setSubmitOpen] = useState(false)
  const [letter, setLetter] = useState('')
  const [isSticky, setIsSticky] = useState(false)
  const boxRef = useRef<HTMLDivElement>(null)
  const letterRef = useRef<HTMLDivElement>(null)
  const scrollTimeOut = useRef<NodeJS.Timeout | null>(null)
  const stickyTimeOut = useRef<NodeJS.Timeout | null>(null)
  const [offsetTops, setOffsetTops] = useState<OffsetTopsType[]>([])
  const isOnScroll = useRef(false)
  const [letterOffsetTop, setLetterOffsetTop] = useState(0)
  const letterClick = (val: string) => {
    setLetter(val)
    const index = letterData.findIndex(v => v.value === val)
    boxRef.current?.scrollTo({
      top: offsetTops[index]?.offsetTop,
    })
    isOnScroll.current = true
    setTimeout(() => {
      isOnScroll.current = false
    }, 100)
  }

  const trackClick = (val: string, isSelect?: boolean) => {
    if (isSelect) {
      getTrackList([val])
    } else {
      const newTracks = ~tracks.indexOf(val)
        ? tracks.filter(v => v !== val)
        : [...tracks, val]
      getTrackList(newTracks)
    }
    isOnScroll.current = true
    setTimeout(() => {
      isOnScroll.current = false
    }, 100)
  }
  const getTrackList = (newTracks: string[]) => {
    if (!newTracks.length) {
      currentParams.delete('track')
    } else {
      currentParams.set('track', newTracks.join(','))
    }
    const url = createUrl(pathname, currentParams)
    router.replace(url)
  }
  const onScroll = () => {
    const boxScrollTop = boxRef.current?.scrollTop || 0
    if (!stickyTimeOut.current) {
      stickyTimeOut.current = setTimeout(() => {
        stickyTimeOut.current = null
        setIsSticky(boxScrollTop >= letterOffsetTop - 1)
      }, 50)
    }
    if (!letterData.length || scrollTimeOut.current || isOnScroll.current)
      return
    scrollTimeOut.current = setTimeout(() => {
      scrollTimeOut.current = null
      for (let i = 0; i < offsetTops.length; i++) {
        if (
          boxScrollTop >=
          (offsetTops?.[offsetTops.length - 1]?.offsetTop as unknown as number)
        ) {
          setLetter(offsetTops[offsetTops.length - 1]?.letter as string)
          break
        } else if (
          boxScrollTop >= (offsetTops[i]?.offsetTop as unknown as number) &&
          boxScrollTop < (offsetTops[i + 1]?.offsetTop as unknown as number)
        ) {
          setLetter(offsetTops[i]?.letter as string)
          break
        }
      }
    }, 50)
  }

  const handleBackTop = () => {
    boxRef.current?.scrollTo({
      top: 0,
    })
    setLetter(letterData[0]?.value as string)
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const offsetTop = letterRef.current?.offsetTop || 0
    setLetterOffsetTop(offsetTop)
    handleBackTop()
  }, [list])

  return (
    <div className="absolute top-0 left-0 h-full w-full">
      <div
        className="scroll-wrap-y relative h-full w-full pt-6 pb-20 sm:pt-8 sm:pb-[7.5rem]"
        onScroll={onScroll}
        ref={boxRef}
      >
        <div className="px-6 sm:container">
          <PageHeader
            className={'mb-4 sm:mb-0 sm:h-[15rem]'}
            title={t('pageTitle')}
            description={t('pageDescription')}
            img={
              <>
                <Image
                  src={'/images/glossary/glossary_banner_bg.png'}
                  alt={'glossary-cover'}
                  width={273}
                  height={220}
                  className="absolute top-0 right-0 hidden sm:block"
                />
                <Image
                  src={'/images/glossary/glossary_banner_bg_mob.png'}
                  alt={'glossary-cover'}
                  width={48}
                  height={48}
                  className="sm:hidden"
                />
              </>
            }
            button={
              <Button
                className="flex w-fit items-center gap-[8px]"
                onClick={() => {
                  if (!isAuthenticated) {
                    setAuthType(AuthType.SIGN_IN)
                    setAuthModalOpen(true)
                  } else {
                    setSubmitOpen(true)
                  }
                }}
              >
                <span>{t('contributeButtonText')}</span>
                <IoMdArrowForward />
              </Button>
            }
          />
        </div>
        <div
          className={`top-[-2rem] left-0 z-[10] w-full bg-neutral-white pt-[1.25rem] sm:sticky `}
          ref={letterRef}
        >
          {letterData.length > 0 && (
            <FilterLetter
              letterData={letterData}
              letterClick={letterClick}
              letter={letter as string}
            />
          )}
          <FilterTrack
            filterTracks={filterTracks}
            tracks={tracks}
            trackClick={trackClick}
          />
          <SelectTrack
            filterTracks={filterTracks}
            tracks={tracks}
            trackClick={(track: string) => trackClick(track, true)}
          />
        </div>
        <div className="px-6 py-8 sm:container">
          <GlossaryList
            list={list}
            setOffsetTop={(tops: OffsetTopsType[]) => setOffsetTops(tops)}
          />
        </div>
        {isSticky && <BackTop handleBackTop={handleBackTop} />}
        <SubmitWordModal
          open={submitOpen}
          onClose={() => setSubmitOpen(false)}
        />
      </div>
    </div>
  )
}

export default GlossaryContent
