import React, { Children } from 'react'
import Header from './header'

const TopNav = ({children}) => {
  return (
    <>
    <Header/>
    <div className='mr-top'>
        {children}
    </div>
    </>
    
  )
}

export default TopNav