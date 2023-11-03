import React, { useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect } from 'react';
import AllFIleInfo from './AllFIleInfo';
import PrimaryButton from '@/components/Button/PrimaryButton';
import axios from 'axios';
import { ApiUrl } from '@/utils/BaseUrl';

const AllFile = () => {
  const { data: session } = useSession();
  const imageUrl = session?.user.image;
  const userName = session?.user.name;
  const userEmail = session?.user?.email
  const [fileData, setFileData] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${ApiUrl}/api/files/${userEmail}/all`);
        console.log(response.data.filesData)
        setFileData(response.data.filesData)
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className=' flex flex-col py-[2rem] px-[3rem] gap-[1rem]  ' >
      <div className=' flex flex-col ' >
        <h1 className=' text-black text-[1.5rem] font-inter font-[600] ' >Welcome {userName}</h1>
        <p className=' text-[#475367] text-[.9rem] font-inter font-[400] ' >File information are given below</p>
      </div>
      {
        fileData.map((data) => {
          return (
            <AllFIleInfo fileData={data} key={data._id} /> // Use key prop for each item
          )
        })
      }


      <div className={`${fileData.saved == "1" ? "flex " : "hidden "} justify-center items-center h-[20rem] `} >
        <div className=' w-[20rem] ' >
          <PrimaryButton text={"Transcribe Saved File"} visiblity={true} />
        </div>
      </div>

      {/* <div className={`${fileData.saved == "1" ? "hidden " : "flex "}   `} >
        <Transcribed fileData={fileData} />
      </div> */}
    </div>
  )
}

export default AllFile
