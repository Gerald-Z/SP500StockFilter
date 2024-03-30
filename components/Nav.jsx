"use client";


import React from 'react'
import Link from 'next/link';
import Image from 'next/image';



const Nav = () => {
  return (
    <nav className="flex flex-row w-full mb-16 bg-gray-300 ">
        <Link href='/' className="gap-2 flex-auto">
            <Image 
                src="/images/sp500.png" 
                alt="SP500 Logo" 
                width={200} 
                height={150} 
                className="object-contain" 
                
            />
        </Link>
        <div className="flex-auto flex justify-center items-center pl-10">
            <p className="font-mono font-extrabold">SP500 Stock Filter</p>
        </div>
        <div className="flex-auto flex justify-end items-center pr-10">
            <p className="font-mono font-extrabold py-10">User</p>
        </div>


    </nav>
  )
}

export default Nav