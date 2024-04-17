import React from 'react'
import logo from "../assets/logo.png"

function Logo() {
  return (
    <div className='h-full flex items-center gap-4 relative font-tiltneon cursor-pointer'>
      <img src={logo} alt="" className='h-[80%]'/>
      <div className='flex flex-col'>
        <p className='text-[2.3vw] font-medium'>Paging <span className='text-emerald-500'>Paradise</span></p>
        <p className='text-[1vw]'>Memory Management, <span className=' text-red-400 font-semibold'>Simplified</span></p>
      </div>
    </div>
  )
}
export default Logo
