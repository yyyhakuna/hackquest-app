import { Link } from '@/app/navigation'
import CardFooter from '@/components/resource/blog-glossary/card-footer'
import MenuLink from '@/constants/menu-link'
import type { Blog } from '@/graphql/generated/hooks'
import { Card } from '@hackquest/ui/shared/card'
import { Tag } from '@hackquest/ui/shared/tag'
import Image from 'next/image'
import type React from 'react'

type BlogCardProp = {
  blog: Blog
}

const BlogCard: React.FC<BlogCardProp> = ({ blog }) => {
  return (
    <Link href={`${MenuLink.BLOG}/${blog.alias}`} className="block">
      <Card className="w-full overflow-hidden rounded-2xl p-4">
        <div className="relative h-0 w-full overflow-hidden rounded-[.5rem] pt-[56.25%]">
          <Image src={blog.image} alt={blog.alias || ''} fill className="object-cover" />
        </div>
        <div className="mt-[16px] flex h-[11.6875rem] flex-col justify-between">
          <div className="flex flex-col gap-3">
            <div className="flex gap-2">
              {blog?.categories?.map(category => (
                <Tag key={category} className="bg-tag-yellow">
                  {category}
                </Tag>
              ))}
            </div>
            <h2 className="headline-m line-clamp-2 text-neutral-800">{blog.title}</h2>
            <p className="body-s line-clamp-2 text-neutral-500">{blog.description}</p>
          </div>
          <CardFooter blog={blog} />
        </div>
      </Card>
    </Link>
  )
}

export default BlogCard
