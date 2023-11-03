import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Login from '@/components/Authentication/Login';
import Layout from './Layout';

const LoginWrapper = ({ children }) => {
  const { data: session } = useSession();
  if (!session) {
    return (
      <>
        <Login />
      </>
    )
  }

  return (
    <>
      <div>
        {children}
      </div>
    </>
  )
}

export default LoginWrapper
