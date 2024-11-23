import type React from 'react'
import { useState } from 'react'
import ResetForm from './reset-form'
import Success from './success'

const ResetPassword: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState(false)

  return isSuccess ? (
    <Success />
  ) : (
    <ResetForm onSuccess={() => setIsSuccess(true)} />
  )
}

export default ResetPassword
