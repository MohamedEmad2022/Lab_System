import { PlusCircleTwoTone  } from '@ant-design/icons';

import { Alert, Avatar, Button, Card, Col, Form, Input, Modal, Popconfirm, Row, Table, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { isAuthentication } from '../../components/isAuthentication';
import { GetOrders } from '../../store/AdminActions/OrderSlice';

function PatientFile() {
  
  
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const { orders, fetchOrders, updateOrder, totalOrders, error, addOrder, deleteOrder, selectedType, loading } = useSelector(state => state.order)
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);



const token = isAuthentication().token



  useEffect(() => {
    const obj = {
      token,
      page: 1
    }
      dispatch(GetOrders(obj))
  }, [dispatch, updateOrder, deleteOrder, addOrder])



  const columns = [
   
      {
          title: 'الاسم',
          dataIndex: 'patient_name',
          key: 'patient_name',
      },
      {
        title: 'اسم الطبيب',
        dataIndex: 'doctor_name',
        key: 'doctor_name',
    },
    {
        title: 'اللون',
        dataIndex: 'color',
        key: 'color',
    },
    {
        title: 'نوع المادة',
        dataIndex: 'tooth_type',
        key: 'color',
    },
    {
        title: 'اجمالى التكلفة',
        dataIndex: 'total_amount',
        key: 'total_amount',
    },
    {
        title: "المدفوع",
        dataIndex: 'paid_amount',
        key: 'paid_amount',
    },
    {
        title: "المتبقى",
        dataIndex: 'remaining_amount',
        key: 'remaining_amount',
    },
    {
        title: "حالة الدفع",
        dataIndex: 'payment_status',
        key: 'payment_status',
    },
    {
        title: "التوصيل",
        dataIndex: 'delivered',
        key: 'delivered',
    },
    {
        title: "تاريخ التسجيل",
        dataIndex: 'created_at',
        key: 'created_at',
    },
      {
          title: 'الوحدات',
          dataIndex: 'units',
          key: 'units',
      },
      
      {
          title: 'العمليات',
          dataIndex: 'actions',
          key: 'actions',
          render: (_, record) => (
              <Row gutter={3}>
                  
                  <Col>
                      <Button type="primary" onClick={()=>editModal(record)}>
                          تعديل
                      </Button>
                  </Col>
                  <Col>
                      <Popconfirm
                          title="حذف نوع"
                          description="هل تريد حذف هذا النوع"
                          onConfirm=""
                          okText="حذف"
                          cancelText="رجوع"
                      >
                          <Button type="primary" danger >
                              حذف
                          </Button>
                      </Popconfirm>
                  </Col>
              </Row>
          )
      },
  ];


  const dataSource = fetchOrders === "fetch" ? orders?.data.map((item) => {
      return {
          key: item.id,
          attachment: item?.attachment,
          patient_name: item?.patient_name,
          doctor_name: item.doctor.name,
          color: item.color.name,
          tooth_type: item.tooth_type.name,
          total_amount: item.invoice?.total_amount,
          paid_amount: item.invoice?.paid_amount,
          remaining_amount: item.invoice?.remaining_amount,
          payment_status: item.invoice?.payment_status,
          delivered: item.delivered,
          created_at: item.created_at,
          units: item.units.length,
          
      }
  })
      : ""



 
  

  const handleCancel = () => {
      setOpen(false);
  };

  const editModal = (record) => {

      form.setFieldsValue({
          name: record.name,
          cost: record.units,
      })
      
      setEdit(true)
      setOpen(true);
  }




  // const UpdatType = (values) => {
  //     const obj = {
  //         values,
  //         token: isAuthentication().token,
  //         id: selectedType.key
  //     }
  //     dispatch(UpdateToothType(obj))

  //     setOpen(false)
  // }

  // const DeleteType = (record) => {

  //     const obj = {
  //         id: record.key,
  //         token: isAuthentication().token
  //     }
  //     dispatch(DeleteToothType(obj))
  // }


  


  return (
      <>
          {
              error ?
                  <Alert message={error} type="error" showIcon closable />
                  : null

          }
          <>

          <Link to="/newPatient" >
            اضافة حالة
          <PlusCircleTwoTone />
            </Link>
           
          </>
          <Modal
              title="ملف مواد التركيبات"
              open={open}
              onCancel={handleCancel}

              footer={[
                  <Button key="Cancel" onClick={handleCancel}>
                      Cancel
                  </Button>,

              ]}

          >


              <Form form={form}  dir='rtl' labelCol={{ span: 24 }}


              >

                  <Form.Item
                      name='name'
                      label="اسم المادة"


                      rules={[{
                          required: true,
                          message: 'من فضلك ادخال اسم المادة',
                      },
                      ]
                      }

                  >
                      <Input value={selectedType?.name} placeholder='ادخل اسم المادة' />

                  </Form.Item>


                  <Form.Item
                      name='cost'
                      label="التكلفة لكل وحدة"
                      rules={[{
                          required: true,
                          message: 'من فضلك ادخل التكلفة'
                      },
                      ]
                      }

                  >


                  </Form.Item>

                  <Form.Item
                      name='description'
                      label="وصف المادة"


                  >
                      <Input.TextArea placeholder='ادخل وصف للمادة' />

                  </Form.Item>

                  <Form.Item>
                      <Button block type="primary" htmlType="submit" loading={loading}>
                          {edit ? 'تعديل' : 'اضافة'}
                      </Button>
                  </Form.Item>


              </Form>



          </Modal>


          <Table
          style={{marginTop: "10px"}}
              loading={loading}
              columns={columns}
              dataSource={dataSource}
              pagination={{
                
                total: totalOrders,
                onChange: (page)=>{
                  
                  dispatch(GetOrders({token, page}))
                }
              }}
              
          />



      </>
  )
}

export default PatientFile