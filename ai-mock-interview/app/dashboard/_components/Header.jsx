"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { User } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'

function Header() {

    const path=usePathname()

    useEffect(()=>{
        console.log(path)
    },[])

  return (
    <div className='flex p-4 items-center justify-between bg-white'>
        <Image src={'/logo.svg'} width={160} height={100} alt="Logo" />
        <UserButton />
    </div>
  )
}

export default Header 