import React from 'react';
import { homeImage, folderImage, bookmarkImage, shareImage, binImage, settingImage, questionImage, rocketImage } from "../../public/assets.js";
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import PrimaryButton from '../Button/PrimaryButton.js';
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import { IoIosArrowForward } from "react-icons/io"
import { useState } from 'react';

const LeftPanel = () => {
  const [leftPanelActive, setLeftPanelActive] = useState(true)
  const linkData = [
    {
      name: "Home",
      icon: homeImage,
      href: "/"
    },
    {
      name: "All Files",
      icon: folderImage,
      href: "/files/all"
    },
    {
      name: "Saved",
      icon: bookmarkImage,
      href: "/saved"
    },
    {
      name: "Integrations",
      icon: shareImage,
      href: "/integration"
    },
    {
      name: "Trash",
      icon: binImage,
      href: "/trash"
    },
    {
      name: "Settings",
      icon: settingImage,
      href: "/setting"
    },
    {
      name: "Help and Support",
      icon: questionImage,
      href: "/help"
    },
  ];

  const router = useRouter();

  // Define a function to check if a link is active
  const isLinkActive = (href) => {
    return router.pathname === href;
  };

  return (
    <div className={`sticky top-0 z-[5]  ${leftPanelActive ? "w-[17rem] px-[1.5rem] py-[1.5rem]  " : "w-fit items-center px-[0rem] "} duration-[.5s] h-[100vh] flex flex-col justify-between bg-white border-r-2  border-[#CFCFCF] `}>
      <div data-tooltip-id="collapse" onClick={() => setLeftPanelActive(!leftPanelActive)} className={` z-50 ${leftPanelActive ? "scale-100" : " scale-[.7] "} duration-[.5s] absolute flex justify-center items-center w-[2.2rem] h-[2.2rem] rounded-[50%] border-[1px]  top-[.5rem] right-[0rem] translate-x-[50%] bg-primary text-white  shadow-md hover:text-white hover:bg-[#2c1e6b] hover:border-white cursor-pointer border-[#cfcfcf] `} >
        <IoIosArrowForward className={` ${leftPanelActive ? "" : "rotate-180  "}  text-[1.3rem]  `} />
        <Tooltip
          id="collapse"
          place="right"
          content="collapse"
          className='   '
        />
      </div>
      <div className=' flex flex-col gap-[1rem] ' >
        <div>
          <h1 className={`text-[#0048AD] text-[1.3rem] font-[700] font-inter duration-[.5s] ${leftPanelActive ? "mt-[-.8rem]" : "mt-[1rem] text-center "}  `} >{leftPanelActive ? "Abhay Firm" : "A"}</h1>
        </div>
        <div>
          {linkData?.map((data, index) => (
            <Link key={index} href={data.href} data-tooltip-id={data.name} className={` duration-[.5s]  flex gap-[.8rem] rounded-[0.25rem] px-[1rem] py-[.75rem] font-inter font-[500] text-[.8rem] ${isLinkActive(data.href) ? "text-[#101928] border-[1px] border-[#E0EDFF] bg-[#E0EDFF]" : "text-[#344054]"
              }`} >

              <Image alt='link' src={data.icon} height={24} width={24} className='w-[1rem]' />
              <p className={` ${leftPanelActive ? "" : "hidden"} duration-[.5s] `} >{data.name}</p>

              <Tooltip
                id={data.name}
                place="right"
                content={data.name}
                className='   '
              />

            </Link>
          ))}
        </div>
      </div>



      <Link href={"/upgrade"} data-tooltip-id="upgrade" className={`duration-[.5s] flex flex-col justify-center items-center gap-[.8rem] w-[100%] bg-[#E0EDFF]   ${leftPanelActive ? "  px-[1rem] rounded-[1rem] " : " px-[0rem] rounded-none "}  py-[1rem]  `} >
        <Image src={rocketImage} height={24} width={24} className='w-[1.7rem]' />
        <h1 className={`${leftPanelActive ? "  " : " hidden "} duration-[.5s] text-[#101928] text-[.875rem] font-inter font-[600] `}>Upgrade Account</h1>
        <p className={` ${leftPanelActive ? "  " : " hidden "} duration-[.5s] text-[#475367] text-center text-[.72rem] font-inter font-[400] `} >Access to Unlimited Transcription</p>
        <PrimaryButton text={"Upgrade"} visiblity={leftPanelActive ? true : false} />
        <Tooltip
          id="upgrade"
          place="right"
          content="upgrade"
          className='   '
        />
      </Link>


    </div>
  );
};

export default LeftPanel;
