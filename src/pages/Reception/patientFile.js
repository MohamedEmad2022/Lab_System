import { DeleteOutlined, PlusCircleTwoTone } from '@ant-design/icons';

import { Alert, Avatar, Button, Card, Col, Form, Input, Modal, Popconfirm, Row, Table, Tag, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Filters from '../../components/Filters';
import { isAuthentication } from '../../components/isAuthentication';
import { DeleteOrder, GetOrders } from '../../store/AdminActions/OrderSlice';

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
            render: (_, record) => (
                <Tag color={record?.payment_status === 'PAID' ? 'green' : 'red'}>{record?.payment_status}</Tag>
            )
        },
        {
            title: "التوصيل",
            dataIndex: 'delivered',
            key: 'delivered',
            render: (_, record) => (
                record.delivered ? "تم التوصيل" : "لم يتم التوصيل"
            )
        },
        {
            title: "تاريخ التسجيل",
            dataIndex: 'created_at',
            key: 'created_at',
            render: (_, record) => {
                const ds = new Date(record?.created_at).toDateString()

                return <>{ds}</>
            }

        },
        {
            title: 'عدد الوحدات',
            dataIndex: 'units',
            key: 'units',
        },

        {
            title: 'العمليات',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
                <Row gutter={[0, 5]}>

                    <Col span={24}>
                        <Link to={`/updateOrder/${record.id}`} >
                            <Button block>عرض | تعديل</Button>
                            
                        </Link>
                    </Col>
                    <Col span={24}>
                        <Popconfirm
                            title="حذف نوع"
                            description="هل تريد حذف هذا النوع"
                            onConfirm={() => { dispatch(DeleteOrder({ id: record?.id, token })) }}
                            okText="حذف"
                            cancelText="رجوع"
                        >
                            <Button icon={<DeleteOutlined/>} type="primary" danger block>
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
            id: item.id,
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






    // const editOrder = (record) => {

    //     form.setFieldsValue({
    //         key: record.id,
    //         attachment: record?.attachment,
    //         patient_name: record?.patient_name,
    //         doctor_name: record.doctor.name,
    //         color: record.color.name,
    //         tooth_type: record.tooth_type.name,
    //         total_amount: record.invoice?.total_amount,
    //         paid_amount: record.invoice?.paid_amount,
    //         remaining_amount: record.invoice?.remaining_amount,
    //         payment_status: record.invoice?.payment_status,
    //         delivered: record.delivered,
    //         created_at: record.created_at,
    //         units: record.units.length,
    //     })

    //     setEdit(true)
    //     setOpen(true);
    // }








    return (
        <>
            {
                deleteOrder ?
                    <Alert message={deleteOrder} type="success" showIcon closable />
                    : null

            }
            {
                error ?
                    <Alert message={error} type="error" showIcon closable />
                    : null

            }
            <>

                
                    <Link to="/newPatient" >
                    <Button icon={<PlusCircleTwoTone />} dir='ltr'>اضافة حالة</Button>

                    </Link>
                    
               

            </>






            <Filters />


            <Table
                style={{ marginTop: "10px" }}
                loading={loading}
                columns={columns}
                dataSource={dataSource}
                pagination={{

                    total: totalOrders,
                    onChange: (page) => {

                        dispatch(GetOrders({ token, page }))
                    }
                }}

            />



        </>
    )
}

export default PatientFile