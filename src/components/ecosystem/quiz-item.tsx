import type { PhaseQuizExtend } from '@/graphql/generated/graphql'
import { Button } from '@hackquest/ui/shared/button'
import Image from 'next/image'
import { FaRegStar } from 'react-icons/fa6'
import { LuArrowRight } from 'react-icons/lu'

export function QuizItem({
  quiz,
  showDetails = true,
}: {
  quiz: PhaseQuizExtend
  showDetails?: boolean
}) {
  return (
    <div className="mt-6">
      <div className="flex items-center gap-3 p-1">
        <div className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-neutral-300 bg-neutral-white">
          <Image
            src="/images/project/project-default.png"
            alt="phase"
            width={32}
            height={32}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="body-xs font-semibold text-secondary-neutral">
            Syntax
          </span>
          <div className="flex items-center gap-3">
            <span className="title-5">Quiz 1</span>
            <div className="flex items-center gap-1">
              <span className="body-s text-neutral-600">+20</span>
              <Image
                src="/images/layout/coin.svg"
                alt="coin"
                width={16}
                height={16}
              />
            </div>
          </div>
        </div>
      </div>
      {showDetails && (
        <div className="ml-12 flex flex-col items-center justify-center gap-4">
          <Image
            src="/images/logo/duck2.png"
            alt="duck"
            width={93}
            height={120}
          />
          <h1 className="title-5">{quiz?.description}</h1>
          <div className="flex items-center gap-2">
            {quiz?.quizList?.map(quiz => (
              <FaRegStar key={quiz.id} className="size-6 text-primary" />
            ))}
          </div>
          <Button>
            Take Quiz
            <LuArrowRight className="size-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
