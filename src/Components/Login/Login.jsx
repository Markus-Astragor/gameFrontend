import React, { useEffect, useRef, useState } from 'react';
import '../Register/loader.css';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DataContext from '../DataContext/DataContext';

function Login() {
  const [loader, setLoader] = useState(false);
  const [errorParagraph, setErrorParagraph] = useState('');
  const [nickName, setNickName] = useState('');

  let userName = useRef(null);
  let password = useRef(null);
  let navigateUser = useNavigate();


  const checckUserLogin = (userName, password) => {
    if (userName.length <= 2 || userName.length > 16) {
      setErrorParagraph('Your userName should be more than 2 symbols and less than 16')
      return 1
    }

    if (password.length <= 8 || password.length > 16) {
      setErrorParagraph('Your password should be more than 8 symbols and less than 16');
      return 1
    }
  }

  const handleLogin = (event) => {

    event.preventDefault();
    setLoader(true);
    let userNameLoginValue = userName.current.value;
    let passwordLoginValue = password.current.value;

    let checkUser = checckUserLogin(userNameLoginValue, passwordLoginValue);

    if (checkUser == 1) {
      setLoader(false);
      return
    }

    setErrorParagraph('')
    setNickName('');


    axios.post('http://localhost:8080/login', {
      userName: userNameLoginValue,
      password: passwordLoginValue
    }).then((response) => {
      setLoader(false);
      console.log(response);
      const token = response.data.token;
      const myuserName = response.data ? response.data.userName : 'An error with userName';
      console.log('myUser', myuserName);
      setNickName(myuserName);
      console.log('myy', nickName);
      localStorage.setItem('token', token);
      localStorage.setItem('userName', myuserName);
      // if (nickName !== '') 
      // {
        navigateUser('/gameApp')
      // }
    }).catch(error => {
      setLoader(false)
      const errorMessage = error.response ? error.response.data : 'An error occurred';
      setErrorParagraph(errorMessage);
      console.log(error);
    })
  }
  useEffect(() => {
    console.log('nickname2', nickName);

  }, [nickName])
  return (
    <DataContext.Provider value={{ nickName: nickName, setNickName: setNickName }}>
      <form onSubmit={handleLogin}>
        <div className='h-screen flex justify-center items-center flex-col'>
          <div className='w-1/6'>
            <h2 className='font-black text-2xl text-center'>Let's login to the game</h2>
          </div>
          <div className='w-1/6'>
            <span>UserName</span>
            <input type="text" className="bg-black-50 border border-black-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-yellow-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" required ref={userName} />
          </div>
          <div className='w-1/6'>
            <span>Password</span>
            <input type="password" className="bg-black-50 border border-black-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-yellow-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="password" required ref={password} />
            <p className={errorParagraph ? 'text-lg text-red-500 text-center' : ''}>{errorParagraph}</p>
          </div>
          {
            loader ? <div className="loadingio-spinner-spinner-pdaa8ge8d6"><div className="ldio-10wnxy4fix6">
              <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
            </div></div> : <div className='w-1/6 flex justify-center'>
              <button className='rounded-lg bg-sky-500 px-4 py-2 text-white my-4'>Login</button>
            </div>
          }

          <div className='w-1/6 flex justify-center'>
            <span className='font-bold hover:text-sky-500 transition ease-in-out duration-700'><NavLink to='/register'>Register</NavLink></span>
          </div>
        </div>
      </form>
    </DataContext.Provider>
  )
}

export default Login
