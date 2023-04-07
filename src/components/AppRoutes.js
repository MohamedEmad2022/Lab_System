import { Col, Row, Spin } from 'antd'
import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import LogIn from '../pages/Auth/login'
import Register from '../pages/Auth/Register'


const AppRoutes = () => {


  const PrivateRoute = lazy(() => import("./privateRoute"))
  const PatientFile = lazy(() => import("../pages/Reception/patientFile"))
  const ToothType = lazy(() => import("../pages/Reception/toothType"))
  const ColorType = lazy(() => import("../pages/Reception/colorType"))
  const DoctorFile = lazy(() => import("../pages/Reception/doctorFile"))
  const NewPatient = lazy(() => import("../pages/Reception/newPatient"))
  const OrderUpdate = lazy(() => import("../pages/Reception/updateOrder"))
  const AddExpensesType = lazy(() => import("../pages/Expenses/addExpensesType"))
  const AddExpenses = lazy(() => import("../pages/Expenses/addExpenses"))
  const DashBoard = lazy(() => import("../pages/dashBoard"))
  const LabData = lazy(() => import("../pages/labData"))
  const NotFound = lazy(() => import("../pages/404"))


  const Loading = () => (
    <>
      <Row justify="center" style={{  textAlign: "center", height: "100vh" }} align="middle" >
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

          <Route path='/' element={<PrivateRoute />}>
            <Route path='dashBoard' element={<DashBoard />} />
            <Route path='patientFile' element={<PatientFile />} />
            <Route path='toothType' element={<ToothType />} />
            <Route path='colorType' element={<ColorType />} />
            <Route path='doctorFile' element={<DoctorFile />} />
            <Route path='newPatient' element={<NewPatient />} />
            <Route path='updateOrder/:id' element={<OrderUpdate />} />
            <Route path='addExpensesType' element={<AddExpensesType />} />
            <Route path='addExpenses' element={<AddExpenses />} />
            <Route path='labData' element={<LabData />} />

          </Route>
          <Route path='*' element={<NotFound />} />

        </Routes>
      </Suspense>
    </>
  )
}

export default AppRoutes