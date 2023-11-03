import React from 'react'
import Info from './Info'
import { useSession, signIn, signOut } from "next-auth/react"
import PrimaryButton from '@/components/Button/PrimaryButton'
import Transcribed from './Transcribed'

const SingleFile = ({ fileData }) => {
  const { data: session } = useSession();
  const imageUrl = session?.user.image;
  const userName = session?.user.name;
  const userEmail = session?.user?.email
  return (
    <>
      <div className=' flex flex-col py-[2rem] px-[3rem] gap-[1rem]  ' >
        <div className=' flex flex-col ' >
          <h1 className=' text-black text-[1.5rem] font-inter font-[600] ' >Welcome {userName}</h1>
          <p className=' text-[#475367] text-[.9rem] font-inter font-[400] ' >File information are given below</p>
        </div>
        <Info fileData={fileData} />

        <div className={`${fileData.saved == "1" ? "flex " : "hidden "} justify-center items-center h-[20rem] `} >
          <div className=' w-[20rem] ' >
            <PrimaryButton text={"Transcribe Saved File"} visiblity={true} />
          </div>
        </div>

        <div className={`${fileData.saved == "1" ? "hidden " : "flex "}   `} >
          <Transcribed fileData={fileData} />
        </div>
      </div>
    </>
  )
}

export default SingleFile
