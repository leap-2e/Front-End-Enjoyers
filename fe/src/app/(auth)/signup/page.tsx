"use client"

import { Button } from '@/components/ui/button'
import { Coffee } from 'lucide-react'
import React, { useState } from 'react'
import { RightSide } from '../_components/RightSide'
import Link from 'next/link'
import { TakeUserName } from '../_components/TakeUserName'
import { TakeUserInfo } from '../_components/TakeUserInfo'

const SignUp = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [TakeUserName, TakeUserInfo];
  const Components = steps[currentStep];

  return (
    <div>
      <div className="fixed top-0 bg-transparent flex w-full h-[56px] items-center justify-center">
        <div className="w-[90%] h-[40px] flex justify-between items-center">
          <div className="w-[151px] h-[24px] flex gap-2 items-center">
            <Coffee />
            <p className="text-black font-bold">Buy Me Coffee</p>
          </div>
          <div>
            <Link href="/login"><Button variant="secondary" className='bg-secondary'>Login</Button></Link>
          </div>
        </div>
      </div>
      <div className="flex">
        <RightSide />
        <div className="w-1/2 h-screen flex items-center justify-center">
          <Components currentStep={currentStep} setCurrentStep={setCurrentStep} />
        </div>
      </div>
    </div>
  )
}

export default SignUp