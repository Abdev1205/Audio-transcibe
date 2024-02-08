import React, { useEffect, useState } from 'react';
import { FcAudioFile } from "react-icons/fc";
import { fileImage, bookmarkImage } from "../../../public/assets.js";
import { RxClipboardCopy } from "react-icons/rx";
import Image from 'next/image';
import { ApiUrl } from '@/utils/BaseUrl.js';

const Transcribed = ({ fileData }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [audioPath, setAudioPath] = useState(`${ApiUrl}/${fileData.filePath}`)

  const copyToClipboard = () => {
    // Create a text area element and set its value
    const textArea = document.createElement("textarea");
    textArea.value = fileData.response;

    // Append the text area to the document
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  useEffect(() => {
    setAudioPath(`${ApiUrl}/${fileData.filePath}`)
  }, [])



  return (
    <div className=' flex flex-col   p-[1rem] w-[100%] border-[1px] border-[#E4E7EC] bg-white cursor-pointer rounded-lg'>
      <div className='flex w-[100%] justify-between items-center'>
        <h1 onClick={() => alert(`${ApiUrl}/${fileData.filePath}`)} className='text-[#344054] capitalize font-inter font-[600] text-[1.1rem]'>Transcribed Value</h1>
        <audio controls className="ml-[-1rem] w-[60%]  ">
          <source src={`${ApiUrl}/${fileData.filePath}`} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        <div onClick={copyToClipboard}
          disabled={isCopied} className=' flex flex-col justify-center items-center gap-[.5rem] ' >
          <RxClipboardCopy className=" text-[1.5rem] " />
          <p className='text-[#475367] text-center w-[4rem] text-[.7rem] font-inter font-[500]' >{isCopied ? "Copied!" : "Copy to Clipboard"}</p>
        </div>
      </div>
      <div className=' bg-[#E0EDFF] px-[1.5rem] py-[1.5rem] mt-[1.5rem] rounded-lg ' >

        <p className='text-[#475367] text-[.9rem] font-inter font-[400]'>{fileData.response}</p>
      </div>


    </div>
  );
};

export default Transcribed;
