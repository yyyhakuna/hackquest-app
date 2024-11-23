// 'use client'
// import { DialogContent } from '@hackquest/ui/shared/dialog'

// import { isUUID } from '@/lib/is'
// import { cn } from '@hackquest/ui/lib/utils'
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from '@hackquest/ui/shared/carousel'
// import type { Row } from '@tanstack/react-table'
// import { useParams } from 'next/navigation'
// import type React from 'react'
// import { useState } from 'react'
// import { FaAngleUp } from 'react-icons/fa'
// import { FaAngleDown } from 'react-icons/fa6'
// import type { TablePament } from '../../constant'

// interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
//   title: string
//   desc: string
// }
// const Item: React.FC<ItemProps> = ({ title, className, desc }) => (
//   <div className={cn('space-y-2 ' + className)}>
//     <div className="body-s text-secondary-neutral">{title}</div>
//     <div className="headline-m truncate text-primary-neutral">{desc}</div>
//   </div>
// )

// const CardContent = ({
//   row,
//   data,
// }: {
//   row: Row<TablePament>
//   data: any
// }) => {
//   const [aboutExpended, setAboutExpended] = useState(true)
//   const [qandA, setQAndA] = useState(true)
//   const params = useParams()

//   return (
//     <DialogContent showCloseIcon={true} className="w-[800px] sm:max-w-[800px]">
//       <Carousel options={{ startIndex: row.index, watchDrag: false }}>
//         <CarouselPrevious className="absolute top-[60%] left-[-80px] z-50 bg-neutral-white" />
//         <CarouselNext className="absolute top-[60%] left-[800px] z-50 bg-neutral-white" />
//         <CarouselContent>
//           {data.map((obj, index) => {
//             const about = obj?.info?.About
//             const name =
//               (about?.firstName || '') + ' ' + (about?.lastName || '')
//             return (
//               <CarouselItem key={index} className="w-full space-y-6">
//                 <div className="title-1 flex items-center gap-6 text-primary-neutral">
//                   <img
//                     src={obj.avatar ?? ''}
//                     alt=""
//                     className="h-[60px] w-[60px] rounded-full"
//                   />
//                   <span>{name}</span>
//                 </div>
//                 <div className="max-h-[540px] overflow-auto">
//                   <button
//                     className="headline-l flex h-[50px] w-full max-w-[752px] items-center justify-between text-neutral-700"
//                     onClick={() => {
//                       setAboutExpended(!aboutExpended)
//                     }}
//                   >
//                     aaa
//                     {aboutExpended ? <FaAngleUp /> : <FaAngleDown />}
//                   </button>
//                   {aboutExpended && (
//                     <div className="">
//                       <div className="flex max-w-[800px] flex-wrap gap-y-3">
//                         {name.trim() && (
//                           <Item title={'Name'} desc={name} className="w-1/3" />
//                         )}
//                         {Object.entries(obj.info.About ?? {}).map(([k, v]) => {
//                           if (k === 'firstName' || k === 'lastName') return

//                           if (isUUID(k as string)) {
//                             const o = hackathon?.info?.application?.About.find(
//                               (obj: any) => obj.id === k,
//                             )
//                             return (
//                               <Item
//                                 key={k}
//                                 title={o?.property?.label}
//                                 desc={v as string}
//                                 className="w-1/3"
//                               />
//                             )
//                           }
//                           return (
//                             <Item
//                               key={k}
//                               title={k.slice(0, 1).toUpperCase() + k.slice(1)}
//                               desc={v as string}
//                               className="w-1/3"
//                             />
//                           )
//                         })}
//                       </div>
//                     </div>
//                   )}
//                   <button
//                     className="headline-l mt-3 flex h-[50px] w-full max-w-[752px] items-center justify-between text-neutral-700"
//                     onClick={() => {
//                       setProfilesExpended(!profilesExpended)
//                     }}
//                   >
//                     aaa
//                     {profilesExpended ? <FaAngleUp /> : <FaAngleDown />}
//                   </button>
//                   {profilesExpended && (
//                     <div className="flex max-w-[800px] flex-wrap gap-y-3">
//                       {Object.entries(obj.info.OnlineProfiles ?? {}).map(
//                         ([k, v]) => {
//                           if (isUUID(k as string)) {
//                             const o =
//                               hackathon?.info?.application?.OnlineProfiles.find(
//                                 (obj: any) => obj.id === k,
//                               )
//                             return (
//                               <Item
//                                 key={k}
//                                 title={o?.property?.label}
//                                 desc={v as string}
//                                 className="w-1/3"
//                               />
//                             )
//                           }
//                           return (
//                             <Item
//                               key={k}
//                               title={k.slice(0, 1).toUpperCase() + k.slice(1)}
//                               desc={v as string}
//                               className="w-1/3"
//                             />
//                           )
//                         },
//                       )}
//                     </div>
//                   )}
//                   <button
//                     className="headline-l mt-3 flex h-[50px] w-full max-w-[752px] items-center justify-between text-neutral-700"
//                     onClick={() => {
//                       setContactExpended(!contactExpended)
//                     }}
//                   >
//                     aaa
//                     {contactExpended ? <FaAngleUp /> : <FaAngleDown />}
//                   </button>
//                   {contactExpended && (
//                     <div className="flex max-w-[800px] flex-wrap gap-y-3">
//                       {Object.entries(obj.info.Contact ?? {}).map(([k, v]) => {
//                         if (isUUID(k as string)) {
//                           const o = hackathon?.info?.application?.Contact.find(
//                             (obj: any) => obj.id === k,
//                           )
//                           return (
//                             <Item
//                               key={k}
//                               title={o?.property?.label}
//                               desc={v as string}
//                               className="w-1/3"
//                             />
//                           )
//                         }
//                         return (
//                           <Item
//                             key={k}
//                             title={k.slice(0, 1).toUpperCase() + k.slice(1)}
//                             desc={v as string}
//                             className="w-1/3"
//                           />
//                         )
//                       })}
//                       {obj?.discord && (
//                         <Item title="Discord" desc={obj.discord} />
//                       )}
//                       {obj?.info?.OnlineProfiles?.qq && (
//                         <Item title="QQ" desc={obj?.info.OnlineProfiles.qq} />
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </CarouselItem>
//             )
//           })}
//         </CarouselContent>
//       </Carousel>
//       <div className="ml-0 h-0.5 max-w-[752px] bg-neutral-100" />
//       {renderFooter()}
//     </DialogContent>
//   )
// }

// export default CardContent
