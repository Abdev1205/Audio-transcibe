import Lottie from 'lottie-react';
import LoginAnimationLottie from "../../public/images/loginAnimation.json"

const LoginAnimation = () => {
  return (
    <div className='  flex mx-auto justify-center w-[29rem] ' >
      <Lottie
        animationData={LoginAnimationLottie}
        autoplay={true}
        loop={true}
      />
    </div>
  )
}

export default LoginAnimation
