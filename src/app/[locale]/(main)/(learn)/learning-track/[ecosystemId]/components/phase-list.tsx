'use client'

import { CourseItem } from '@/components/ecosystem/course-item'
import { HackathonItem } from '@/components/ecosystem/hackathon-item'
import { QuizItem } from '@/components/ecosystem/quiz-item'
import { ResourceItem } from '@/components/ecosystem/resource-item'
import type {
  EcosystemPhaseExtend,
  FindEcosystemInfoQuery,
} from '@/graphql/generated/graphql'
import { Skeleton } from '@hackquest/ui/shared/skeleton'
import { AnimatePresence, motion } from 'framer-motion'
import * as React from 'react'
import { useExpandStore } from './expand-button'
import { PhaseItem } from './phase-item'

export function PhaseList({
  ecosystemPromise,
}: {
  ecosystemPromise: Promise<FindEcosystemInfoQuery>
}) {
  const { phaseIds, setPhaseId } = useExpandStore()
  const { ecosystem } = React.use(ecosystemPromise)

  const phases = (ecosystem?.phases as EcosystemPhaseExtend[]) || []

  return (
    <div className="relative">
      {phases?.map((phase, index) => (
        <div key={phase.id}>
          <PhaseItem
            id={phase.id}
            index={index + 1}
            title={phase.title}
            progress={phase?.progress ?? 0}
            onExpandPhase={setPhaseId}
          />
          <AnimatePresence initial={false}>
            {phaseIds.includes(phase.id) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
              >
                {phase.courses?.map(course => (
                  <CourseItem
                    key={course.id}
                    course={course}
                    href={`/courses/${course?.alias}`}
                  />
                ))}
                {phase.quizzes?.map(quiz => (
                  <QuizItem key={quiz.id} quiz={quiz} showDetails={false} />
                ))}
                {phase.extra?.build && <HackathonItem />}
                {phase.extra?.resource && <ResourceItem />}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
      <div className="-z-10 absolute top-0 left-6 h-full w-px border-l border-dashed" />
    </div>
  )
}

export function PhaseSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton key={index} className="h-36 w-full rounded-2xl" />
      ))}
    </div>
  )
}
