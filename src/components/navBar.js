import React from 'react'
import { LoginOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';


const NavBar = () => {
  return (
    <>

      <Link to={'/login'}>
        <LoginOutlined /> تسجيل الدخول
      </Link>

    </>
  )
}

export default NavBar