import React, { useContext } from 'react'
import AppContext from '../DataContext/AppContext'
import WelcomePage from './Game/Welcome';

function Userpage() {
  // const {nickName} = useContext(AppContext)
  // console.log(nickName);
  const nickName = localStorage.getItem('userName'); 
  return (
    <div>
      <h2 className='text-center font-bold text-2xl'>Welcome to the game, {nickName}</h2>
      <WelcomePage/>
    </div>
  )
}

export default Userpage
