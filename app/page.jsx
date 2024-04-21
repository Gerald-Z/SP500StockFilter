"use client";

import React from 'react'
import Card from '@components/Card';
import Image from "next/image";
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'


export default function Home() {
  const [allSymbolList, setAllSymbolList] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const { data: session} = useSession();

  useEffect(() => {   
    const fetchAllSymbols = async () => {
        let listResponse = await fetch(`api/data/getAllSymbols`);
        listResponse = await listResponse.json();
        setAllSymbolList(listResponse.list);
    }
    fetchAllSymbols();
  }, [])


  useEffect(() => {   
    const fetchWatchlist = async () => {
      let watchlistResponse = await fetch(`api/watchlist/getWatchlist?user=${session.user.email}`);
      watchlistResponse = await watchlistResponse.json();
      setWatchlist(watchlistResponse.tickerList);
    }
    if (session) fetchWatchlist();
  }, [session])




  return (
    <main>
      <div className="mainPage">
        <input type="text" className='searchBar' />

        <div className='portfolioContainer'>
          {allSymbolList.map((ticker) => {
            
            return (
              <Card 
                watchlist={watchlist}
                setWatchlist={setWatchlist}
                mainPage={true} 
                cardStyle={'default'} 
                symbol={ticker} 
              />
            )
          })}

        </div>
        
      </div>
    </main>
  );
}
