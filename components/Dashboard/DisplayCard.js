import React from 'react'
import Image from 'next/image'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'

const DisplayCard = ({ data }) => {
  return (
    <div className=' flex flex-col p-[1rem] w-[100%]  border-[1px] border-[#E4E7EC] bg-white  hover:border-primary cursor-pointer rounded-lg ' >
      <div className=' translate-x-[-.5rem] mb-[.5rem] flex justify-center items-center  w-[2.2rem]  h-[2.2rem] border-[1px] border-[#E4E7EC] rounded-full ' >
        <Image src={data.img} height={24} width={24} alt='card Feature' className='w-[1.3rem]     ' />
      </div>
      <h1 className=' text-[#344054] font-inter font-[600] text-[1.3rem]  ' >{data.value}</h1>
      <p className=' text-[#475367] font-inter font-[400] text-[.8rem]  ' >{data.feature}</p>

    </div>
  )
}

export default DisplayCard
