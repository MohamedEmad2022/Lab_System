import { CustomerServiceOutlined, ToolOutlined } from '@ant-design/icons'
import Icon from '@ant-design/icons/lib/components/Icon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTooth } from '@fortawesome/free-solid-svg-icons';

import { Avatar, Card, Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom';

function PatientFile() {
  
  
 


  
  return (
    <>
    <Link to="/newPatient">أضافة مريض</Link>


    {/* <div className='tooth-con'>
    {
      data.map((item, index) => (
        item.top.right.map((it, index) => (
          <FontAwesomeIcon key={index} icon={faTooth} style={{fontSize: `${70 - index*3}px`, transform: "rotateX(180deg)" }} />
          // <div className='tooth' style={{translate: `${index*10}px`}} >{it}</div>
        )
      )
      ))
    }
    
    </div> */}
    </>
  )
}

export default PatientFile