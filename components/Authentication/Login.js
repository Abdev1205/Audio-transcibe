import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Image from 'next/image'
import { googleImage, linkedinImage, faceBookImage, logoImage } from '@/public/assets'
import LoginAnimation from '../Animation/LoginAnimation'

const Login = () => {
  return (
    <>
      <div className=' flex flex-col justify-center items-center bg-secondary w-[100%] h-[100vh] gap-[.5rem] mt-[-3rem]  ' >
        <LoginAnimation />
        <h1 className='text-[1.5rem] text-black font-inter font-[700] mt-[-6rem] ' >One platform, many solutions</h1>
        <p className='text-[.9rem] text-[#323232] font-inter font-[500]  ' >Events. Streaming. Webinars.</p>




        <button onClick={() => signIn("google")} className=' font-inter gap-[.5rem] flex justify-center items-center hover:scale-95 duration-300  bg-white hover:bg-[#fff8f8] border-[#CFCFCF] border-2  py-[.5rem] w-[22rem] rounded-md my-[1rem]   ' >Login With <Image
          src={googleImage}
          height={500}
          width={500}
          className='w-[1.25rem]'
          alt='google image'
        /></button>
        <p className=' w-[22rem] mt-[2rem] text-center text-[.85rem] font-inter ' >
          By logging in, I agree to <span className=' text-primary ' >Abhay Firm Privacy Policy</span> , <span className=' text-primary '>Terms of Use</span> and <span className=' text-primary '>Terms of Service</span>
        </p>
      </div>
    </>
  )
}

export default Login
