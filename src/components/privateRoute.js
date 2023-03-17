import { Col, Layout, Row, Switch } from "antd"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useNavigate } from "react-router-dom"
import { themeMode } from "../store/Theme/themeSlice"
import { isAuthentication } from "./isAuthentication"
import NavBar from "./navBar"
import SideBar from "./sideBar"


const PrivateRoute = () => {
  const navigate = useNavigate()
  const [login, setLogin] = useState(false)
  const { Header, Footer, Sider, Content } = Layout;
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();



  useEffect(() => {
    if (isAuthentication()) {
      setLogin(true)
    } else {
      setLogin(false)
      navigate("/")
    }


  }, [])

  const changeTheme = (checked) => {
    if (checked) {
      dispatch(themeMode("dark"))
    } else {
      dispatch(themeMode("light"))
    }
  }

  // if (login) {
  //     return <Outlet />
  // } else {
  //     return "no routes"
  // }


  return (
    <>
      {
        login ?
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
                    <Switch checkedChildren="Light Mode" unCheckedChildren="Dark Mode" checked={theme === "dark" ? true : false} onChange={changeTheme} />
                  </Col>
                </Row>


              </Header>
              <Content>
                <Row justify='center'>
                  <Col span={22} style={{ paddingTop: '20px' }}>
                    <Outlet />
                  </Col>
                </Row>

              </Content>

              <Footer>Footer</Footer>
            </Layout>

          </Layout>
          :
          ''

      }

    </>
  )

}


export default PrivateRoute