import React from 'react'
import logo from "../assets/logo.png"

function Logo() {
  return (
    <div className='h-[20vh] flex items-center gap-4 relative'>
      <img src={logo} alt="" className='h-[80%]'/>
      <div className='flex flex-col'>
        <p className='text-[2.75rem] font-medium'>Paging <span className='text-emerald-500'>Paradise</span></p>
        <p className='text-xl'>Memory Management, <span className=' text-red-400 font-semibold'>Simplified</span></p>
      </div>
    </div>
  )
}
export default Logo
