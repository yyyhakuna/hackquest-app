import type {
  ProjectExtend,
} from '@/graphql/generated/hooks'
import { cn } from '@hackquest/ui/lib/utils'
import { Tag } from '@hackquest/ui/shared/tag'
import type React from 'react'
import { LuHeart } from 'react-icons/lu'

export type T =
  | 'like'
  | 'primaryChampion'
  | 'button'
  | 'blueChampion'
  | 'none'
  | 'brownChampion'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  linkTo?: string //the url that click card will jump to
  type?: T
  isLiked?: boolean
  imgSrc: string //top left corner image src
  blank?: boolean // Optional param to control whether it opens in a new tab
  likeNum?: number //if your card type is like , this is the number under the heard icon
  buttonText?: string //if your card type is button , the buttonText atrribute is the content of button
  topRightContent?: React.ReactElement | string //custom top right corner content , if you pass a custom topRightContent , the type will not work
  onIconClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any
}

const renderByType = (
  t?: T,
  likeNum?: number,
  buttonText?: string,
  onIconClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => any,
  isLiked?: boolean,
) => {
  switch (t) {
    case 'like':
      return (
        <button
          className="rounded-lg border border-neutral-300 p-[12px_24px] transition-colors duration-300 hover:bg-neutral-100"
          onClick={onIconClick}
        >
          <LuHeart
            className={cn('size-4', isLiked && 'fill-destructive-400')}
          />
          <span className="headline-s text-primary-neutral">{likeNum}</span>
        </button>
      )
    case 'primaryChampion':
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-500">
          <img src="/images/hackathon/champion.svg" className="" />
        </div>
      )
    case 'blueChampion':
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
          <img src="/images/hackathon/champion.svg" className="" />
        </div>
      )
    case 'brownChampion':
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-tag-brown">
          <img src="/images/hackathon/champion.svg" className="" />
        </div>
      )
    case 'button':
      return (
        <div className="headline-s absolute right-0 rounded-[18px_0_0_18px] bg-primary p-[4px_24px] text-primary-neutral">
          {buttonText}
        </div>
      )
    // case 'more':
    //   return (
    //     <button className="">
    //       <RiMore2Fill className="w-8 h-8" />
    //     </button>
    //   )
    //   break
  }
}
const Card = ({
  linkTo,
  type,
  imgSrc,
  blank,
  className,
  children,
  likeNum,
  buttonText,
  topRightContent,
  isLiked,
  onIconClick,
}: CardProps) => {
  const Wrapper = linkTo ? 'a' : 'div' // Choose element based on whether linkTo is present
  const wrapperProps = linkTo
    ? {
        href: linkTo,
        target: blank ? '_blank' : '_self',
        rel: blank ? 'noopener noreferrer' : undefined,
      }
    : {}
  return (
    <Wrapper
      {...wrapperProps}
      className={cn(
        'relative flex shrink flex-col rounded-2xl border-2 border-neutral-200 p-6 transition-colors duration-300 hover:bg-neutral-100',
        className,
      )}
    >
      <div className="flex w-full items-start justify-between">
        <img
          src={imgSrc}
          alt=""
          className="h-20 w-20 overflow-hidden rounded-xl object-contain"
        />
        {topRightContent
          ? topRightContent
          : renderByType(type, likeNum, buttonText, onIconClick, isLiked)}
      </div>
      {children}
    </Wrapper>
  )
}

const ProjectCardHeader = ({
  children,
  className,
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'mt-3 h-[58px] overflow-hidden text-ellipsis font-bold font-next-book text-2xl text-primary-neutral',
        className,
      )}
    >
      {children}
    </div>
  )
}

const ProjectCardDescription = ({
  children,
  className,
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'body-s mt-3 line-clamp-2 h-[42px] text-ellipsis text-secondary-neutral',
        className,
      )}
      dangerouslySetInnerHTML={{
        __html: children as string,
      }}
    />
  )
}

interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
  contentObj?: { [key: string]: React.ReactElement | string }
}

const ProjectCardContent = ({
  children,
  className,
  contentObj,
}: ContentProps) => {
  const Comp = contentObj
    ? Object.entries(contentObj).map(([key, val]) => (
        <div
          key={key}
          className="mb-[6px] flex w-full items-center justify-between"
        >
          <span className='body-s max-w-[100px] truncate text-neutral-400 '>
            {key}
          </span>
          <div className='headline-s max-w-[160px] truncate text-primary-neutral'>
            {val}
          </div>
        </div>
      ))
    : children
  return <div className="mt-6">{Comp}</div>
}

interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {
  tagsList: string[]
}

const ProjectCardFooter = ({ tagsList, children }: FooterProps) => {
  type Color =
    | 'grey'
    | 'blue'
    | 'brown'
    | 'purple'
    | 'orange'
    | 'pink'
    | 'yellow'
    | 'green'
    | 'red'
  function getRandomColor(): Color {
    const colors: Color[] = [
      'grey',
      'blue',
      'brown',
      'purple',
      'orange',
      'pink',
      'yellow',
      'green',
      'red',
    ]
    const randomIndex = Math.floor(Math.random() * colors.length)
    return colors[randomIndex]!
  }

  const Comp = tagsList ? (
    <div className="mt-[6px] space-x-[6px]">
      {tagsList.map(tag => (
        <Tag color={getRandomColor()} key={tag} className="">
          {tag}
        </Tag>
      ))}
    </div>
  ) : (
    children
  )
  return <div>{Comp}</div>
}

interface ProjectCardProps extends Omit<CardProps, 'imgSrc' | 'blank'> {
  project: ProjectExtend
  contentObj?: { [key: string]: React.ReactElement | string }
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  type,
  likeNum,
  buttonText,
  topRightContent,
  contentObj,
  className,
  isLiked,
  onIconClick,
  linkTo,
}) => {
  if (!project) return null

  return (
    <Card
      type={type}
      likeNum={likeNum}
      buttonText={buttonText}
      imgSrc={project.logo ? project.logo : ''}
      topRightContent={topRightContent}
      className={className}
      linkTo={linkTo}
      isLiked={isLiked}
      onIconClick={onIconClick}
    >
      <ProjectCardHeader>{project.name}</ProjectCardHeader>
      <ProjectCardDescription>
        {project?.detail?.oneLineIntro}
      </ProjectCardDescription>
      <ProjectCardContent contentObj={contentObj} />
      <ProjectCardFooter tagsList={project.tracks!} />
    </Card>
  )
}

export {
  ProjectCard,
  ProjectCardHeader,
  ProjectCardContent,
  ProjectCardDescription,
  ProjectCardFooter,
  Card,
}
