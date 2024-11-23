'use client'
import SearchZone from '@/app/[locale]/(main)/(build)/organizer/[id]/components/search-zone'
import { Suspense, useState } from 'react'
import Back from '../../../component/back'
import { CoLearningTable } from './colearning-table'

const Index = () => {
  const [searchWords, _setSearchWords] = useState('')
  return (
    <div className="container">
      <Back className='headline-s pt-[22px] pb-[55px]' />
      <div className="absolute mb-8 ml-[-32px] h-[1px] w-full bg-neutral-300 " />
      <SearchZone inputValue={searchWords} className="mt-8 mb-6" />
      <Suspense>
        <CoLearningTable searchWords={searchWords} />
      </Suspense>
    </div>
  )
}

export default Index
