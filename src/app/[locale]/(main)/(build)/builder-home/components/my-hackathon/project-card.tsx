import { Link } from '@/app/navigation'
import { DeleteAlertDialog } from '@/components/common/delete-alert-dialog'
import {
  type Project,
  useQuitProjectFromHackathonMutation,
} from '@/graphql/generated/hooks'
import { useToggle } from '@/hooks/utils/use-toggle'
import { useUser } from '@/store/user'
import { Button } from '@hackquest/ui/shared/button'
import { Card } from '@hackquest/ui/shared/card'
import { useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import type React from 'react'
import toast from 'react-hot-toast'
import { FiArrowRight } from 'react-icons/fi'
import { LuLogOut } from 'react-icons/lu'

interface ProjectCardProp {
  project: Project
  isLive?: boolean
  hackathonId: string
}

const ProjectCard: React.FC<ProjectCardProp> = ({
  project,
  isLive,
  hackathonId,
}) => {
  const queryClient = useQueryClient()
  const [open, onOpenChange] = useToggle(false)
  const currentUser = useUser()

  const quitProject = useQuitProjectFromHackathonMutation()

  function onConfirm() {
    toast
      .promise(quitProject.mutateAsync({ projectId: project.id }), {
        loading: 'Quitting project...',
        success: 'You have quit this project',
        error: 'Failed to quit project',
      })
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ['ListHackathonsBySelf'] })
      })
      .finally(() => {
        onOpenChange(false)
      })
  }

  const renderButton = () => {
    if (isLive) {
      if (project?.isSubmit && currentUser?.id === project?.creatorId) {
        return (
          <object className="flex-1">
            <Link href={`/hackathon/${hackathonId}/${project.id}/submit`}>
              <Button variant="outline" color="neutral" className="w-full">
                Edit Submission
                <FiArrowRight className="icon-hover-translate size-4" />
              </Button>
            </Link>
          </object>
        )
      } else {
        return (
          <object className="flex-1">
            <Link href={`/projects/${project.alias}`}>
              <Button className="w-full">
                Viwe My Project
                <FiArrowRight className="icon-hover-translate size-4" />
              </Button>
            </Link>
          </object>
        )
      }
    } else {
      return (
        <object className="flex-1">
          <Link href={`/projects/${project.alias}`}>
            <Button className="w-full">
              Viwe My Project
              <FiArrowRight className="icon-hover-translate size-4" />
            </Button>
          </Link>
        </object>
      )
    }
  }

  return (
    <Card className="w-full items-center justify-between gap-6 p-3 sm:flex">
      <div
        className={`flex flex-1 flex-shrink-0 items-center gap-6 text-neutral-800 ${!project.isSubmit && 'opacity-80'}`}
      >
        <Image
          src={project.logo || ''}
          alt={project.name || ''}
          width={60}
          height={60}
          className="rounded-xl"
        />
        <h2 className="title-5 line-clamp-2 w-full sm:line-clamp-1 sm:w-[calc((100%-6.75rem)/2)]">
          {project.name}
        </h2>
        <div className="body-s hidden w-[calc((100%-6.75rem)/2)] sm:block sm:px-6">
          <p className="text-neutral-400">Prize Track</p>
          <p className="headline-m mt-3 line-clamp-1">{project?.prizeTrack}</p>
        </div>
      </div>
      <div className="mt-6 flex w-full shrink-0 items-center gap-3 sm:mt-0 sm:w-[317px]">
        {renderButton()}
        <button
          type="button"
          className="flex size-[46px] flex-shrink-0 items-center justify-center rounded-lg border border-neutral-600 bg-neutral-50 outline-none transition-colors duration-300 enabled:hover:bg-neutral-200"
          onClick={event => {
            event.stopPropagation()
            event.nativeEvent.stopImmediatePropagation()
            onOpenChange(true)
          }}
        >
          <LuLogOut className="size-4" />
        </button>
      </div>
      <DeleteAlertDialog
        open={open}
        onOpenChange={onOpenChange}
        title="Quit Project"
        loading={quitProject.isPending}
        description="You are team leader if you quit this hackathon, this project will withdraw from this hackathon."
        onConfirm={onConfirm}
      />
    </Card>
  )
}

export default ProjectCard
