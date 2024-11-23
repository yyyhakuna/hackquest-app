'use client'
import type { User } from '@/graphql/generated/hooks'
import type React from 'react'
import { useRef } from 'react'
import Header from './header'
import MyHackathon from './my-hackathon'
import MyProject from './my-project'
import MyVoting from './my-voting'

interface BuilderHomeProp {
  userInfo: User
}

const BuilderHome: React.FC<BuilderHomeProp> = ({ userInfo }) => {
  const boxRef = useRef<HTMLDivElement>(null)
  const scrollToRef = (ref: HTMLDivElement) => {
    if (!ref) return
    boxRef.current?.scrollTo({
      top: ref.offsetTop - 30,
    })
  }
  return (
    <div className="absolute top-0 left-0 h-full w-full">
      <div
        className='scroll-wrap-y h-full gap-8 pt-6 pb-20 sm:pt-8 sm:pb-[7.5rem]'
        ref={boxRef}
      >
        <div className=" relative flex flex-col gap-8 px-6 sm:container sm:gap-[4rem] ">
          <Header />
          <MyProject />
          <MyHackathon scrollToRef={scrollToRef} />
          <MyVoting
            scrollToRef={scrollToRef}
            userInfo={userInfo as unknown as User}
          />
        </div>
      </div>
    </div>
  )
}

export default BuilderHome
