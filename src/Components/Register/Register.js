import React, { useRef, useState } from 'react';
import './loader.css'
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Userpage from '../Userpage/Userpage';



function Register() {
  const [errorParagraphNick, setErrorParagraphNick] = useState('');
  const [passwordError, setPasswordEror] = useState('');
  const [repeatPasswordEror, setReoeatPasswordError] = useState('');
  const [loader, setLoader] = useState(false);
  let userName = useRef();
  let password = useRef();
  let repeatPassword = useRef();
  let navigateUser = useNavigate();


  let CheckUserValid = (userName, password, repeatPassword) => {
    setErrorParagraphNick('')
    setPasswordEror('');
    setReoeatPasswordError('')
    if (userName.length <= 2 || userName.length > 16) {
      setErrorParagraphNick('Your nickname should have more than 2 symbols and less than 16');
      return 1;
    }

    if (password.length <= 8 || password.length > 16) {
      setPasswordEror('Your password should have more than 8 symbols and less than 16')
      return 1;
    }

    if (repeatPassword.length <= 8 || repeatPassword.length > 16) {
      setReoeatPasswordError('Your repeatPassword should contain more than 8 symbols and less than 16');
      return 1;
    }

    if (password !== repeatPassword) {
      setReoeatPasswordError('password and repeatpassword should be the same');
      return 1;
    }
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    setLoader(true)
    let userNameValue = userName.current.value;
    let passwordValue = password.current.value;
    let repeatPasswordValue = repeatPassword.current.value;
    let checkUserValid = CheckUserValid(userNameValue, passwordValue, repeatPasswordValue)

    if (checkUserValid == 1) {
      setLoader(false);
      return
    }

    axios.post('http://localhost:8080/register', {
      userName: userNameValue,
      password: passwordValue
    }).then(response => {
      setLoader(false)
      console.log(response);
      navigateUser('/gameApp')

    }).catch(error => {
          setLoader(false);
          setReoeatPasswordError(error.response.data);
          console.log(error);
        })
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className='h-screen flex justify-center items-center flex-col'>
        <div className='w-1/6'>
          <h2 className='font-black text-2xl text-center'>Let's register to the game</h2>
        </div>
        <div className='w-1/6'>
          <span>UserName</span>
          <input type="text" className="bg-black-50 border border-black-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-yellow-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" required ref={userName} />
          <p className={errorParagraphNick ? 'text-red-500' : ''}>{errorParagraphNick}</p>
        </div>
        <div className='w-1/6'>
          <span>Password</span>
          <input type='password' className="bg-black-50 border border-black-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-yellow-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="type password" required ref={password} />
          <p className={passwordError ? 'text-red-500' : ''}>{passwordError}</p>
        </div>
        <div className='w-1/6'>
          <span>Repeat password</span>
          <input type='password' className="bg-black-50 border border-black-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-yellow-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="repeat password" required ref={repeatPassword} />
          <p className={repeatPasswordEror ? 'text-red-500' : ''}>{repeatPasswordEror}</p>
        </div>
        {
          loader ? <div className="loadingio-spinner-spinner-pdaa8ge8d6"><div className="ldio-10wnxy4fix6">
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
          </div></div> : <div className='w-1/6 flex justify-center'>
            <button className='rounded-lg bg-sky-500 px-4 py-2 text-white my-4 hover:bg-sky-700 transition ease-in-out duration-700'>Register</button>
          </div>
        }
        <div className='w-1/6 flex justify-center'>
          <span className='font-bold hover:text-sky-500 transition ease-in-out duration-700'><NavLink to='/login'>Login</NavLink></span>
        </div>
      </div>
    </form>
  )
}

export default Register
