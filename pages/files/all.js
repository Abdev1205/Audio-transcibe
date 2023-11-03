import React from 'react'
import Layout from '../Layout'
import LoginWrapper from '../LoginWrapper'
import AllFile from '@/components/files/AllFile/AllFile'

const all = () => {

  return (
    <>
      <LoginWrapper>
        <Layout>
          <AllFile />
        </Layout>
      </LoginWrapper>
    </>
  )
}

export default all