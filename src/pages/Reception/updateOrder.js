import { Alert, Button, Col, Form, Image, Input, InputNumber, Row, Select } from 'antd';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { isAuthentication } from '../../components/isAuthentication';
import { GetSingleOrder, GetUnitTypes, MarkAsDelivered, MarkAsPaid, MarkAsUnPaid, toggleSelect, UpdateOrder } from '../../store/AdminActions/OrderSlice';
import { Link, useParams } from 'react-router-dom';
import { GetColorsTypes } from '../../store/AdminActions/colorTypeSlice';
import { GetDoctors } from '../../store/AdminActions/doctorSlice';
import { GetToothType } from '../../store/AdminActions/toothTypeSlice';
import { EditOutlined, FileOutlined, MoneyCollectOutlined, PrinterOutlined, RestOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import OrderForm from '../../components/OrderForm';
import {useReactToPrint} from "react-to-print"
import Invoice from './invoice';

const OrderUpdate = () => {

    const [form] = Form.useForm()
    const dispatch = useDispatch()
    const [edit, setEdit] = useState(false)
    const [orderId, setOrderId] = useState()
    const state = useSelector(state => state)
    const { selectedTooths, error, singleOrder, fetchSingleOrder, loading, successed } = useSelector(state => state.order)
    
    const { id } = useParams()


    const token = isAuthentication().token



    useEffect(() => {
        
    
        dispatch(GetSingleOrder({ token, id }))
    }, [dispatch, id, successed ])


    let formData = new FormData()

    const handleChange = (name) => (event) => {
        const value = event.target.value;
        formData.append(name, value);
    };

    const handleSelect = (name) => (event) => {

        const value = name === "attachment" ? event.target.files[0] : event;
        formData.append(name, value);



    };




    const Update = (values) => {


        selectedTooths.forEach(element => {
            formData.append('unit_types_ids[]', element);
        });

        formData.append("patient_name", values.patient_name)
        formData.append("color_id", values.color_id)
        formData.append("doctor_id", values.doctor_id)
        formData.append("tooth_type_id", values.tooth_type_id)
        formData.append("discount_type", values.discount_type || "");
        formData.append("discount_value", values.discount_value);
        formData.append("id", id);



        const obj = {
            formData,
            token,

        }

        dispatch(UpdateOrder(obj));

    }






    return (
        <>
            {
                successed ?
                    <Alert message={successed} type="success" showIcon closable />
                    : null

            }
            {
                error ?
                    <Alert message={error} type="error" showIcon closable />
                    : null

            }
            <Row justify="center">
                <Col span={20}>
                    <Button icon={<EditOutlined />} className='margin' hidden={edit} onClick={() => setEdit(true)}>تعديل</Button>
                    <Button className='margin' hidden={!edit} onClick={() => setEdit(false)}>الغاء</Button>
                    <Button icon={<MoneyCollectOutlined />} className='margin' loading={loading} disabled={singleOrder?.invoice ? singleOrder?.invoice?.payment_status === "PAID" ? true : false : true} onClick={() => dispatch(MarkAsPaid({ invoiceId: singleOrder?.invoice?.id, token }))}>تحصيل الحساب</Button>
                    <Button icon={<RestOutlined />} className='margin' loading={loading} disabled={singleOrder?.invoice ? singleOrder?.invoice?.payment_status === "PAID" ? false : true : false} onClick={() => dispatch(MarkAsUnPaid({ invoiceId: singleOrder?.invoice?.id, token }))}>ارجاع الحساب</Button>
                    <Button icon={<ShoppingCartOutlined />} className='margin' loading={loading} disabled={singleOrder?.delivered} onClick={() => dispatch(MarkAsDelivered({ id: singleOrder?.id, token }))}>توصيل</Button>
                    <Link to={`/invoice/${id}`} icon={<FileOutlined />} className='margin' loading={loading} disabled={!singleOrder?.invoice}>
                        <Button>الفاتورة</Button>
                    </Link>

                    
                    <OrderForm Finish={Update} handleSelect={handleSelect} update={true} edit={edit} />
                </Col>
            </Row>

        </>
    )
}

export default OrderUpdate