import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-slate-700 flex text-2xl gap-10 justify-between m-1.5 rounded-xl text-white p-3'>
        <div className="logo cursor-pointer">
            <span className='font-bold '>iTask</span>
        </div>
    
      <ul className='flex gap-5 cursor-pointer '>
        <li className='bg-black p-1 rounded-xl'>Home</li>
        <li className='bg-black p-1 rounded-xl'>Your task</li>
      </ul>
    </div>
  )
}

export default Navbar
