"use client";

import React from 'react'
import Image from 'next/image';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import { useState, useEffect } from 'react';


const Page = () => {
  const { data: session} = useSession();
  
  const [profilePic, setProfilePicture] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');


  useEffect(() => {   

    const fetchData = async () => {
        let response = await fetch(`api/users/getUserInfo?user=${session.user.email}`);
        response = await response.json();
        setProfilePicture(response.image);
        setUsername(response.username);
        setEmail(response.email);
       // const resData = response.creationDate.to;
        console.log(typeof response.creationDate);
        setDate(response.creationDate);
    
    }
    if (session) fetchData();
  }, [session])

  /*
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


*/
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
              readOnly={true}
            /> 

            <label for='email'> Email: </label> 
            <input 
              type='text' 
              value={email} 
              readOnly={true} 
            />

          <label for='creationDate'> Account Created On: </label> 
            <input 
              type='text' 
              value={date} 
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