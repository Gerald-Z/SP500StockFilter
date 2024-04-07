'use client'

import React from 'react'
import WatchlistCard from '@components/WatchlistCard';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'


const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const { data: session} = useSession();

  const [changeStatus, setChangeStatus] = useState('Save Changes');
  const [changeClass, setChangeClass] = useState('');

  // Fetch watchlist data using the user's email. 
  useEffect(() => {
    const fetchData = async () => {
      let watchlistResponse = await fetch(`api/watchlist/getWatchlist?user=${session.user.email}`);
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

  // Updates the watchlist in the db when the user chooses to save changes. 
  const handleSave = async () => {
    const names = watchlist.map((obj) => obj.name);
    const tickers = watchlist.map((obj) => obj.ticker);
    const dates = watchlist.map((obj) => obj.dateAdded);
    const costs = watchlist.map((obj) => obj.cost);
    const response = await fetch(`api/watchlist/editWatchlist?user=${session.user.email}`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newName: names,
        newTicker: tickers,
        newDate: dates,
        newCost: costs,
      })
    });
    if (response.status == 200) {
      setChangeStatus('Changes Saved');
      setChangeClass('changeSuccessful');
    } else {
      setChangeStatus('Changes Failed');
      setChangeClass('changeFailed');
    }
    setTimeout(function(){
      setChangeStatus('Save Changes');
      setChangeClass('');
    },1500);
  }

  return (
    <main>
      <div className="mainPage">
        <div className='infoSheet'>
          {watchlist.map((obj) => {
            return <WatchlistCard 
              ticker={obj.ticker}
              name={obj.name}
              watchlist={watchlist}
              setWatchlist={setWatchlist}
            />
          })}
        </div>
        <div className='confirmSheet'>
          <p className='addText'>Add to Watchlist</p>
        </div>
        <div className='confirmSheet' onClick={handleSave}>
          <p className={changeClass}>{changeStatus}</p>
        </div>
        </div>
    
  </main>
  )
}

export default Watchlist;