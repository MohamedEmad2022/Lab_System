import { Layout, ConfigProvider, Switch, Typography, Row, Col } from 'antd';
import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import 'antd/dist/reset.css';

import AppRoutes from './components/AppRoutes';
import SideBar from './components/sideBar';
import NavBar from './components/navBar';

function App() {

  const { Header, Footer, Sider, Content } = Layout;
  const [theme, setTheme] = useState("light")

  const lightTheme = {
    token: {

      colorBgBase: '#fff',

    }
  }
  const darkTheme = {
    token: {

      colorBgBase: '#001529',
      colorText: 'white',
    }
  }

  const changeTheme = (checked) => {
    if (checked) {

      setTheme('dark')
    } else {

      setTheme('light')
    }
  }

  return (
    <>
      <ConfigProvider direction='rtl' theme={theme === "dark" ? darkTheme : lightTheme}>
        <BrowserRouter>
          <Layout className='container'>
            <Sider theme='light' >
              <SideBar />
            </Sider>
            <Layout>
              <Header>
                <Row justify='space-between'>
                  <Col>
                    <NavBar />
                  </Col>
                  <Col>
                    <Switch onChange={changeTheme} />
                  </Col>
                </Row>


              </Header>
              <Content>
                <Row justify='center'>
                  <Col span={22} style={{paddingTop: '20px'}}>
                  <AppRoutes />
                  </Col>
                </Row>
                
              </Content>

              <Footer>Footer</Footer>
            </Layout>

          </Layout>
        </BrowserRouter>
      </ConfigProvider>

    </>
  );
}

export default App;
