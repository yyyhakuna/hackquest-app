import type { Blog } from '@/graphql/generated/hooks'
import type React from 'react'
import BlogCard from '../blog-card'

type BlogsContentProp = {
  blogs: Blog[]
}

const BlogsContent: React.FC<BlogsContentProp> = ({ blogs }) => {
  return (
    <div className="flex flex-col gap-6 pt-[24px]">
      <div className="flex flex-wrap gap-[24px_16px]">
        {blogs?.map(blog => (
          <div className="w-full sm:w-[calc((100%-32px)/3)]" key={blog.id}>
            <BlogCard blog={blog} />
          </div>
        ))}
      </div>
      <div className="flex justify-center" />
    </div>
  )
}

export default BlogsContent
