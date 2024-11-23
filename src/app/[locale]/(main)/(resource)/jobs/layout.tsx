import { ProfileProvider } from '@/providers/jobs/profile-provider'

export default function UserProfileLayout({ children }: { children: React.ReactNode }) {
  return <ProfileProvider>{children}</ProfileProvider>
}
