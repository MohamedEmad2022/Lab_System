import { Alert, Button, Col, Form, Input, InputNumber, Modal, Popconfirm, Row, Select, Table, Typography } from 'antd'
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isAuthentication } from '../../components/isAuthentication'
import { AddExpenses, DeleteExpenses, GetExpenses, selectExpense, UpdateExpenses } from '../../store/Expenses/expensesSlice'
import { GetExpensesTypes } from '../../store/Expenses/expensesTypeSlice'

const ExpensesFile = () => {

    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [form] = Form.useForm()
    const dispatch = useDispatch()
    const { expenses, fetchExpenses, totalExpenses, updateExpense, error, addExpense, deleteExpense, selectedExpense, loading } = useSelector(state => state.expenses)
    const { expensesType } = useSelector(state => state.expensesType)




    const token = isAuthentication().token




    useEffect(() => {
        dispatch(GetExpenses({page: 1, token}))
    }, [dispatch, token, updateExpense, deleteExpense, addExpense])

    useEffect(() => {
        dispatch(GetExpensesTypes(token))
    }, [dispatch, token])


    const SelectComponent = ({ data, onChange, defaultValue }) => {


        const options = data?.map((item, index) => {
            return {
                label: item.name,
                value: item.id
            }
        })

        return (


            <Select options={options} defaultValue={defaultValue} onChange={onChange} />


        )
    }



    const columns = [
        {
            title: 'بند المصروفات',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'التكلفة',
            dataIndex: 'cost',
            key: 'cost',
        },
        {
            title: 'التاريخ',
            dataIndex: 'date',
            key: 'date',
            render: (_, record) => (

                <>
                    {
                        record.updated_at ?
                            <Typography.Text>{record.updated_at}</Typography.Text>
                            :
                            <Typography.Text>{record.created_at}</Typography.Text>
                    }

                </>
            )


        },
        {
            title: 'ملاحظات',
            dataIndex: 'notes',
            key: 'notes',
        },
        {
            title: 'العمليات',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
                <Row gutter={3}>

                    <Col>
                        <Button icon={<EditOutlined/>} type="primary" onClick={() => editModal(record)}>
                            تعديل
                        </Button>
                    </Col>
                    <Col>
                        <Popconfirm
                            title="حذف نوع"
                            description="هل تريد حذف هذا النوع"
                            onConfirm={() => DeleteType(record)}
                            okText="حذف"
                            cancelText="رجوع"
                        >
                            <Button icon={<DeleteOutlined/>} type="primary" danger >
                                حذف
                            </Button>
                        </Popconfirm>
                    </Col>
                </Row>
            )
        },
    ];


    const dataSource = fetchExpenses === "fetch" ? expenses?.data.map((item) => {
        return {
            id: item.id,
            key: item.id,
            name: item.expense_type.name,
            cost: item.cost,
            notes: item.notes,
            created_at: item.created_at,
            updated_at: item.updated_at,
            expense_type_id: item.expense_type.id

        }
    })
        : ""



    const AddModal = () => {
        form.setFieldsValue({
            expense_type_id: "",
            cost: "",
            notes: "",
        })

        setEdit(false)
        setOpen(true);
        dispatch(selectExpense(''))
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const editModal = (record) => {

        form.setFieldsValue({
            expense_type_id: record.id,
            cost: record.cost,
            notes: record.notes
        })
        dispatch(selectExpense(record))
        setEdit(true)
        setOpen(true);
    }





    const addNewExpense = (values) => {

        const obj = {
            values,
            token
        }
        console.log(values)
        dispatch(AddExpenses(obj))
        setOpen(false)
    }

    const UpdatExpense = (values) => {
        const obj = {
            values,
            token,
            id: selectedExpense.id
        }
        console.log(values)

        dispatch(UpdateExpenses(obj))
        setOpen(false)
    }

    const DeleteType = (record) => {

        const obj = {
            id: record.key,
            token
        }
        dispatch(DeleteExpenses(obj))
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
                        <Button icon={<PlusCircleOutlined/>} type="primary" onClick={AddModal}>
                            اضافة
                        </Button>
                    </Col>


                </Row>




            </>
            <Modal
                title="ملف المصروفات"
                open={open}
                onCancel={handleCancel}

                footer={[
                    <Button key="Cancel" onClick={handleCancel}>
                        Cancel
                    </Button>,

                ]}

            >


                <Form form={form} onFinish={edit ? UpdatExpense : addNewExpense} dir='rtl' labelCol={{ span: 24 }}


                >

                    <Form.Item
                        name='expense_type_id'
                        label="بند المصروفات"


                        rules={[{
                            required: true,
                            message: 'من فضلك اختار بند المصروفات',
                        },
                        ]
                        }

                    >
                        <SelectComponent data={expensesType} defaultValue={selectedExpense?.expense_type_id} />

                    </Form.Item>


                    <Form.Item
                        name='cost'
                        label="التكلفة"
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
                        name='notes'
                        label="ملاحظات"


                    >
                        <Input.TextArea placeholder='ملاحظات' />

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
                pagination={{

                    total: totalExpenses,
                    onChange: (page) => {

                        dispatch(GetExpenses({ token, page }))
                    }
                }}

            />



        </>
    )
}

export default ExpensesFile