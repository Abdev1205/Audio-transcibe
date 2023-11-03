import React from 'react'

const PrimaryButton = ({ text, visiblity, width }) => {
  return (
    <button className={`bg-primary ${visiblity ? "" : "hidden"} px-[.5rem] py-[.6rem] rounded-md text-white font-inter font-[500] w-[100%] `} >
      {text}
    </button>
  )
}

export default PrimaryButton
