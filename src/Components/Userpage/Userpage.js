import React, { useContext } from 'react'
import AppContext from '../DataContext/AppContext'

function Userpage() {
  const {nickName} = useContext(AppContext)
  console.log(nickName); 
  return (
    <div>
      Welcome to the game, {nickName}
    </div>
  )
}

export default Userpage
