import { Menu } from 'antd'
import Typography from 'antd/es/typography/Typography';
import React from 'react'
import { Link } from 'react-router-dom';
import { isAuthentication } from './isAuthentication';

const SideBar = () => {

    
      const items = [
       {
        key: '1',
        label: <Link to={'/dashBoard'}>لوحة التحكم</Link>,

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
       } 
      ]
      
      
  return (
    <>
    <Typography.Title level={2}>اوميجا لاب</Typography.Title>

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