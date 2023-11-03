import React from 'react'
import LoginWrapper from './LoginWrapper'
import Layout from './Layout'
import UnderDevelopment from '@/components/Animation/UnderDevelopment'

const upgrade = () => {
  return (
    <LoginWrapper>
      <Layout>
        <UnderDevelopment />
      </Layout>
    </LoginWrapper>
  )
}

export default upgrade
