import ButtonComponent from '@/components/button/button-component'
import LoginComponentFooter from '@/components/login-component'
import { StepperChildProps } from '@/components/stepper/stepper'
import Link from 'next/link'
import React from 'react'

const StepOne:React.FC<{SW: StepperChildProps}> = ({SW}) => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
     <h2 className="text-center text-4xl font-bold text-black">Sign Up</h2>
      <p className="mt-2 font-medium text-center text-md text-gray-600">
        Sign Up to enjoy the best of SoTrip
      </p>
      <div className="mt-5 w-full">
        <LoginComponentFooter
          gText="Continue With Google"
          fText="Continue with Facebook"
        />
      </div>
      <ButtonComponent
        onClick={() => SW.next()}
        text="Sign Up with Email"
        className="text-white w-full text-lg font-bold shadow-xl flex items-center justify-center gap-3"
      />
       <div className="text-center text-md mt-6">
          Already have an account?{" "}
          <Link href="/" className="font-semibold text-s_blue">
            Log in
          </Link>
        </div>
    </div>
  )
}

export default StepOne