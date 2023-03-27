import { Alert, Button, Col, Form, Input, Modal, Popconfirm, Row, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isAuthentication } from '../../components/isAuthentication'
import { AddDoctor, DeleteDoctor, GetDoctors, selectDoctor, UpdateDoctor } from '../../store/AdminActions/doctorSlice'

const DoctorFile = () => {

  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const { doctors, fetchDoctors, updateDoctor, error, addDoctor, deleteDoctor, selectedDoctor, loading } = useSelector(state => state.doctor)
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);







  useEffect(() => {

    dispatch(GetDoctors(isAuthentication().token))

  }, [dispatch, updateDoctor, deleteDoctor, addDoctor])



  const columns = [

    {
      title: 'الاسم',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'الايميل',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'العنوان',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'رقم التليفون',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'رقم الواتساب',
      dataIndex: 'whatsapp',
      key: 'phone',
    },
    {
      title: 'العمليات',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => (
        <Row gutter={3}>

          <Col>
            <Button type="primary" onClick={() => editModal(record)}>
              تعديل
            </Button>
          </Col>
          <Col>
            <Popconfirm
              title="حذف نوع"
              description="هل تريد حذف هذا النوع"
              onConfirm={() => deletedoctor(record.id)}
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


  const dataSource = fetchDoctors === "fetch" ? doctors.map((item) => {
    return {
      id: item.id,
      name: item.name,
      email: item.email,
      address: item.address,
      phone: item.phone,
      whatsapp: item.whatsapp,
      key: item.id,

    }
  })
    : ""



  const AddModal = () => {
    form.setFieldsValue({
      name: "",
      email: "",
      address: "",
      phone: "",
      whatsapp: "",
    })

    setEdit(false)
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const editModal = (record) => {

    form.setFieldsValue({
      name: record.name,
      email: record.email,
      address: record.address,
      phone: record.phone,
      whatsapp: record.whatsapp,
    })
    dispatch(selectDoctor(record))
    setEdit(true)
    setOpen(true);
  }





  const adddoctor = (values) => {
    const obj = {
      values,
      token: isAuthentication().token
    }
    dispatch(AddDoctor(obj))
    setOpen(false)
  }

  const updatedoctor = (values) => {
    const obj = {
      values,
      token: isAuthentication().token,
      id: selectedDoctor.id
    }
    dispatch(UpdateDoctor(obj))

    setOpen(false)
  }

  const deletedoctor = (id) => {

    const obj = {
      id,
      token: isAuthentication().token
    }
    dispatch(DeleteDoctor(obj))
  }





  return (
    <>
      {
        error ?
          <Alert message={error} type="error" showIcon closable />
          : null

      }
      <>
        <Row gutter={16} style={{ paddingBottom: "20px", paddingTop: "20px" }}>
          <Col>
            <Button type="primary" onClick={AddModal}>
              اضافة
            </Button>
          </Col>

        </Row>




      </>
      <Modal
        title="ملف الاطباء"
        open={open}
        onCancel={handleCancel}

        footer={[
          <Button key="Cancel" onClick={handleCancel}>
            Cancel
          </Button>,

        ]}

      >


        <Form form={form} onFinish={edit ? updatedoctor : adddoctor} dir='rtl' labelCol={{ span: 24 }}


        >

          <Form.Item
            name='name'
            label="اسم الطبيب"


            rules={[{
              required: true,
              message: 'من فضلك ادخال اسم الطبيب',
            },
            ]
            }

          >
            <Input placeholder='ادخل اسم الطبيب' />

          </Form.Item>
          <Form.Item
            name='email'
            label="الايميل"

          >
            <Input placeholder='ادخل الايميل' />

          </Form.Item>
          <Form.Item
            name='phone'
            label="رقم التليفون"

          >
            <Input placeholder='رقم التليفون' />

          </Form.Item>
          <Form.Item
            name='whatsapp'
            label="رقم الواتساب"

          >
            <Input placeholder='رقم الواتساب' />

          </Form.Item>
          <Form.Item
            name='address'
            label="العنوان"

          >
            <Input placeholder='العنوان' />

          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit" loading={loading}>
              {edit ? 'تعديل' : 'اضافة'}
            </Button>
          </Form.Item>


        </Form>



      </Modal>


      <Table
        loading={loading}
        columns={columns}
        dataSource={dataSource}

      />



    </>
  )
}

export default DoctorFile
