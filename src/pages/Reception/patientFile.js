import { CustomerServiceOutlined, ToolOutlined } from '@ant-design/icons'
import Icon from '@ant-design/icons/lib/components/Icon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTooth } from '@fortawesome/free-solid-svg-icons';

import { Avatar, Card, Typography } from 'antd'
import React from 'react'

function PatientFile() {
  const data = [
    {
      top: {
        right:[
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7"
        ],
        left:[
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
        ],
      }
    }
  ]
  const d=["1",
          "2",
          "3",
          "4",
          "5",
          "6",]

  const Fi = ()=>(
    data.map((item, index) => {
      item.top.right.map((it, index) => (
        // <Avatar key={index} icon={<ToolOutlined />} />
   <p>{it}</p>
      )
    )
  })
  )


  
  return (
    <>
    <Card>
      <Typography.Title>PatientFile</Typography.Title>
      
      
    </Card>
    <div className='tooth-con'>
    {
      data.map((item, index) => (
        item.top.right.map((it, index) => (
          <FontAwesomeIcon key={index} icon={faTooth} style={{fontSize: `${70 - index*3}px`, transform: "rotateX(180deg)" }} />
          // <div className='tooth' style={{translate: `${index*10}px`}} >{it}</div>
        )
      )
      ))
    }
    
    </div>
    </>
  )
}

export default PatientFile