import React from 'react'
import Image from 'next/image'
import { useSession, signIn, signOut } from "next-auth/react"
import { CgArrowsExchange } from "react-icons/cg"
import { RiShareBoxLine, RiUserLine } from "react-icons/ri"
import { MdLogout, MdClose } from "react-icons/md"
import { BsShop, BsJournalBookmark } from "react-icons/bs"
import { TbUserCog, TbSettingsStar, TbReceipt, TbTableOptions, TbDeviceHeartMonitor, TbHelpHexagon, TbLogout } from "react-icons/tb"
import { BiSupport } from "react-icons/bi"

const AccountDropdown = ({ visible, onClose = () => { }, callback = () => { } }) => {
  if (!visible) return null;
  const { data: session } = useSession();
  const imageUrl = session?.user.image;
  return (
    <>
      <div
        id="background"
        className="fixed inset-0 flex  justify-center items-center z-50 bg-black bg-opacity-30"
        onClick={(e) => {
          if (e.target.id == "background") onClose();
        }}
      >
        <div className={`absolute flex overflow-hidden flex-col right-0 justify-between h-[100vh] w-[18rem] shadow-lg px-[1rem] py-[2rem] ${visible ? "translate-x-[0%]" : "translate-x-[400%"} bg-white  duration-[5s] `} >
          {/* ****************** */}
          <div className=' flex flex-col justify-center gap-[1rem] ' >
            <div className=' flex flex-col gap-[1rem] '  >
              <div className=' flex items-center justify-between '>
                <div className=' flex gap-[.5rem] mb-[.5rem] font-inter font-[500] ' >
                  <RiUserLine className=" text-[1.5rem]  " />
                  <p className=' flex items-center gap-[.1rem] text-[1.1rem] font-inter text-[#000000]  ' >  Account</p>
                </div>
                <div onClick={(e) => onClose()} className=' flex justify-center items-center w-[2rem] h-[2rem] rounded-[50%] border-[1px] mt-[-1.75rem] mr-[1.7rem] border-primary shadow-md hover:text-white hover:bg-primary hover:border-white cursor-pointer ' >
                  <MdClose className=' text-[1.3rem]  ' />
                </div>
              </div>
              <div className=' flex gap-[1rem] items-center ' >
                <Image
                  src={imageUrl}
                  height={500}
                  width={500}
                  className='  w-[2.5rem]  rounded-[50%] '
                  alt='user'
                />
                <div>
                  <h2 className=' text-[.85rem] font-inter font-[500] text-[#323232]   ' >{session.user.name}</h2>
                  <p className=' text-[.8rem] font-inter font-[400] text-[#323232]    '>{session.user.email}</p>
                </div>
              </div>
              <div className='   ' >
                <div className=' flex gap-[.5rem] items-center  cursor-pointer  ' >
                  <p className=' text-[.8rem] font-inter font-[500] text-[#010101bd]    ' >Switch Accounts</p>
                  <CgArrowsExchange className=' text-[1.1rem]   ' />
                </div>
                <div className=' flex items-center gap-[.5rem]  cursor-pointer  ' >
                  <p className='text-[.8rem] font-inter font-[500] text-[#010101bd]' >Manage Account</p>
                  <RiShareBoxLine className=' text-[.8rem] ' />
                </div>
              </div>
            </div>
            <hr />
            <div className=' flex flex-col gap-[.8rem] ' >
              <div className=' flex gap-[.7rem] mb-[.5rem] font-inter font-[500] ' >
                <BsShop className=" text-[1.5rem]   " />
                <p className=' flex items-center gap-[.1rem] text-[1.1rem] font-inter text-[#000000]  ' >  Abhay Firm</p>
              </div>
              <div className=' flex flex-col gap-[1rem] opacity-80 ' >
                <h2 className=' flex gap-[.8rem] cursor-pointer text-[.9rem] font-inter font-[400] opacity-[.85] ' >
                  <TbUserCog className=" text-[1.4rem] " />
                  Profile and Visiblity
                </h2>
                <h2 className=' flex gap-[.8rem] cursor-pointer text-[.9rem] font-inter font-[400] opacity-[.85] ' >
                  <TbDeviceHeartMonitor className=" text-[1.4rem] " />
                  Actvity
                </h2>
                <h2 className=' flex gap-[.8rem] cursor-pointer text-[.9rem] font-inter font-[400] opacity-[.85] ' >
                  <TbReceipt className=" text-[1.4rem] " />
                  Billing
                </h2>
                <h2 className=' flex gap-[.8rem] cursor-pointer text-[.9rem] font-inter font-[400] opacity-[.85] ' >
                  <TbSettingsStar className=" text-[1.4rem] " />
                  Setting
                </h2>
                <h2 className=' flex gap-[.8rem] cursor-pointer text-[.9rem] font-inter font-[400] opacity-[.85] ' >
                  <TbTableOptions className=" text-[1.4rem] " />
                  Theme
                </h2>
              </div>
            </div>
          </div>
          {/* ****************** */}
          <div className=' flex flex-col gap-[1rem] ' >
            <hr />


            <div className=' flex justify-between  ' >
              <div className=' flex gap-[.5rem] items-center cursor-pointer  ' >
                <TbHelpHexagon className=" text-[1.2rem] " />
                <p className=' flex  text-[.95rem] font-inter font-[400]  ' >

                  Help
                </p>
              </div>
              <div className=' flex gap-[.5rem] items-center cursor-pointer  ' >
                <BiSupport className=" text-[1.2rem] " />
                <p className=' flex  text-[.95rem] font-inter font-[400]  ' >
                  Support
                </p>
              </div>
            </div>
            <hr />
            <div onClick={() => signOut()} className='cursor-pointer flex items-center gap-[.5rem] ' >
              <TbLogout className='  text-[1.2rem] ' />
              <p className='text-[1.1rem] font-inter font-[500] text-[#000000]'>Logout</p>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default AccountDropdown
