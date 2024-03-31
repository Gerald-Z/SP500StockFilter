"use client";

import React from 'react'
import Image from 'next/image';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import { useState, useEffect } from 'react';


const Page = () => {
  const { data: session} = useSession();
  const [username, setUsername] = useState(session?.user.name);
  const [email, setEmail] = useState(session?.user.email);

  useEffect(() => {
    setUsername(session?.user.name);
    setEmail(session?.user.email);
  }, [session])

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handleSubmit = () => {

  }




  return (
    <main>
      <div className="mainPage">
        <div className='infoSheet'>
          <h1>Profile</h1>
          <hr />
          <form onSubmit={handleSubmit}>
            <label>Image</label>
            <Image 
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
            />
            
            <label for='username'> Username </label> 
            <input 
              type='text' 
              value={username} 
              onChange={handleUsernameChange}
              readonly="true"
            /> 

            <label for='email'> Email </label> 
            <input 
              type='text' 
              value={email} 
              onChange={handleEmailChange}
              readonly="true" 
            />
            <button type='submit'> Update Profile </button>
          </form>
        </div>
      </div>

    
  </main>
  )
}

export default Page;