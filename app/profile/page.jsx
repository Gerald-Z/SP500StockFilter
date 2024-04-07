"use client";

import React from 'react'
import Image from 'next/image';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import { useState, useEffect } from 'react';


const Page = () => {
  const { data: session} = useSession();
  
  const [profilePic, setProfilePicture] = useState(session?.user.image);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(session?.user.email);
  const [date, setDate] = useState('');
  const [size, setSize] = useState(0);

  useEffect(() => {   
    const fetchData = async () => {
        let response = await fetch(`api/users/getUserInfo?user=${session.user.email}`);
        response = await response.json();
        setProfilePicture(response.image);
        setUsername(response.username);
        setEmail(response.email);
        setDate(response.creationDate);

        let watchlistResponse = await fetch(`api/users/getWatchlist?user=${session.user.email}`);
        watchlistResponse = await watchlistResponse.json();
        setSize(watchlistResponse.size);
    }
    if (session) fetchData();
  }, [session])


  const handleUsernameChange = async (e) => {
    setUsername(e.target.value);
  }



  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }



  const handleSubmit = async () => {
    await fetch(`api/users/setUserInfo?user=${session.user.email}`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name: username})
    });


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
              src={profilePic}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
            />
            
            <label for='username'> Username: </label> 
            <input 
              type='text' 
              value={username} 
              onChange={handleUsernameChange}
              readOnly={false}
            /> 

            <label for='email'> Email: </label> 
            <input 
              type='text' 
              value={email} 
              onChange={handleEmailChange}
              readOnly={true} 
            />

            <label for='creationDate'> Account Created On: </label> 
            <input 
              type='text' 
              value={date} 
              readOnly={true}
            />

            <label for='creationDate'> Stocks in the Watchlist: </label> 
            <input 
              type='text' 
              value={size} 
              readOnly={true}
            />

            <button type='submit'> Update Profile </button>
          </form>
        </div>
      </div>

    
  </main>
  )
}

export default Page;