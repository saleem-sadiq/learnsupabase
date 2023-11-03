import Link from 'next/link'
import React from 'react'

const Nav = () => {
  return (
    <div className='w-full h-24 bg-green-400 flex justify-center items-center gap-5 font-bold underline'>
        <Link href={"/"}>Home</Link>
        <Link href={"/create"}>Create New Smoothie</Link>
    </div>
  )
}

export default Nav