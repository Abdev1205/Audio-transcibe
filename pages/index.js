import React, { Children } from 'react'
import Image from 'next/image'
import { logoImage } from '@/public/assets'
import Login from '@/components/Authentication/Login'
import LoginWrapper from './LoginWrapper'
import { useSession, signIn, signOut } from "next-auth/react"
import LeftPanel from '@/components/LeftPanel/LeftPanel'
import Navbar from '@/components/Navbar'
import Dashboard from '@/components/Dashboard/Dashboard'
import Layout from './Layout'



const index = () => {
  return (
    <>
      <LoginWrapper>
        <Layout>
          <Dashboard />
        </Layout>
      </LoginWrapper>
    </>
  )
}

export default index
