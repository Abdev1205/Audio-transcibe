import React from 'react'
import Navbar from '@/components/Navbar'
import LeftPanel from '@/components/LeftPanel/LeftPanel'

const Layout = ({ children }) => {
  return (
    <div className=' flex   w-[100%]   bg-secondary  ' >
      <LeftPanel />
      <div className=' flex flex-col w-[100%] ' >
        <Navbar />
        {children}
      </div>

    </div>
  )
}

export default Layout
