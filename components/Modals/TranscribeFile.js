import React, { useState, useRef } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { MdLockOutline, MdGroup, MdPublic, MdClose } from "react-icons/md"
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { ApiUrl } from "../../utils/BaseUrl"
import Image from 'next/image';
import { uploadImage } from "../../public/assets.js"


const TranscribeFile = ({ visible, onClose = () => { }, callback = () => { } }) => {
  if (!visible) return null;
  const { data: session } = useSession();
  const router = useRouter();
  const userEmail = session?.user.email;



  const [transcibing, setTranscibing] = useState(false)
  const [selectedFileName, setSelectedFileName] = useState('');
  const [file, setFile] = useState("")
  const [language, setLanguage] = useState("")
  const [fileName, setFileName] = useState("")
  const [saved, setSaved] = useState("0")
  const ref = useRef();

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    const value = e.target.checked ? "Yes" : "No";
    setIsChecked(e.target.checked);
    if (value == "Yes") {
      setSaved("1")
    }
    else {
      setSaved("0")
    }
  };



  const createFileByData = async (e) => {
    e.preventDefault()
    if (file && fileName) {
      const formdata = new FormData();
      formdata.append('audio', file);
      formdata.append('name', fileName);
      formdata.append('userEmail', userEmail);
      formdata.append('saved', saved);
      setTranscibing(true);

      console.log(formdata)
      try {
        const response = await axios.post(`${ApiUrl}/api/upload`, formdata);
        console.log(response)
        console.log('response', response.data.serverResponse._id);
        setTranscibing(false);
        toast.success('File Transcribed Successfully', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setSelectedFileName("")
        setFile(null)
        setLanguage("")
        setFileName("")
        setSaved("0")
        onClose()
        router.push(`/files/${response.data.serverResponse._id}`)

      } catch (error) {
        console.log(error)
        setTranscibing(false);
        toast.error(error.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        onClose()
      }
    }
  }



  return (
    <>
      <div
        id="background"
        className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-30"
        onClick={(e) => {
          if (e.target.id == "background") onClose();
        }}
      >


        <div className='  flex flex-col   bg-white px-[2.5rem] py-[2.5rem] w-[40rem] rounded-md shadow-2xl ' >
          <form onSubmit={(e) => createFileByData(e)} className=' flex flex-col gap-[1rem] relative  ' >
            <div onClick={(e) => onClose()} className=' absolute flex justify-center items-center w-[2rem] h-[2rem] rounded-[50%] border-[1px] right-[-2rem] top-[-2rem] border-primary shadow-md hover:text-white hover:bg-primary hover:border-white cursor-pointer ' >
              <MdClose className=' text-[1.3rem]  ' />
            </div>
            <h2 className=' font-inter font-[600] text-black ' >Transcribe File</h2>
            <div className=' flex flex-col  gap-[.4rem] ' >
              <label className=' font-inter text-[.85rem]  '  > Transcription Language <span className=' text-red-600 ' >*</span>  </label>
              <select onChange={(e) => setLanguage(e.target.value)} value={language} className='px-[.5rem] py-[.4rem] outline-none bg-secondary border-[.5px] border-black border-opacity-30  rounded-md text-[.9rem] text-[#6e7a8b] ' name="" id="">
                <option className='  ' value="Auto">Auto</option>
                <option value="Hindi">Hindi</option>
                <option value="English">English</option>
              </select>

            </div>

            <div className='flex flex-col justify-center items-center gap-[.4rem] outline-none bg-secondary border-[.5px] border-black border-opacity-30  rounded-md w-[100%] h-[10rem] '>
              <label className='select-notes-container flex flex-col justify-center items-center' >
                <div className=' w-[3rem] h-[3rem] mb-[1rem] bg-[#E0EDFF] rounded-full flex justify-center items-center ' >
                  <Image alt='upload' src={uploadImage} height={24} width={24} className='w-[1.5rem]' />
                </div>
                <p className=' text-[#475367] text-[.8rem] font-inter font-[400] ' ><span className=' text-[#0048AD] font-inter font-[600] text-[.8rem] ' >Click to upload</span>or drag and drop</p>
                <p className=' text-[#98A2B3] text-[.7rem] font-inter font-[400] ' >The maximum file size is 1GB for audio and 10GB for videos.</p>
                <p className=' text-[#98A2B3] text-[.7rem] font-inter font-[400] ' >Supported formats: mp3, mp4, wav, caf, aiff, avi, rmvb, flv, m4a, mov, wmv, wma</p>

                <input
                  ref={ref}
                  className='select-files hidden'
                  type="file"
                  name="notes"
                  id="Select Notes"
                  required
                  accept=".mp3"
                  onChange={(e) => {
                    setSelectedFileName(e.target.files[0]?.name);
                    setFile(e.target.files[0]);
                  }}
                />
              </label>
            </div>

            <p className={` ${selectedFileName ? "text-[#4b515c]" : " text-red-700 "} text-[.7rem] font-inter font-[400]`}>
              {selectedFileName ? `Selected File: ${selectedFileName}` : selectedFileName.length < 0 ? 'The maximum file size is 1GB for audio and 10GB for videos.' : ""}
            </p>

            <div className=' flex flex-col  gap-[.4rem] ' >
              <label className=' hidde font-inter text-[.85rem]  '  > Import from Link <span className=' text-red-600 ' ></span>  </label>
              <input disabled placeholder='Paste a Drobpox, Google Drive or Youtube URL here' type="text" name="" id="file-link" className='   px-[.5rem] py-[.4rem] outline-none bg-secondary border-[.5px] border-black border-opacity-30  rounded-md text-[.9rem] text-[#6e7a8b]' />
            </div>


            <div className=' flex flex-col  gap-[.4rem] ' >
              <label className=' font-inter text-[.85rem]  '  > File Name <span className=' text-red-600 ' >*</span>  </label>
              <input onChange={(e) => setFileName(e.target.value)} value={fileName} placeholder='Enter file naame...' type="text" name="" id="" className='   px-[.5rem] py-[.4rem] outline-none bg-secondary border-[.5px] border-black border-opacity-30  rounded-md text-[.9rem] text-[#6e7a8b]' />
            </div>

            <div className=' flex items-center gap-[1rem] ' >
              <h1>Want to Save for future Transcrbing</h1>
              <label className="relative inline-flex items-center cursor-pointer  ">

                <input className="sr-only peer" value=""
                  onChange={handleCheckboxChange}
                  checked={isChecked} type="checkbox" />
                <div className="peer text-[.8rem] rounded-full outline-none duration-100 after:duration-500 w-[4rem] h-[2rem] bg-blue-300 peer-focus:outline-none   after:content-['No'] after:absolute after:outline-none after:rounded-full after:h-[1.7rem] after:w-[1.7rem] after:bg-white after:top-[.15rem] after:left-[.15rem] after:flex after:justify-center after:items-center  after:text-sky-800 after:font-bold peer-checked:after:translate-x-[2rem] peer-checked:after:content-['Yes'] peer-checked:after:border-white">
                </div>
              </label>
            </div>

            <button type='submit' className={` ${transcibing ? "animate-pulse" : ""} flex gap-[.8rem] justify-center items-center bg-primary  py-[.5rem] text-white rounded-md mt-[2rem]  ${fileName && file ? " " : " opacity-[.4] cursor-not-allowed "} `}

            > {transcibing ? "Transcribing File" : "Transcrbe File"}
              <div className={` ${transcibing ? "" : "hidden"} w-[1rem] h-[1rem] border-t-2  border-white rounded-[50%] animate-spin `} />
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default TranscribeFile
