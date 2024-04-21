"use client";

import React from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import { useState, useEffect } from 'react';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Card = ({mainPage, symbol, cardStyle, watchlist, setWatchlist}) => {
  const [stockInfo, setStockInfo] = useState({});
  const [canAdd, setCanAdd] = useState(true);
  const { data: session} = useSession();
  console.log("Watchlist: ", watchlist);

  // Fetches data for the stock with ticker symbol and checks to see if it is already in the user's watchlist.
  useEffect(() => {
    console.log("Use Effect: ", watchlist);
    const fetchData = async () => {
      let stockResponse = await fetch(`api/data/getStock?symbol=${symbol}`);
      stockResponse = await stockResponse.json();
      setStockInfo(stockResponse);
    }

    const checkAdd = async () => {
      console.log("Check Add: ", watchlist);
      console.log("Symbol: ", symbol);
      if (watchlist.includes(symbol)) {
        console.log("TRUE");
        setCanAdd(false);
      }
    }

    fetchData();
    mainPage ? checkAdd() : setCanAdd(false);
  }, [watchlist])


  // Adds the symbol to the user's watchlist.
  const handleAdd = async () => {
    const response = await fetch(`api/watchlist/addToWatchlist?user=${session.user.email}`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        addedName: stockInfo.name,
        addedTicker: stockInfo.symbol,
        addedDate: Date(),
        addedCost: stockInfo.price,
      })
    });
    setWatchlist([...watchlist, symbol]);
  }


  return (
    <>
      {cardStyle === 'default'
        ? (
          <div className='stockCard'>
            <div className='left'>
              <div>
                <h1>{symbol}</h1>
                {console.log("Can Add: ", symbol, ' State: ', canAdd)}
                {canAdd
                ? <FontAwesomeIcon icon={faSquarePlus} onClick={handleAdd}/> 
                : <></>}
              </div>
              <p>{stockInfo.name}</p>
            </div>
            <div className='right'>
              <p>${stockInfo.price}</p>
              <p>{stockInfo.pe}</p>
              <p>{(stockInfo.divYield * 100).toFixed(2)}%</p>
            </div>
          </div>
        )
        : <></>
      }
    </>
  )
}

export default Card