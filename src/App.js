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

function App() {


  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);

  const lightTheme = {
    token: {

      colorBgBase: '#fff',
      
    }
  }
  const darkTheme = {
    token: {

      colorBgBase: '#001529',
      colorPrimaryBg: '#001529',
      colorFill: '#001529',
      colorBgElevated: '#001529',
      colorBgContainer: '#001529',
      colorText: 'white',
      colorTextQuaternary: '#aeb0af',
      controlOutlineWidth: "0",
      colorPrimaryBg: "#010252",
      colorPrimaryBgHover: "black",
      colorErrorBg: "#ff4d4f"
    }
  }

  
  useEffect(() => {
    dispatch(getThemeMode())
  }, [dispatch])


  return (
    <>

      <BrowserRouter>

        {isAuthentication() ? (
          <ConfigProvider direction='rtl' theme={theme === "dark" ? darkTheme : lightTheme}>
          <AppRoutes />
          </ConfigProvider>
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
