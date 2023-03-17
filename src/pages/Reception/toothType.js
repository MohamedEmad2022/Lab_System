import { Alert, Button, Card, Col, Divider, Form, Input, InputNumber, Modal, Popconfirm, Row, Table, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isAuthentication } from '../../components/isAuthentication'
import { AddToothType, DeleteToothType, GetToothType, selectType, UpdateToothType } from '../../store/AdminActions/toothTypeSlice'

const ToothType = () => {

    const [form] = Form.useForm()
    const dispatch = useDispatch()
    const { types, fetchTypes, updateType, error, addType, deleteType, selectedType, loading } = useSelector(state => state.tooth)
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);







    useEffect(() => {
        dispatch(GetToothType(isAuthentication().token))
    }, [dispatch, updateType, deleteType, addType])



    const columns = [
        {
            title: 'الاسم',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'التكلفة',
            dataIndex: 'cost',
            key: 'cost',
        },
        {
            title: 'الوصف',
            dataIndex: 'description',
            key: 'description',
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
                            onConfirm={()=>DeleteType(record)}
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


    const dataSource = fetchTypes === "fetch" ? types.data.map((item) => {
        return {
            key: item.id,
            name: item.name,
            cost: item.cost,
            description: item.description,
        }
    })
        : ""



    const AddModal = () => {
        form.setFieldsValue({
            name: "",
            cost: "",
            description: "",
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
            cost: record.cost,
            description: record.description
        })
        dispatch(selectType(record))
        setEdit(true)
        setOpen(true);
    }





    const AddType = (values) => {
        const obj = {
            values,
            token: isAuthentication().token
        }
        dispatch(AddToothType(obj))
        setOpen(false)
    }

    const UpdatType = (values) => {
        const obj = {
            values,
            token: isAuthentication().token,
            id: selectedType.key
        }
        dispatch(UpdateToothType(obj))

        setOpen(false)
    }

    const DeleteType = (record) => {

        const obj = {
            id: record.key,
            token: isAuthentication().token
        }
        dispatch(DeleteToothType(obj))
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
                title="ملف مواد التركيبات"
                open={open}
                onCancel={handleCancel}

                footer={[
                    <Button key="Cancel" onClick={handleCancel}>
                        Cancel
                    </Button>,

                ]}

            >


                <Form form={form} onFinish={edit ? UpdatType : AddType} dir='rtl' labelCol={{ span: 24 }}


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
                        <InputNumber placeholder='0' />

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
                loading={loading}
                columns={columns}
                dataSource={dataSource}
                
            />



        </>
    )
}

export default ToothType