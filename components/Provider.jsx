"use client"
import React from 'react'

import { SessionProvider } from 'next-auth/react';


// Handles authentication by wrapping the children in a SessionProvider 
// Placed in the Layout component so it can be used everywhere in the app
const Provider = ({children, session}) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider