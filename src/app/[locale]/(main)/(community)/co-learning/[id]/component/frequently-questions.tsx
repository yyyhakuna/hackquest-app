'use client'
import { cn } from '@hackquest/ui/lib/utils'
import { Separator } from '@hackquest/ui/shared/separator'
import { useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'

const Item = ({
  title,
  content,
  isNeedSeparator = true,
}: { title: string; content: string; isNeedSeparator?: boolean }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  return (
    <div
      className="cursor-pointer space-y-4"
      onClick={() => {
        setIsExpanded(!isExpanded)
      }}
    >
      <div className="flex w-full justify-between">
        {title}
        {isExpanded ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>
      <div
        className={cn(
          'body-m text-secondary-neutral',
          !isExpanded && ' hidden',
        )}
      >
        {content}
      </div>
      {isNeedSeparator && <Separator />}
    </div>
  )
}

const FrequentlyQuestions = () => {
  return (
    <div className="mt-8 sm:w-2/3">
      <h2 className="title-3 mb-6 text-primary-neutral ">
        frequently Asked Questions
      </h2>
      <div className="space-y-4">
        <Item
          title="Who can join the Co-Learning Camp?"
          content="Anyone interested in Web3, whether you're a beginner or an experienced developer."
        />
        <Item
          title="What tracks are covered in the Co-Learning Camp?"
          content="Courses on 15+ popular blockchains, covering basics like syntax, advanced projects, and tools like smart contract frameworks and SDKs."
        />
        <Item
          title="How does the learning process work?"
          content="1. Weeks 1–2: Self-paced learning with curated resources.
2. Weekly Townhalls: Get guidance and new insights.
3. Team Collaboration: Form teams and develop ideas with HackQuest's support.
4. Project Submission: Complete a project and submit it to a hackathon to graduate."
        />
        <Item
          title="How long does the Co-Learning Camp last?"
          content="4 weeks."
        />
        <Item
          title="Is there a fee to join the Co-Learning Camp?"
          content="It's completely free, and you can compete for hackathon prizes!"
        />
      </div>
    </div>
  )
}

export default FrequentlyQuestions
