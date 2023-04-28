import { Layout, ConfigProvider, Switch, Typography, Row, Col } from 'antd';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import 'antd/dist/reset.css';

import AppRoutes from './components/AppRoutes';
import SideBar from './components/sideBar';
import NavBar from './components/navBar';
import { useDispatch, useSelector } from 'react-redux';
import { getThemeMode, themeMode } from './store/Theme/themeSlice';
import Register from './pages/Auth/Register';
import LogIn from './pages/Auth/login';
import { isAuthentication } from './components/isAuthentication';
import Invoice from './pages/Reception/invoice';

function App() {


  const dispatch = useDispatch();


  return (
    <>

      <BrowserRouter>

        {isAuthentication() ? (
          <>


            <AppRoutes />


          </>

        )
          :

          <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/' element={<LogIn />} />
            <Route path='*' element={<LogIn />} />

          </Routes>
        }
      </BrowserRouter>


    </>
  );
}

export default App;
