import { EditOutlined } from '@ant-design/icons'
import { Button, Form, Input, Modal, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isAuthentication } from '../components/isAuthentication'
import { GetLabData, UpdateLabData } from '../store/LabDataSlice'

const LabData = () => {

    const [form] = Form.useForm()
    const dispatch = useDispatch()
    const {settings, updateSettings, loading} = useSelector(state => state.settings)
    const [open, setOpen] = useState(false);

    const token = isAuthentication().token



    useEffect(()=>{

        dispatch(GetLabData(token))

    },[dispatch, updateSettings])


    const editModal = () => {

        form.setFieldsValue({
            name: settings.name,
            phone: settings.phone,
            whatsapp: settings.whatsapp,
            notes: settings.notes
        })
    
        setOpen(true);
    }

    const handleCancel = () => {
        setOpen(false);
    };

    const Updatdata = (values) => {
        const obj = {
            values,
            token
            
        }
        dispatch(UpdateLabData(obj))

        setOpen(false)
    }


  return (
    <>
    <Typography.Title level={3}>معلومات المعمل</Typography.Title>

    <Typography.Paragraph>اسم المعمل : {settings?.name}</Typography.Paragraph>
    <Typography.Paragraph> تليفون المعمل : {settings?.phone}</Typography.Paragraph>
    <Typography.Paragraph>رقم واتس المعمل : {settings?.whatsapp}</Typography.Paragraph>
    <Typography.Paragraph>وصف المعمل : {settings?.notes}</Typography.Paragraph>

    <Button icon={<EditOutlined/>} onClick={editModal} >تعديل</Button>


    <Modal
                title="تعديل بيانات المعمل"
                open={open}
                onCancel={handleCancel}

                footer={[
                    <Button key="Cancel" onClick={handleCancel}>
                        Cancel
                    </Button>,

                ]}

            >


                <Form form={form} onFinish={Updatdata} dir='rtl' labelCol={{ span: 24 }}


                >

                    <Form.Item
                        name='name'
                        label="اسم المعمل"


                        rules={[{
                            required: true,
                            message: 'من فضلك ادخال اسم المعمل',
                        },
                        ]
                        }

                    >
                        <Input placeholder='ادخل اسم المعمل' />

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
                        name='notes'
                        label="وصف المعمل"


                    >
                        <Input.TextArea placeholder='ادخل وصف المعمل' />

                    </Form.Item>

                    <Form.Item>
                        <Button  block type="primary" htmlType="submit" loading={loading}>
                        تعديل
                        </Button>
                    </Form.Item>


                </Form>



            </Modal>



    </>
  )
}

export default LabData
