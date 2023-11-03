import React, { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import axios from 'axios';
import { ApiUrl } from '@/utils/BaseUrl';
import { folderImage, transribedImage, bookmarkImage } from "../../public/assets.js"
import SavedInfo from './SavedInfo.js';
import PrimaryButton from '../Button/PrimaryButton.js';


const Saved = () => {
  const { data: session } = useSession();
  const imageUrl = session?.user.image;
  const userName = session?.user.name;
  const userEmail = session?.user?.email
  const [filesData, setFilesData] = useState([]);
  const [collectedFile, setCollectedFile] = useState(0);
  const [transcribedFile, setTranscribedFiles] = useState([])
  const [transcribedCount, setTranscribedCount] = useState(0);
  const [savedData, setSavedData] = useState([]);
  const [transcibeModel, setTranscribeModel] = useState(false);

  const processResponseData = (response) => {
    if (!response || !response.data || !Array.isArray(response.data.filesData)) {
      // Handle invalid response data here if needed
      return;
    }

    const filesData = response.data.filesData;
    setFilesData(filesData);

    // Calculate the length of the array
    const collectedFileCount = filesData.length;
    setCollectedFile(collectedFileCount);

    // Find the count where transcribed is true
    const transcribedFilesCount = filesData.filter((file) => file.transcribed === true).length;
    setTranscribedCount(transcribedFilesCount);

    const transcribedFiles = filesData.filter((file) => file.transcribed === true);
    setTranscribedFiles(transcribedFiles);

    // Find the count where saved is "1"
    const savedFilesData = filesData.filter((file) => file.saved === "1");
    setSavedData(savedFilesData);
  };

  // Call the function when you have the Axios response
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${ApiUrl}/api/files/${userEmail}/all`);
        console.log(response)
        processResponseData(response);
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
        savedData.map((data) => {
          return (
            <SavedInfo fileData={data} key={data._id} /> // Use key prop for each item
          )
        })
      }


      <div className={`${savedData.saved == "1" ? "flex " : "hidden "} justify-center items-center h-[20rem] `} >
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

export default Saved
