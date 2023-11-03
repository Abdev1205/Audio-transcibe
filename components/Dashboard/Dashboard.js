import React, { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import PrimaryButton from '../Button/PrimaryButton';
import axios from 'axios';
import { ApiUrl } from '@/utils/BaseUrl';
import { folderImage, transribedImage, bookmarkImage } from "../../public/assets.js"
import DisplayCard from './DisplayCard';
import RecentFiles from './RecentFiles';
import NoResultAnimation from '../Animation/NoResultAnimation';
import TranscribeFile from '../Modals/TranscribeFile';

const Dashboard = () => {
  const { data: session } = useSession();
  const imageUrl = session?.user.image;
  const userName = session?.user.name;
  const userEmail = session?.user?.email
  const [filesData, setFilesData] = useState([]);
  const [collectedFile, setCollectedFile] = useState(0);
  const [transcribedFile, setTranscribedFiles] = useState([])
  const [transcribedCount, setTranscribedCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);
  const [reload, setReload] = useState(false)
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
    const savedFilesCount = filesData.filter((file) => file.saved === "1").length;
    setSavedCount(savedFilesCount);
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
  }, [reload]);

  const anlyticsData = [
    {
      img: folderImage,
      value: collectedFile,
      tooltipId: "uploaded-file",
      feature: "Uploaded Files",
      name: "Uploaded File"
    },
    {
      img: transribedImage,
      value: transcribedCount,
      tooltipId: "Transcribed-data",
      feature: "Transcribed",
      name: "Transcribed files "
    },
    {
      img: bookmarkImage,
      value: savedCount,
      tooltipId: "Saved-file",
      feature: "Saved",
      name: "Saved files"
    },
  ]


  return (
    <>
      <div className=' flex flex-col px-[3rem] py-[1rem] ' >
        <div className=' flex justify-between items-center ' >
          <div className=' flex flex-col ' >
            <h1 className=' text-black text-[1.5rem] font-inter font-[600] ' >Welcome {userName}</h1>
            <p className=' text-[#475367] text-[.9rem] font-inter font-[400] ' >Upload your audio and Video to covert to text</p>
          </div>
          <div onClick={() => setTranscribeModel(!transcibeModel)} className={"w-[10rem] "} >
            <PrimaryButton text={"Transcribe"} visiblity={true} />
          </div>
        </div>

        <div className=' flex flex-row mt-[2rem] gap-[1rem] ' >
          {filesData && filesData.length > 0 ?
            anlyticsData.map((data) => {
              return (
                <div className='flex flex-row  w-[100%] gap-[1rem] ' >
                  <DisplayCard data={data} />
                </div>
              )
            }) : (
              <div className=' flex flex-col h-[100%] items-center justify-center w-[100%] ' >

                <NoResultAnimation />
                <h1 className=' text-[#475367] text-[1.4rem] font-inter font-[600] ' >You have not uploaded any files, upload it </h1>
              </div>
            )}
        </div>

        <div className={`mt-[2rem] ${filesData.length > 0 ? "" : "hidden"} `} >
          <RecentFiles tableData={transcribedFile} reloadData={() => setReload(!reload)} />
        </div>
        <TranscribeFile
          visible={transcibeModel}
          onClose={() => setTranscribeModel(false)}
          callback={() => fetchData()}
        />


      </div>

    </>
  )
}

export default Dashboard
