import type React from 'react'
import { useState } from 'react'
import RegisterForm from './register-form'
import Success from './success'

const Register: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState(false)
  const [email, setEmail] = useState('')
  return isSuccess ? (
    <Success email={email} />
  ) : (
    <RegisterForm
      onSuccess={email => {
        setIsSuccess(true)
        setEmail(email)
      }}
    />
  )
}

export default Register
