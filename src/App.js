import './App.css';
import Mainpage from './Components/Mainpage/Mainpage';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from './Components/Register/Register'
import Login from './Components/Login/Login';
import Userpage from './Components/Userpage/Userpage';
import AppContext from './Components/DataContext/AppContext';
import { useEffect, useState } from 'react';

function App() {
  const [nickName, setNickName] = useState('');
  useEffect( () => {
    console.log('APP.js' ,nickName);

  }, [nickName])
  return (
    <AppContext.Provider value={{nickName: nickName, setNickName: setNickName}}>
      <BrowserRouter>
        <div className='App'>
          <Routes>
            <Route element={<Mainpage />} path='/'></Route>
            <Route element={<Register />} path='/register'></Route>
            <Route element={<Login />} path='/login'></Route>
            <Route element={<Userpage />} path='/gameApp'></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
