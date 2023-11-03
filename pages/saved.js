import React from 'react'
import LoginWrapper from './LoginWrapper'
import Layout from './Layout'
import UnderDevelopment from '@/components/Animation/UnderDevelopment'
import Saved from '@/components/saved/Saved'

const saved = () => {
  return (
    <LoginWrapper>
      <Layout>
        <Saved />
      </Layout>
    </LoginWrapper>
  )
}

export default saved
