'use client'
import { Spinner } from '@hackquest/ui/shared/spinner'
import { Suspense } from 'react'
import { useHackathonInfo } from '../utils/use-hackathon-info'
import Annoucement from './announcement'
import Application from './application'
import Back from './back'
import Distribution from './distribution'
import Judging from './judging'
import ManageTabs from './manage-tabs'
import Overview from './overview'
import { Submission } from './submission'

const ManagePage = ({
  id,
  searchParams,
}: { id: string; searchParams: { tab: string } }) => {
  useHackathonInfo(id)
  const renderByTab = () => {
    switch (searchParams.tab) {
      case 'Application':
        return (
          <Suspense fallback={<Spinner className="m-auto" />}>
            <Application />
          </Suspense>
        )
      case 'Submission':
        return (
          <Suspense fallback={<Spinner className="m-auto" />}>
            <Submission />
          </Suspense>
        )
      case 'Judging':
        return (
          <Suspense fallback={<Spinner className="m-auto" />}>
            <Judging id={id} />
          </Suspense>
        )
      case 'Announcement':
        return (
          <Suspense fallback={<Spinner className="m-auto" />}>
            <Annoucement />
          </Suspense>
        )
      case 'Distribution':
        return (
          <Suspense fallback={<Spinner className="m-auto" />}>
            <Distribution id={id} />
          </Suspense>
        )
      default:
        return (
          <Suspense fallback={<Spinner className="m-auto" />}>
            <Overview />
          </Suspense>
        )
    }
  }
  return (
    <div className="container">
      <div className="flex gap-10 pb-6">
        <Back />
        <ManageTabs />
      </div>
      <div className='absolute left-0 mb-8 h-[1px] w-full bg-neutral-300 ' />
      <Suspense>{renderByTab()}</Suspense>
    </div>
  )
}

export default ManagePage

// {/* <div className="mt-8 mb-12 flex gap-10">
//         <Image
//           src="/images/ecosystem/level.svg"
//           alt=""
//           width={200}
//           height={200}
//           className="w-full rounded-xl object-cover"
//         />
//         <div className="">
//           <h1 className="title-1 text-primary-neutral">abc cdf cca</h1>
//           <div className="body-m text-neutral-700">
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit
//             amet purus accumsan, imperdiet nulla eget, scelerisque arcu. Morbi
//             accumsan, mauris sit amet placerat tincidunt, tellus nibh faucibus
//             felis, quis accumsan nulla orci sed erat. Integer commodo massa
//             vitae turpis facilisis, id laoreet mi volutpat. Morbi aliquam eget
//             odio in auctor.
//           </div>
//           <Button className="mt-8 w-4/5">
//             {t('viewDetails')}
//             <LuArrowRight />
//           </Button>
//         </div>
//       </div> */}
