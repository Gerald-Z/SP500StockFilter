"use client"

import React from 'react'

const WatchlistCard = ({ticker, name, dateAdded, cost, setWatchlist}) => {
  return (
    <div>
      Ticker: {ticker}
    </div>
  )
}

export default WatchlistCard