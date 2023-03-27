import { Alert, Button, Col, Form, Input, InputNumber, Modal, Popconfirm, Row, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { isAuthentication } from '../../components/isAuthentication';
import { AddExpensesType, DeleteExpensesType, GetExpensesTypes, selectType, UpdateExpensesType } from '../../store/Expenses/expensesTypeSlice';

const AddExpensesTypes = () => {
    const [form] = Form.useForm()
    const dispatch = useDispatch()
    const { expensesType, selectedType, fetchTypes, updateType, error, addType, deleteType, loading } = useSelector(state => state.expensesType)
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);


const token = isAuthentication().token




    useEffect(() => {
        dispatch(GetExpensesTypes(token))
    }, [dispatch, updateType, deleteType, addType])



    const columns = [
        {
            title: 'اسم البند',
            dataIndex: 'name',
            key: 'name',
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


    const dataSource = fetchTypes === "fetch" ? expensesType.map((item) => {
        return {
            key: item.id,
            name: item.name,
            description: item.description,
        }
    })
        : ""



    const AddModal = () => {
        form.setFieldsValue({
            name: "",
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
            description: record.description
        })
        dispatch(selectType(record))
        setEdit(true)
        setOpen(true);
    }





    const AddType = (values) => {
        const obj = {
            values,
            token
        }
        dispatch(AddExpensesType(obj))
        setOpen(false)
    }

    const UpdatType = (values) => {
        const obj = {
            values,
            token,
            id: selectedType.key
        }
        dispatch(UpdateExpensesType(obj))

        setOpen(false)
    }

    const DeleteType = (record) => {

        const obj = {
            id: record.key,
            token,
        }
        dispatch(DeleteExpensesType(obj))
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
                title="ملف بنود المصاريف"
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
                        label="اسم البند"


                        rules={[{
                            required: true,
                            message: 'من فضلك ادخال اسم البند',
                        },
                        ]
                        }

                    >
                        <Input value={selectedType?.name} placeholder='ادخل اسم البند' />

                    </Form.Item>


                    <Form.Item
                        name='description'
                        label="وصف البند"


                    >
                        <Input.TextArea placeholder='ادخل وصف البند' />

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

export default AddExpensesTypes