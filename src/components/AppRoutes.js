import { Col, ConfigProvider, Row, Spin } from 'antd'
import React, { lazy, Suspense, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import LogIn from '../pages/Auth/login'
import Register from '../pages/Auth/Register'
import { getThemeMode } from '../store/Theme/themeSlice'

import Assets from '../pages/Assets/Assets'

const AppRoutes = () => {

  const dispatch = useDispatch()


  const { theme } = useSelector((state) => state.theme);

  const lightTheme = {
    token: {

      colorBgBase: '#fff',
      colorTextQuaternary: '#828181',

    }
  }
  const darkTheme = {
    token: {

      colorBgBase: '#001529',
      colorPrimaryBg: '#001529',
      colorText: 'white',
      colorTextQuaternary: '#aeb0af',
      controlOutlineWidth: "0",
      colorErrorBg: "#ff4d4f"
    }
  }

  


  useEffect(() => {
    dispatch(getThemeMode())
  }, [dispatch])






  const PrivateRoute = lazy(() => import("./privateRoute"))
  const PatientFile = lazy(() => import("../pages/Reception/patientFile"))
  const ToothType = lazy(() => import("../pages/Reception/toothType"))
  const ColorType = lazy(() => import("../pages/Reception/colorType"))
  const DoctorFile = lazy(() => import("../pages/Reception/doctorFile"))
  const NewPatient = lazy(() => import("../pages/Reception/newPatient"))
  const OrderUpdate = lazy(() => import("../pages/Reception/updateOrder"))
  const Invoice = lazy(() => import("../pages/Reception/invoice"))
  const ExpensesTypeFile = lazy(() => import("../pages/Expenses/expensesTypeFile"))
  const ExpensesFile = lazy(() => import("../pages/Expenses/expensesFile"))
  const Home = lazy(() => import("../pages/home"))
  const LabData = lazy(() => import("../pages/labData"))

  const NotFound = lazy(() => import("../pages/404"))


  const Loading = () => (
    <>
      <Row justify="center" style={{ textAlign: "center", height: "100vh" }} align="middle" >
        <Col span={24}>
          <Spin tip="Loading" size="large" />
        </Col>
      </Row>

    </>
  )

  return (
    <>
      <Suspense fallback={<Loading />}>

        <Routes>
          <Route path='/' element={
            <ConfigProvider direction='rtl' theme={theme === "dark" ? darkTheme : lightTheme}>
              <PrivateRoute />
            </ConfigProvider>
          }>
            <Route exact path='/' element={<Home />} />
            <Route path='patientFile' element={<PatientFile />} />
            <Route path='toothType' element={<ToothType />} />
            <Route path='colorType' element={<ColorType />} />
            <Route path='doctorFile' element={<DoctorFile />} />
            <Route path='newPatient' element={<NewPatient />} />
            <Route path='updateOrder/:id' element={<OrderUpdate />} />

            <Route path='expensesTypeFile' element={<ExpensesTypeFile />} />
            <Route path='expensesFile' element={<ExpensesFile />} />
            <Route path='labData' element={<LabData />} />
            <Route path='assets' element={<Assets />} />
          </Route>
          <Route path='invoice/:id' element={
            <ConfigProvider direction='rtl'>
              <Invoice />
            </ConfigProvider>
          } />
          <Route path='*' element={<NotFound />} />

        </Routes>
      </Suspense>
    </>
  )
}

export default AppRoutes