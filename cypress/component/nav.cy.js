import React from 'react'
import WatchlistCard from '../../components/WatchlistCard'

it('The Nav topbar is loaded', () => {
  cy.mount(      
    <WatchlistCard 
      ticker='AAPL'
      name='Apple Inc'
    />
  )
})
