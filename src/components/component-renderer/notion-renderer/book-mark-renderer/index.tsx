
import { usePageType } from '@/store/learn'
import { cn } from '@hackquest/ui/lib/utils'
import type React from 'react'
import { HEADING_TYPES } from '../../constants/data'
import type { ComponentRendererProp } from '../../constants/type'

interface BookmarkMetadata {
  url: string
  title: string
  description: string
  favicon: string
}

type BookMarkRendererProp = ComponentRendererProp

const BookMarkRenderer: React.FC<BookMarkRendererProp> = ({
  component,
  nextComponent,
  prevComponent,
}) => {
  const pageType = usePageType()
  const _getClassName = () => {
    switch (pageType) {
      default:
        return cn(
          'my-2 body-s',
          HEADING_TYPES.includes(nextComponent?.type as any) ? 'mb-0' : '',
        )
    }
  }
  // const { data, isLoading } = useQuery<BookmarkMetadata>({
  //   queryKey: ['bookmark', component.content.url],
  //   queryFn: async () => {
  //     const res = await fetch(`/api/helper/fetch-metadata?url=${component.content.url}`);
  //     return res.json();
  //   }
  // });

  // if (isLoading)
  //   return (
  //     <div className="flex w-full items-center justify-center py-2">
  //       <Spinner />
  //     </div>
  //   );
  const _data: any = {}
  // return (
  //   <Link href={data?.url || ''} target="_blank">
  //     <div
  //       datatype={component.type}
  //       className={cn(
  //         'body-s flex flex-col gap-4 rounded-[5px] border border-neutral-200 border-solid bg-neutral-white p-4 text-renderer-quote-text-color',
  //         getClassName(),
  //         nextComponent === null ? 'mb-0' : '',
  //         prevComponent === null ? 'mt-0' : '',
  //       )}
  //     >
  //       <div className="flex flex-col gap-px">
  //         <div className="body-s font-bold">{data?.title || ''}</div>
  //         <div className="body-xs text-neutral-medium-gray">
  //           {data?.description || ''}
  //         </div>
  //       </div>
  //       <div className="flex gap-2">
  //         {data?.favicon && (
  //           <Image
  //             src={data?.favicon || ''}
  //             alt="favicon"
  //             width={16}
  //             height={16}
  //           />
  //         )}
  //         <span className="body-xs">{data?.url || ''}</span>
  //       </div>
  //     </div>
  //   </Link>
  // )
  return <div>BookMarkRenderer</div>
}

export default BookMarkRenderer
