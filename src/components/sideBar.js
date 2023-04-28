import { Menu } from 'antd'
import Typography from 'antd/es/typography/Typography';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { GetLabData } from '../store/LabDataSlice';
import { isAuthentication } from './isAuthentication';

const SideBar = () => {
  const dispatch = useDispatch()
  const {settings} = useSelector(state => state.settings)

  const token = isAuthentication().token
  

    
      const items = [
       {
        key: '1',
        label: <Link to={'/'}>الصفحة الرئيسية</Link>,

       },
       {
        key: '2',
        label: 'الريسيبشن',
        children: [
          {
            key: 'add',
            label: <Link to={'/patientFile'}>ملف المرضى</Link>
          },
          {
            key: 'tt',
            label: <Link to={'/toothType'}>ملف مواد التركيبات</Link>
          },
          {
            key: 'ct',
            label: <Link to={'/colorType'}>ملف الوان التركيبات</Link>
          },
          {
            key: 'df',
            label: <Link to={'/doctorFile'}>ملف الاطباء</Link>
          },
        ]
       },
       {
        key: '55',
        label: 'ادارة المصروفات',
        children: [
          {
            key: 're',
            label: <Link to={'/expensesTypeFile'}>اضافة بند مصاريف</Link>
          },
          {
            key: 'ui',
            label: <Link to={'/expensesFile'}>ملف المصروفات</Link>
          },
          
        ]
       },
       {
        key: 'lab',
        label: <Link to={'/labData'}>بيانات المعمل</Link>,

       },
      ]
      
      
  return (
    <>
    <Typography.Title level={2}>{settings?.name}</Typography.Title>

        {isAuthentication() ? 
      <Menu
      mode="inline"
      items={items}
      >
      </Menu>
      :
      ""  
      }
    </>
  )
}

export default SideBar