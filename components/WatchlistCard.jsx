"use client"

import React from 'react'
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';


const WatchlistCard = ({ticker, name, dateAdded, cost, setWatchlist}) => {
  const [currentPrice, setCurrentPrice] = useState(10);
  
  return (
    <div className='watchlistCard'>
      <div className='left'>
        <h1 className='ticker'>{ticker}</h1>
        <p className='name'>{name}</p>
      </div>
      <div className='center'>
        <div className='center-left'>
          <p className='desc'>Added Price:</p>
          <p className='desc'>Current Price:</p>
          <p className='desc'>Change:</p>
        </div>
        <div className='center-right'>
          <p className='amount'>${cost}</p>
          <p className='amount'>${currentPrice}</p>
          <p className='amount'>${currentPrice-cost}</p>
        </div>
        
      </div>
      <div className='right'>
        <div className='right-left'>
          <FontAwesomeIcon icon={faBars} />
        </div>
        <div className='right-right'>
          <FontAwesomeIcon icon={faCircleXmark} />
        </div>
      </div>
      
    </div>
  )
}

export default WatchlistCard