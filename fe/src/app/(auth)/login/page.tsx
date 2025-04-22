import { Button } from '@/components/ui/button'
import { Coffee } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const Login = () => {
  return (
    <div>
      <div className="fixed top-0 bg-transparent flex w-full h-[56px] items-center justify-center">
        <div className="w-[90%] h-[40px] flex justify-between items-center">
          <div className="w-[151px] h-[24px] flex gap-2 items-center">
            <Coffee />
            <p className="text-black font-bold">Buy Me Coffee</p>
          </div>
          <div>
            <Button variant="secondary" className='bg-secondary'>Login</Button>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="w-1/2 h-screen bg-amber-400 flex justify-center items-center">
         <div className=''>
         <img className="w-full" src="/assets/illustration.svg" alt='illustration' />
         <div>
          <h1>Find your creative work</h1>
          <p>Access support. Start a membership.<br /> Setup a shop. It's easier than you think.</p>
         </div>
         </div>
        </div>
        <div className="w-1/2 h-screen">

        </div>
      </div>
    </div>
  )
}

export default Login