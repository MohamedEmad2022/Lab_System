import { Col, Layout, Row, Switch } from "antd"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useNavigate } from "react-router-dom"
import { themeMode } from "../store/Theme/themeSlice"
import { isAuthentication } from "./isAuthentication"
import NavBar from "./navBar"
import SideBar from "./sideBar"
import { GetColorsTypes } from '../store/AdminActions/colorTypeSlice'
import { GetDoctors } from '../store/AdminActions/doctorSlice'
import { GetOrders } from '../store/AdminActions/OrderSlice'
import { GetToothType } from '../store/AdminActions/toothTypeSlice'
import { GetLabData } from "../store/LabDataSlice"

const PrivateRoute = () => {
  const navigate = useNavigate()
  const [login, setLogin] = useState(false)
  const { Header, Footer, Sider, Content } = Layout;
  const { theme } = useSelector((state) => state.theme);
  const { updateOrder, addOrder, deleteOrder } = useSelector(state => state.order)
  const dispatch = useDispatch();
  const token = isAuthentication().token


  useEffect(() => {
    dispatch(GetColorsTypes(token))
    dispatch(GetDoctors(token))
    dispatch(GetToothType(token))
    dispatch(GetLabData(token))

    
}, [dispatch])

useEffect(() => {
  const obj = {
      token,
      page: 1
  }
  dispatch(GetOrders(obj))
}, [dispatch, updateOrder, deleteOrder, addOrder])


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



  return (
    <>
      {
        login ?
          <Layout className='' style={{ height: "auto", minHeight: "100Vh" }}>
            <Sider
              style={{
                paddingTop: "15px",
                position: 'fixed',
                right: 0,
                height: "100vh",
                zIndex: '100',

              }}
              width={250}
              theme='light' >
              <SideBar />
            </Sider>
            <Layout style={{ marginRight: "250px" }}>
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
              <Row justify='center'>
                <Col span={23}>
                  <Content style={{ minHeight: "80Vh" }}>
                    <Row >
                      <Col span={24} style={{ paddingTop: '20px' }}>
                        <Outlet />
                      </Col>
                    </Row>

                  </Content>
                </Col>
              </Row>


              <Row >
                <Col>
                  <Footer >Footer</Footer>
                </Col>
              </Row>
            </Layout>

          </Layout>
          :
          ''

      }

    </>
  )

}


export default PrivateRoute