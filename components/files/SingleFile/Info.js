import React from 'react'
import { FcAudioFile } from "react-icons/fc"
import { fileImage, bookmarkImage } from "../../../public/assets.js"
import { TbCloudDownload } from "react-icons/tb"
import Image from 'next/image'
import { ApiUrl } from '@/utils/BaseUrl.js'

const Info = ({ fileData }) => {
  return (
    <>
      <div className=' flex justify-between  items-center  p-[1rem] w-[100%]  border-[1px] border-[#E4E7EC] bg-white  hover:border-primary cursor-pointer rounded-lg ' >
        <div className=' flex items-center  gap-[.5rem]   ' >
          <div className=' translate-x-[-.5rem]  flex justify-center items-center  w-[3.2rem]  h-[3.2rem] border-[1px] border-[#E4E7EC] rounded-full ' >
            {/* <FcAudioFile /> */}
            <Image src={fileImage} height={24} width={24} alt='card Feature' className='w-[1.9rem]     ' />
          </div>
          <div>
            <h1 className=' text-[#344054] capitalize font-inter font-[600] text-[1.1rem]  ' >{fileData.name}</h1>
            <p className='text-[#475367] font-inter font-[400] text-[.8rem]' >{fileData.fileType}</p>
          </div>
        </div>

        <div className=' flex flex-col  justify-center  ' >
          <div className={` ${fileData.saved == "1" ? "flex flex-col " : "hidden"} `} >
            <div className=' flex justify-center items-center  w-[2.2rem]  h-[2.2rem] border-[1px] border-[#E4E7EC] rounded-full ' >
              {/* <FcAudioFile /> */}
              <Image src={bookmarkImage} height={24} width={24} alt='card Feature' className='w-[1.1rem]     ' />
            </div>
            <p className='text-primary font-inter font-[600] text-[.8rem]' >Saved</p>
          </div>

          <div className={` ${fileData.saved == "1" ? "hidden " : "flex flex-col "} items-center `} >


            <a
              href={`${ApiUrl}/${fileData.filePath}`}  // Provide the URL of the MP3 file
              download
              target='_blank'
              className='text-primary flex flex-col justify-center items-center font-inter font-[600] text-[.8rem]'
            >
              <div className=' flex justify-center items-center  w-[2.2rem]  h-[2.2rem] border-[1px] border-primary bg-primary rounded-full ' >
                <TbCloudDownload className=" text-white text-[1.4rem]  " />
              </div>
              Download
            </a>
          </div>


        </div>


      </div>
    </>
  )
}

export default Info
