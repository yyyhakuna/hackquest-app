import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@hackquest/ui/shared/alert-dialog'
import { Button } from '@hackquest/ui/shared/button'
import { LuArrowRight } from 'react-icons/lu'

export function QuitHackathonAlertDialog() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-full">
          Quit This Hackathon
          <LuArrowRight className="size-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[460px] gap-6">
        <AlertDialogHeader className="space-y-6">
          <AlertDialogTitle className="title-3 text-center">
            Quit This Hackathon?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            You are about to quit this hackathon. This action will remove your
            project from the competition. If you are the team leader, your
            entire team will be withdrawn.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction className="w-full">Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
