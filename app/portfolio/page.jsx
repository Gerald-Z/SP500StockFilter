"use client";

import React from 'react'
import Card from '@components/Card';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'


const Portfolio = () => {
  const [cardStyle, setCardStyle] = useState('default');
  const [symbolList, setSymbolList] = useState([]);
  const { data: session} = useSession();

  useEffect(() => {   
    const fetchData = async () => {
        let watchlistResponse = await fetch(`api/watchlist/getWatchlist?user=${session.user.email}`);
        watchlistResponse = await watchlistResponse.json();
        setSymbolList(watchlistResponse.tickerList);
    }
    if (session) fetchData();
  }, [session])


  return (
    <main>
      <div className="mainPage">
        <div className='portfolioContainer'>
          {symbolList.map((ticker) => {
            return (<Card mainPage={false} cardStyle={cardStyle} symbol={ticker} />)
          })}

        </div>
      </div>
      
    </main>  
  )
}

export default Portfolio;