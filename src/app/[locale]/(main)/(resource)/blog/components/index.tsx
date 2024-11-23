'use client'

import { usePathname, useRouter } from '@/app/navigation'
import { Link } from '@/app/navigation'
import { Pagination } from '@/components/common/pagination'
import PageHeader from '@/components/resource/blog-glossary/page-header'
import type { Blog } from '@/graphql/generated/hooks'
import { createUrl } from '@/lib/utils'
import { Button } from '@hackquest/ui/shared/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@hackquest/ui/shared/select'
import {
  Tabs,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from '@hackquest/ui/shared/tabs'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import type React from 'react'
import { useTransition } from 'react'
import { IoMdArrowForward } from 'react-icons/io'
import { PAGE_LIMIT, categories, contributeLink } from '../constants/data'
import BlogsContent from './blogs-content'
import FeaturedContent from './featured-content'

interface BlogProp {
  blog: {
    data: Blog[]
    total: number
  }
  featuredBlogs: Blog[]
}
const BlogContent: React.FC<BlogProp> = ({ blog, featuredBlogs }) => {
  const searchParams = useSearchParams()
  const currentParams = new URLSearchParams(searchParams.toString())
  const pathname = usePathname()
  const page = Number(searchParams.get('page') || 1)
  const category = searchParams.get('category')
  const [_isPending, startTransition] = useTransition()
  const t = useTranslations('Blog')
  const tab = (category || categories[0]?.value) as string
  const router = useRouter()
  const updateCategory = (newCategory: string) => {
    if (newCategory === tab) return
    if (newCategory === 'all') {
      currentParams.delete('category')
    } else {
      currentParams.set('category', newCategory)
    }
    currentParams.delete('page')
    const url = createUrl(pathname, currentParams)
    startTransition(() => {
      router.replace(url)
    })
  }
  const updatePage = (newPage: number) => {
    if (newPage === page) return
    if (newPage === 1) {
      currentParams.delete('page')
    } else {
      currentParams.set('page', String(newPage))
    }
    const url = createUrl(pathname, currentParams)
    startTransition(() => {
      router.replace(url)
    })
  }
  return (
    <div className="px-6 pb-[100px] sm:container">
      <PageHeader
        className={'pb-6 sm:h-[17.5rem] sm:pb-0'}
        title={t('pageTitle')}
        description={t('pageDescription')}
        img={
          <>
            <Image
              src={'/images/blog/blog_banner_bg.png'}
              alt={'blog-cover'}
              width={606}
              height={240}
              className="absolute top-0 right-0 hidden sm:block"
            />
            <Image
              src={'/images/blog/blog_banner_bg_mob.png'}
              alt={'blog-cover'}
              width={48}
              height={48}
              className="sm:hidden"
            />
          </>
        }
        button={
          <Link href={contributeLink} target="_blank" className="w-fit">
            <Button className="flex items-center gap-[8px]">
              <span>{t('contributeButtonText')}</span>
              <IoMdArrowForward />
            </Button>
          </Link>
        }
      />
      <Tabs
        defaultValue={tab}
        onValueChange={updateCategory}
        className="hidden sm:block"
      >
        <TabsList className="headline-s flex justify-start gap-4">
          {categories.map(v => (
            <TabsTrigger
              key={v.value}
              value={v.value}
              className="flex w-fit gap-[0.5rem] text-neutral-800"
            >
              {v.icon && v.icon}
              {v.label}
            </TabsTrigger>
          ))}
          <TabsIndicator />
        </TabsList>
      </Tabs>
      <div className="sm:hidden">
        <Select onValueChange={updateCategory} defaultValue={tab}>
          <SelectTrigger className="w-[11.25rem]">
            <SelectValue placeholder="Select a track" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(v => (
              <SelectItem key={v.value} value={v.value}>
                {v.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <FeaturedContent featuredBlogs={featuredBlogs} />
      <BlogsContent blogs={blog?.data} />
      <div className="flex justify-center">
        <Pagination
          total={blog?.total || 0}
          page={page}
          limit={PAGE_LIMIT}
          onPageChange={updatePage}
        />
      </div>
    </div>
  )
}

export default BlogContent
