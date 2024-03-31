"use client";

import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
// import useWindowSize from "@rooks/use-window-size"


const Nav = () => {
    const { data: session} = useSession();
    const [providers, setProviders] = useState(null);
  //  const { innerWidth, innerHeight, outerHeight, outerWidth } = useWindowSize();
    const [profileDropdown, setProfileDropdown] = useState(false);

    useEffect(() => {
        // Allows users to sign in using Google and Next-auth.
        const setUpProviders = async () => {
            const response = await getProviders();

            setProviders(response); 
        }
        setUpProviders();
    }, [])

  return (
    <nav className="flex flex-nowrap flex-row justify-between w-full bg-black ">
        <Link href='/' className="flex-initial basis-1/8">
            <Image 
                src="/images/sp500.png" 
                alt="SP500 Logo" 
                width={110} 
                height={150} 
                className="object-contain" 
            />
        </Link>
        <div className="flex-initial basis-6/8 flex justify-center items-center w-300">
            <p className="font-mono font-extrabold text-white">SP500 Stock Filter</p>
        </div>
        <div className="flex-initial basis-1/8 flex justify-center items-center pr-10 pl-10 bg-zinc-100	">
        {session?.user ? (
            <div className="flex">
                <Image 
                    src={session?.user.image}
                    width={37}
                    height={37}
                    className="rounded-full"
                    alt="profile"
                    onClick={() => setProfileDropdown((state) => !state)}
                />

                {profileDropdown 
                ?    (<div className='profileDropdown'>
                        <Link href='/' 
                            className="dropDownLink"                             
                            onClick={() => setProfileDropdown(false)}>
                                Homepage   
                        </Link>
                        <Link href='/profile' 
                            className="dropDownLink"                             
                            onClick={() => setProfileDropdown(false)}>
                                My Profile    
                        </Link>
                        <Link href='/watchlist' 
                            className="dropDownLink"                             
                            onClick={() => setProfileDropdown(false)}>
                                My Watchlist    
                        </Link>
                        <Link href='/portfolio' 
                            className="dropDownLink"                             
                            onClick={() => setProfileDropdown(false)}>
                                My Portfolio    
                        </Link>
                        <button
                            onClick={signOut}
                            className="dropDownLink"      
                        >
                            Sign Out
                        </button>
                    
                    </div>)
                : <></>
                }
            </div>
        ) : 
            <>
                {providers && 
                Object.values(providers).map((provider) => (
                    <button
                        type="button"
                        key={provider.name}
                        onClick={() => signIn(provider.id)}
                        className='blackBtn'
                    >
                        Sign In 
                    </button>
                ))}
            </>
        }
        </div>
    </nav>
  )
}

export default Nav