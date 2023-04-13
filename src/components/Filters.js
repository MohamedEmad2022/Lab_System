import { FilterOutlined } from '@ant-design/icons'
import { Button, Col, DatePicker, Drawer, Form, Input, Menu, Row, Select, Space } from 'antd'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SelectComponent } from '../pages/Reception/newPatient'
import { GetColorsTypes } from '../store/AdminActions/colorTypeSlice'
import { GetDoctors } from '../store/AdminActions/doctorSlice'
import { SearchOrders } from '../store/AdminActions/OrderSlice'
import { GetToothType } from '../store/AdminActions/toothTypeSlice'
import { isAuthentication } from './isAuthentication'

const Filters = () => {
    const [form] = Form.useForm()
    const [name, setName] = useState("")
    const dispatch = useDispatch()
    const { colors } = useSelector(state => state.color)
    const { doctors } = useSelector(state => state.doctor)
    const { types } = useSelector(state => state.tooth)
    const [open, setOpen] = useState(false);


    const token = isAuthentication().token

    useEffect(() => {
        dispatch(GetColorsTypes(token))
        dispatch(GetDoctors(token))
        dispatch(GetToothType(token))
        


    }, [])


    const onChange = (date, dateString) => {
       

        const values = {
            date: dateString
        }
        dispatch(SearchOrders({ values, token }))
    };

    const onRangeChange = (value, dateString) => {
        
       
        const values = {
            date_from: dateString[0],
            date_to: dateString[1]
        }

        dispatch(SearchOrders({ values, token }))

    };

    

    const select = (name) => (event) => {
        const values = {
            [name]: event
        }
        
        dispatch(SearchOrders({ values, token }))
    }



    const change = (event) => {
        const values = {
            name: event.target.value
        }
        dispatch(SearchOrders({ values, token }))
    }

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };


    return (
        <>
            <Button icon={<FilterOutlined />} onClick={showDrawer} dir='ltr'>بحث</Button>

            <Drawer
                title="بحث عن حالة"

                onClose={onClose}
                width={500}
                open={open}
            // bodyStyle={{
            //     paddingBottom: 80,
            // }}

            >
                <Form form={form} onChange={change} >
                    <Row justify='space-between'>
                        <Col span={11}>
                            <Form.Item
                                name='name'
                            >
                                <Input placeholder='بحث بالاسم' />
                            </Form.Item>
                        </Col>
                        <Col span={11}>
                            <Form.Item
                                name='payment_status'
                            >
                                <Select placeholder="حالة الدفع" onSelect={select("payment_status")} onClear={select("payment_status")} allowClear={true}>
                                    
                                    <Select.Option key='paid' value='PAID'>PAID</Select.Option>
                                    <Select.Option key='unpaid' value='UNPAID'>UNPAID</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row justify='space-between'>
                        <Col span={11}>
                            <Form.Item
                                name='color_id'
                            >
                                <SelectComponent data={colors} placeholder='بحث باللون' handleSelect={select("color_id")} allowClear={true}  />
                            </Form.Item>
                        </Col>
                        <Col span={11}>
                            <Form.Item
                                name='doctor_id'
                            >
                                <SelectComponent data={doctors} placeholder='بحث بالطبيب المعالج' handleSelect={select("doctor_id")} allowClear={true} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row justify='space-between'>
                        <Col span={11}>
                            <Form.Item
                                name='tooth_type_id'
                            >
                                <SelectComponent data={types} placeholder='بحث بنوع مادة التركيب' handleSelect={select("tooth_type_id")} allowClear={true} />
                            </Form.Item>
                        </Col>
                        <Col span={11}>
                            <Form.Item
                                name='date'
                            >
                                <DatePicker placeholder='اختار التاريخ' onChange={onChange} />
                                
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify='space-between'>
                        
                        <Col span={24}>
                            <Form.Item
                                name='date_range'
                            >
                                
                                <DatePicker.RangePicker placeholder={["بداية التاريخ", "نهاية التاريخ"]} onChange={onRangeChange} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify='space-between'>
                        
                        <Col span={24}>
                            <Form.Item
                                name='delivered_status'
                            >
                                 <Select placeholder="حالة التوصيل" onSelect={select("delivered")} onClear={select("delivered")} allowClear={true}>
                                    
                                    <Select.Option key='yes' value='1'>تم التوصيل</Select.Option>
                                    <Select.Option key='no' value='0'>لم يتم التوصيل</Select.Option>
                                </Select>

                            </Form.Item>
                        </Col>
                    </Row>

                </Form>

            </Drawer>
        </>
    )
}

export default Filters