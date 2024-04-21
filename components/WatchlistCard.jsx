"use client"

import React from 'react'
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';


const WatchlistCard = ({ticker, name, watchlist, setWatchlist}) => {

  const handleMoveUp = () => {
    let temp = [];
    for (let i = 0; i < watchlist.length; i++) {
      if (watchlist[i + 1]?.ticker == ticker) {
        temp.push(watchlist[i + 1]);
        temp.push(watchlist[i]);
        i++;
      } else {
        temp.push(watchlist[i]);
      }
    }
    setWatchlist(temp);
  }

  const handleMoveDown = () => {
    let temp = [];
    for (let i = 0; i < watchlist.length; i++) {
      if (watchlist[i].ticker == ticker && watchlist[i + 1]) {
        temp.push(watchlist[i + 1]);
        temp.push(watchlist[i]);
        i++;
      } else {
        temp.push(watchlist[i]);
      }
    }
    setWatchlist(temp);
  }

  const handleDelete = () => {
    const temp = watchlist.filter((obj) => obj.ticker != ticker);
    setWatchlist(temp);
  }

  return (
    <div>
      <div className='watchlistCard'>
        <div className='left'>
          <h1 className='ticker'>{ticker}</h1>
          <p className='name'>{name}</p>
        </div>

        <div className='right'>
          <div className='right-icon'>
            <FontAwesomeIcon icon={faArrowUp} onClick={handleMoveUp}/>
          </div>
          <div className='right-icon'>
            <FontAwesomeIcon icon={faArrowDown} onClick={handleMoveDown}/>
          </div>
          <div className='right-icon'>
            <FontAwesomeIcon icon={faCircleXmark} onClick={handleDelete}/>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default WatchlistCard