import { Menu } from 'antd'
import Typography from 'antd/es/typography/Typography';
import React from 'react'
import { Link } from 'react-router-dom';

const SideBar = () => {

    
      const items = [
       {
        key: '1',
        label: <Link to={'/'}>لوحة التحكم</Link>,

       },
       {
        key: '2',
        label: 'الريسيبشن',
        children: [
          {
            key: 'add',
            label: <Link to={'/Reception/addPatient'}>اضافة مريض</Link>
          },
          {
            key: 'sa',
            label: <Link to={'/Reception/addPatient'}>الخزينه</Link>
          }
        ]
       } 
      ]
      
      
  return (
    <>
    <Typography.Title level={2}>Tepsa Lap</Typography.Title>

        <Menu
        mode="inline"
        items={items}
        >
        </Menu>
    </>
  )
}

export default SideBar