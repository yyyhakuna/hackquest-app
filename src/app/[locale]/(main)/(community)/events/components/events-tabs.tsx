'use client'
import { usePathname, useRouter } from '@/app/navigation'
import { createUrl } from '@/lib/utils'
import { Tabs, TabsIndicator, TabsList, TabsTrigger } from '@hackquest/ui/shared/tabs'
import { useSearchParams } from 'next/navigation'

interface Props extends React.HTMLAttributes<HTMLDivElement> {}
export async function EventsTabs({ className }: Props) {
  const searchParams = useSearchParams()
  const currentParams = new URLSearchParams(searchParams.toString())
  const pathname = usePathname()
  const paramsObject = Object.fromEntries(searchParams.entries())
  const { category } = paramsObject
  const router = useRouter()

  const tabList = ['All', 'Upcoming', 'Ongoing', 'Past']
  const tab = (category || tabList[0]) as string

  const updateCategory = (newCategory: string) => {
    if (newCategory === tab) return
    if (newCategory === 'All') {
      currentParams.delete('category')
    } else {
      currentParams.set('category', newCategory)
    }
    currentParams.delete('page')
    const url = createUrl(pathname, currentParams)
    router.replace(url)
  }

  return (
    <div className={className}>
      <Tabs defaultValue={tab} className="w-1/2" onValueChange={updateCategory}>
        <TabsList>
          {tabList.map((value, _index) => (
            <TabsTrigger value={value} key={value}>
              {value}
            </TabsTrigger>
          ))}
          <TabsIndicator />
        </TabsList>
      </Tabs>
      <div className="mt-4 h-[1px] bg-gray-200" />
    </div>
  )
}
