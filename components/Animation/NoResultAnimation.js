import React from 'react'
import Lottie from 'lottie-react';
import noResultAnim from "../../public/images/NoResult.json"

const NoResultAnimation = () => {
  return (
    <>
      <div className=' w-[35rem] ' >

        <Lottie
          animationData={noResultAnim}
          autoplay={true}
          loop={true}
        />
      </div>
    </>
  )
}

export default NoResultAnimation
