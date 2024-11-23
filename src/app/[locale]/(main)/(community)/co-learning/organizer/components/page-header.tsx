'use client'

import { useRouter } from '@/app/navigation'
import { useCreateCoLearningMutation } from '@/graphql/generated/hooks'
import { Button } from '@hackquest/ui/shared/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@hackquest/ui/shared/dialog'
import { Input } from '@hackquest/ui/shared/input'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { LuArrowRight } from 'react-icons/lu'

const PageHeader = () => {
  const { mutateAsync } = useCreateCoLearningMutation()
  const [inputValue, setInputValue] = useState('')
  const router = useRouter()
  const onCreate = async () => {
    if (!inputValue) {
      toast.error('Please fill in the Colearning name')
      return
    }
    const res = await toast.promise(
      mutateAsync({
        data: {
          name: inputValue,
        },
      }),
      {
        loading: 'Loading',
        success: 'Create success',
        error: 'Failed to create',
      },
    )
    router.push(`/co-learning/organizer/${res.createCoLearning?.id}/create`)
  }
  return (
    <div className="relative flex justify-between pb-8">
      <div className="max-w-[581px] space-y-6">
        <h1 className="title-1 text-primary-neutral">Colearning Organizer</h1>
        <p className="body-m text-secondary-neutral">
          Welcome to the Colearning Organizer Dashboard! Here, you can
          effortlessly manage your Colearning from start to finish.
        </p>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <span>Start A New Colearning</span>
              <LuArrowRight className="size-4" />
            </Button>
          </DialogTrigger>
          <DialogContent showCloseIcon className="gap-6">
            <DialogHeader className="title-3 text-primary-neutral">
              Colearning Name
            </DialogHeader>
            <Input
              placeholder="Colearning Name"
              value={inputValue}
              onChange={e => {
                setInputValue(e.target.value)
              }}
            />
            <DialogFooter className="w-full sm:space-x-8">
              <DialogClose asChild>
                <Button variant="outline" color="neutral" className="flex-1">
                  Cancel
                </Button>
              </DialogClose>
              <Button className="flex-1" onClick={onCreate}>
                Create Hackathon
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default PageHeader
