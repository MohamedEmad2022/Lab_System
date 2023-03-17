import React, { useEffect, useState } from 'react'
import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { isAuthentication } from './isAuthentication';
import { useDispatch } from 'react-redux';
import { LogOutHand } from '../store/Auth/logOutSlice';


const NavBar = () => {
  const dispatch = useDispatch()
  const [log, setLog] = useState("")

  const token = isAuthentication().token



  useEffect(()=>{
    isAuthentication() ? setLog("in") : setLog("out")
  },[])

  const switchLogButton = (log) => {
    if (log ==="in") {
      return (
        <Link to={'/'} onClick={() => dispatch(LogOutHand(token))}>
          <LogoutOutlined /> تسجيل خروج
        </Link>
      )
    } 
      
     else{
      return (
        <Link to={'/'}>
          <LoginOutlined /> تسجيل الدخول
        </Link>
      )
    }
}

  return (
    <>

      {switchLogButton(log)}

    </>
  )
}

export default NavBar