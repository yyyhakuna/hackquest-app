import { useResetPasswordEmailMutation } from '@/graphql/generated/hooks'
import type React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import ForgetForm from './forget-form'
import Success from './success'

const ForgetPassword: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState(false)
  const [email, setEmail] = useState('')
  const { mutate, isPending } = useResetPasswordEmailMutation({
    onSuccess: (_, data) => {
      setIsSuccess(true)
      setEmail(data.email)
      toast.success('Send email successfully')
    },
    onError: (err: string) => {
      toast.error(err)
    },
  })
  return isSuccess ? (
    <Success
      isPending={isPending}
      email={email}
      onSubmit={(email, cb) => {
        mutate(
          { email },
          {
            onSuccess: () => {
              cb?.()
            },
          },
        )
      }}
    />
  ) : (
    <ForgetForm
      isPending={isPending}
      onSubmit={email => {
        mutate({ email })
      }}
    />
  )
}

export default ForgetPassword
