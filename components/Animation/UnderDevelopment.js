import Lottie from "lottie-react"
import UnderDevelopmentLottie from "../../public/images/under-construction.json"

const UnderDevelopment = () => {
  return (
    <div className=' mx-auto my-auto flex flex-col mt-[-1rem] justify-normal items-center  w-[35rem] ' >
      <Lottie
        animationData={UnderDevelopmentLottie}
        autoplay={true}
        loop={true}
      />
      <h1 className="text-black text-[1.8rem] font-inter font-[800]" >We are developing this Feature</h1>
    </div>
  )
}

export default UnderDevelopment
