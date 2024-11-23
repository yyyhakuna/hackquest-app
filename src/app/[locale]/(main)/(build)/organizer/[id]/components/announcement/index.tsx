import { Suspense } from 'react'
import AnnouncementList from './announcement-list'
import ReceiverList from './receiver-list'
const Page = () => {
  return (
    <div className="mt-8">
      <div className="space-y-4">
        <div className="title-3 text-primary-neutral">
          Event-Based Announcements
        </div>
        <div className="body-m text-secondary-neutral">
          Event-based announcements are triggered by key events or milestones
          within the hackathon and ensure that users are kept informed about
          important updates.
        </div>
      </div>
      <Suspense>
        <ReceiverList />
      </Suspense>
      <div className="mt-10 space-y-4">
        <div className="title-3 text-primary-neutral">
          User-Specific Announcements
        </div>
        <div className="body-m text-secondary-neutral">
          User-specific announcements allow for personalized communication,
          enabling you to tailor messages based on the needs or behaviors of
          selected users. With targeted announcements, you can select specific
          users, customize the message and schedule delivery.
        </div>
      </div>
      <AnnouncementList />
    </div>
  )
}

export default Page
