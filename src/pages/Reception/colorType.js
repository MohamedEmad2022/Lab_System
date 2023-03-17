import { Alert, Button, Col, Form, Input, Modal, Popconfirm, Row, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isAuthentication } from '../../components/isAuthentication'
import { AddColorType, DeleteColorType, GetColorsTypes, selectColor, UpdateColorType } from '../../store/AdminActions/colorTypeSlice'

const ColorType = () => {
  const [form] = Form.useForm()
    const dispatch = useDispatch()
    const { colors, fetchColors, updateColor, error, addColor, deleteColor, selectedColor, loading } = useSelector(state => state.color)
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);







    useEffect(() => {
        dispatch(GetColorsTypes(isAuthentication().token))
    }, [dispatch, updateColor, deleteColor, addColor])



    const columns = [
        
        {
            title: 'اللون',
            dataIndex: 'name',
            key: 'color',
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
                            onConfirm={()=>DeleteColor(record.id)}
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

    

    const dataSource = fetchColors === "fetch" ? colors.data.map((item) => {
        return {
            key: item.id,
            name: item.name,
            id: item.id
            
        }
    })
        : ""



    const AddModal = () => {
        form.setFieldsValue({
            name: "",
            
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
            
        })
        dispatch(selectColor(record))
        setEdit(true)
        setOpen(true);
    }





    const AddColor = (values) => {
        const obj = {
            values,
            token: isAuthentication().token
        }
        dispatch(AddColorType(obj))
        setOpen(false)
    }

    const UpdateColor = (values) => {
        const obj = {
            values,
            token: isAuthentication().token,
            id: selectedColor.id
        }
        dispatch(UpdateColorType(obj))

        setOpen(false)
    }

    const DeleteColor = (id) => {

        const obj = {
            id,
            token: isAuthentication().token
        }
        dispatch(DeleteColorType(obj))
    }





    return (
        <>
            {
                error ?
                    <Alert message={error} type="error" showIcon closable />
                    : null 

            }
            <>
                <Row gutter={16} style={{paddingBottom: "20px", paddingTop: "20px"}}>
                    <Col>
                        <Button type="primary" onClick={AddModal}>
                            اضافة
                        </Button>
                    </Col>
                    
                </Row>




            </>
            <Modal
                title="ملف الالوان"
                open={open}
                onCancel={handleCancel}

                footer={[
                    <Button key="Cancel" onClick={handleCancel}>
                        Cancel
                    </Button>,

                ]}

            >


                <Form form={form} onFinish={edit ? UpdateColor : AddColor} dir='rtl' labelCol={{ span: 24 }}


                >

                    <Form.Item
                        name='name'
                        label="اسم اللون"


                        rules={[{
                            required: true,
                            message: 'من فضلك ادخال اسم اللون',
                        },
                        ]
                        }

                    >
                        <Input placeholder='ادخل اسم اللون' />

                    </Form.Item>
                    <Form.Item
                        name='code'
                        label="الكود"


                       

                    >
                        <Input placeholder='ادخل الكود' />

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


export default ColorType