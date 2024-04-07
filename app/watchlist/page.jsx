'use client'

import React from 'react'
import WatchlistCard from '@components/WatchlistCard';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'


const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const { data: session} = useSession();

  useEffect(() => {
    const fetchData = async () => {
      let watchlistResponse = await fetch(`api/users/getWatchlist?user=${session.user.email}`);
      watchlistResponse = await watchlistResponse.json();
      let tempList = [];

      for (let i = 0; i < watchlistResponse.size; i++) {
        tempList.push({
          ticker: watchlistResponse.tickerList[i],
          name: watchlistResponse.nameList[i],
          dateAdded: watchlistResponse.dateAddedList[i],
          cost: watchlistResponse.costList[i],
        })
      }
      setWatchlist(tempList);
    }
    if (session) fetchData();
  }, [session])


  return (
    <main>
      <div className="mainPage">
        <div className='infoSheet'>
          {watchlist.map((obj) => {
            return <WatchlistCard 
              ticker={obj.ticker}
              name={obj.name}
              dateAdded={obj.dateAdded}
              cost={obj.cost}
              setWatchlist={setWatchlist}
            />
          })}
        </div>
      </div>
    
  </main>
  )
}

export default Watchlist;