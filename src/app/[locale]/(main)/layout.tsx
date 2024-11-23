import { SidebarWeb } from '@/components/layouts/sidebar'
import { Topbar } from '@/components/layouts/topbar'
import { type FC, type ReactNode, Suspense } from 'react'

interface MainLayoutProps {
  children: ReactNode
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <Suspense>
      <div className="flex h-screen w-screen">
        <SidebarWeb className="hidden sm:flex" />
        <div className="flex h-full w-full flex-1 flex-col">
          <Topbar />
          <main className="relative w-full flex-1 overflow-y-auto scroll-smooth pt-6 pb-20 sm:pt-8 sm:pb-[7.5rem]">
            {children}
          </main>
        </div>
      </div>
    </Suspense>
  )
}

export default MainLayout
