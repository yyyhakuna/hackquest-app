import { Link } from '@/app/navigation'
import CardFooter from '@/components/resource/blog-glossary/card-footer'
import MenuLink from '@/constants/menu-link'
import type { Blog } from '@/graphql/generated/hooks'
import { Card } from '@hackquest/ui/shared/card'
import { Tag } from '@hackquest/ui/shared/tag'
import Image from 'next/image'
import type React from 'react'

type FeaturedCardProp = {
  blog: Blog
}

const FeaturedCard: React.FC<FeaturedCardProp> = ({ blog }) => {
  return (
    <Link href={`${MenuLink.BLOG}/${blog.alias}`}>
      <Card className="flex w-full gap-4 overflow-hidden rounded-[.625rem] p-4 ">
        <div className="relative h-[189px] w-[336px] flex-shrink-0 overflow-hidden rounded-[.625rem]">
          <Image
            src={blog.image}
            alt={blog.alias || ''}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-1 flex-shrink-0 flex-col justify-between overflow-hidden">
          <div className="flex gap-[.5rem]">
            {blog?.categories?.map(category => (
              <Tag key={category}>{category}</Tag>
            ))}
          </div>
          <h2 className="headline-l line-clamp-2 text-neutral-800">
            {blog.title}
          </h2>
          <p className="body-s line-clamp-2 break-words text-neutral-500">
            {blog.description}
          </p>
          <CardFooter blog={blog} />
        </div>
      </Card>
    </Link>
  )
}

export default FeaturedCard
