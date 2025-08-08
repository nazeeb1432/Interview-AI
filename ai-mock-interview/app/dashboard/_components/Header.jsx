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
    <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
        <Image src={'/logo.svg'} width={160} height={100} alt="Logo" />
        <ul className='hidden md:flex gap-4'>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard' && 'text-primary font-bold'}` }>DashBoard</li>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='dashboard/questions' && 'text-primary font-bold'}` }>Questions</li>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='dashboard/upgrade' && 'text-primary font-bold'}` }>Upgrade</li>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='dashboard/how-it-works' && 'text-primary font-bold'}` }>How it works?</li>
        </ul>
        <UserButton />
    </div>
  )
}

export default Header 