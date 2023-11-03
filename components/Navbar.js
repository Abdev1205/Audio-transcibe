import React from 'react'
import { useState } from 'react'
import { bellImage, searchImage } from "../public/assets.js"
import Image from 'next/image'
import { useSession, signIn, signOut } from "next-auth/react"
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import AccountDropdown from './Modals/AccountDropdown.js'

const Navbar = () => {
  const { data: session } = useSession();
  const [accountDropdown, setAccountDropdown] = useState(false)
  const imageUrl = session?.user.image;
  const userName = session?.user.name
  return (
    <div className=' sticky top-0 z-[1] flex justify-between items-center px-[3rem] w-[100%] bg-white h-[4rem]  ' >
      <div className=' flex w-[40rem] gap-[1rem] px-[1rem] py-[.5rem] items-center bg-[#F9FAFB] rounded-md  ' >
        <div>
          <Image alt='search icon' src={searchImage} height={24} width={24} className='w-[1rem]' />
        </div>
        <input type="text" className=' outline-none bg-transparent text-[.82rem] w-[100%] ' placeholder='Search here...' />
      </div>

      <div className=' flex items-center gap-[1rem] ' >
        <div data-tooltip-id="notification" className=' flex justify-center items-center cursor-pointer bg-[#F9FAFB] w-[2.5rem] h-[2.5rem] rounded-full ' >
          <Image alt='notification' src={bellImage} height={24} width={24} className='w-[1.2rem]' />
        </div>
        <Image alt='user' onClick={() => setAccountDropdown(!accountDropdown)} data-tooltip-id="user" src={imageUrl} height={24} width={24} className='w-[1.8rem] cursor-pointer h-[1.8rem] rounded-full ' />
        <Tooltip
          id="notification"
          place="bottom"
          content={"notification"}
          className='   '
        />
        <Tooltip
          id="user"
          place="bottom"
          content={userName}
          className='   '
        />
      </div>
      <AccountDropdown
        visible={accountDropdown}
        onClose={() => setAccountDropdown(false)}
        callback={() => fetchData()}
      />
    </div>
  )
}

export default Navbar
