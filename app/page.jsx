"use client";

import React from 'react'
import Card from '@components/Card';
import Image from "next/image";
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'


export default function Home() {
  const [allSymbolList, setAllSymbolList] = useState([]);
  const [filteredSymbolList, setfilteredSymbolList] = useState([]);

  const [watchlist, setWatchlist] = useState([]);
  const { data: session} = useSession();

  useEffect(() => {   
    const fetchAllSymbols = async () => {
        let listResponse = await fetch(`api/data/getAllSymbols`);
        listResponse = await listResponse.json();
        setAllSymbolList(listResponse.list);
        setfilteredSymbolList(listResponse.list);
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

  
  const handleSearch = (e) => {
    const filteredList = allSymbolList.filter((ticker) => {
      return ticker.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setfilteredSymbolList(filteredList);
  }


  return (
    <main>
      <div className="mainPage">
        <div className="headerContainer">
          <h1 className="header">Look Up Stocks With Custom Conditions Below: </h1>
        </div>
        <input 
          type="text" 
          className='searchBar' 
          onChange={handleSearch}
        />

        <div className='portfolioContainer'>
          {filteredSymbolList.map((ticker) => {
            
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
