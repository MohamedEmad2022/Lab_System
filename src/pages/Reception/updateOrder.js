import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Alert, Button, Col, Form, Image, Input, InputNumber, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { isAuthentication } from '../../components/isAuthentication';
import { faTooth } from '@fortawesome/free-solid-svg-icons';
import { GetSingleOrder, GetUnitTypes, MarkAsDelivered, MarkAsPaid, MarkAsUnPaid, toggleSelect, UpdateOrder } from '../../store/AdminActions/OrderSlice';
import { useParams } from 'react-router-dom';
import { GetColorsTypes } from '../../store/AdminActions/colorTypeSlice';
import { GetDoctors } from '../../store/AdminActions/doctorSlice';
import { GetToothType } from '../../store/AdminActions/toothTypeSlice';
import { EditOutlined, MoneyCollectOutlined, RestOutlined, ShoppingCartOutlined  } from '@ant-design/icons'


const OrderUpdate = () => {

    const [form] = Form.useForm()
    const dispatch = useDispatch()
    const state = useSelector(state => state)
    const { selectedTooths, error, singleOrder, loading, successed } = useSelector(state => state.order)
    const [edite, setEdite] = useState(false)
    const [patientName, setPatientName] = useState(singleOrder?.patient_name)
    const [colorId, setColorId] = useState(singleOrder?.color.id)
    const [doctorId, setDoctorId] = useState(singleOrder?.doctor.id)
    const [toothTypeId, setToothTypeId] = useState(singleOrder?.tooth_type.id)
    const [attachment, setAttachment] = useState(singleOrder?.attachment)
    const { id } = useParams()

    

    const token = isAuthentication().token


    useEffect(() => {
        dispatch(GetSingleOrder({ token, id }))
        dispatch(GetColorsTypes(token))
        dispatch(GetDoctors(token))
        dispatch(GetToothType(token))
        dispatch(GetUnitTypes(token))



    }, [dispatch])

    useEffect(() => {
        dispatch(GetSingleOrder({ token, id }))

    }, [dispatch, successed])

    useEffect(() => {
        form.setFieldsValue({
            key: singleOrder?.id,
            attachment: singleOrder?.attachment,
            patient_name: singleOrder?.patient_name,
            doctor_name: singleOrder?.doctor.name,
            color: singleOrder?.color.name,
            tooth_type: singleOrder?.tooth_type.name,
            total_amount: singleOrder?.invoice?.total_amount,
            paid_amount: singleOrder?.invoice?.paid_amount,
            remaining_amount: singleOrder?.invoice?.remaining_amount,
            payment_status: singleOrder?.invoice?.payment_status,
            discount_type: singleOrder?.invoice?.discount_type,
            discount_value: singleOrder?.invoice?.discount_value,
            units: singleOrder?.units.length,
        })
    }, [singleOrder])

    const SelectComponent = ({ data, handleSelect, defaultValue }) => {

        const options = data?.map((item, index) => {
            return {
                label: item.name,
                value: item.id

            }
        })

        return (
            <Select loading={loading} options={options} labelInValue defaultValue={defaultValue} />
        )
    }
    let formData = new FormData()

    const handleChange = (name) => (event) => {

        const value = event.target.value && singleOrder[name]
        formData.append(name, value);
    };

    const handleSelect = (name) => (event) => {
        console.log(event)
        const value = name === "attachment" ? event.fileList[0] && singleOrder[name] : event && singleOrder[name];

        formData.append(name, value);

    };



    const Finish = (values) => {

        console.log(values.attachment)
        formData.append("id", id);
        formData.append("patient_name", patientName);
        formData.append("color_id", colorId);
        formData.append("doctor_id", doctorId);
        formData.append("tooth_type_id", toothTypeId);
        formData.append("attachment", attachment);
        formData.append("discount_type", values.discount_type);
        formData.append("discount_value", values.discount_value);

        selectedTooths.forEach(element => {
            formData.append('unit_types_ids[]', element);
        });


        const obj = {
            formData,
            token,
            id
        }

        // dispatch(UpdateOrder(obj));

    }



    const select = (id) => {

        dispatch(toggleSelect(id));

    }

    const Units = () => {

        // document.querySelectorAll(".tooth").forEach(element => element.classList.add('disabled'))

        return (
            <>
                <Row>

                    <Col style={{ transform: "rotateY(180deg)" }} span={12}>
                        {
                            state.order.unitTypes?.filter((unit, index) => {
                                return unit.level === "UPPER" && unit.direction === "RIGHT"
                            }).map((item, index) => (
                                <FontAwesomeIcon className={`tooth ${edite ? "" : "disabled"}`} onClick={() => select(item.id)}
                                    key={index} icon={faTooth}
                                    style={{ fontSize: `${40 - index * 3}px`, transform: "rotateX(180deg)", color: `${selectedTooths.indexOf(item.id) !== -1 ? "red" : ""}` }} />
                            ))
                        }
                    </Col>
                    <Col span={12}>
                        {
                            state.order.unitTypes?.filter((unit, index) => {
                                return unit.level === "UPPER" && unit.direction === "LEFT"
                            }).map((item, index) => (
                                <FontAwesomeIcon className={`tooth ${edite ? "" : "disabled"}`} onClick={() => select(item.id)}
                                    key={index} icon={faTooth}
                                    style={{ fontSize: `${40 - index * 3}px`, transform: "rotateX(180deg)", color: `${selectedTooths.indexOf(item.id) !== -1 ? "red" : ""}` }} />
                            ))
                        }
                    </Col>

                </Row>
                <Row style={{ marginBottom: "50px" }}>

                    <Col style={{ transform: "rotateY(180deg)" }} span={12}>
                        {
                            state.order.unitTypes?.filter((unit, index) => {
                                return unit.level === "LOWER" && unit.direction === "RIGHT"
                            }).map((item, index) => (
                                <FontAwesomeIcon className={`tooth ${edite ? "" : "disabled"}`} onClick={() => select(item.id)} key={index} icon={faTooth}
                                    style={{ fontSize: `${40 - index * 3}px`, color: `${selectedTooths.indexOf(item.id) !== -1 ? "red" : ""}` }} />
                            ))
                        }
                    </Col>
                    <Col span={12}>
                        {
                            state.order.unitTypes?.filter((unit, index) => {
                                return unit.level === "LOWER" && unit.direction === "LEFT"
                            }).map((item, index) => (
                                <FontAwesomeIcon className={`tooth ${edite ? "" : "disabled"}`} onClick={() => select(item.id)} key={index} icon={faTooth}
                                    style={{ fontSize: `${40 - index * 3}px`, color: `${selectedTooths.indexOf(item.id) !== -1 ? "red" : ""}` }} />
                            ))
                        }
                    </Col>

                </Row>

            </>
        )


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
                    <Button icon={<EditOutlined />} className='margin' hidden={edite} onClick={()=>setEdite(true)}>تعديل</Button>
                    <Button className='margin' hidden={!edite} onClick={()=>setEdite(false)}>الغاء</Button>
                    <Button icon={<MoneyCollectOutlined />} className='margin' loading={loading} disabled={singleOrder?.invoice ? singleOrder?.invoice?.payment_status === "PAID"? true : false: true} onClick={()=>dispatch(MarkAsPaid({invoiceId: singleOrder?.invoice?.id, token}))}>تحصيل الحساب</Button>
                    <Button icon={<RestOutlined />} className='margin' loading={loading} disabled={singleOrder?.invoice ? singleOrder?.invoice?.payment_status === "PAID"? false : true: false} onClick={()=>dispatch(MarkAsUnPaid({invoiceId: singleOrder?.invoice?.id, token}))}>ارجاع الحساب</Button>
                    <Button icon={<ShoppingCartOutlined />} className='margin' loading={loading} disabled={singleOrder?.delivered} onClick={()=>dispatch(MarkAsDelivered({id: singleOrder?.id, token}))}>توصيل</Button>

                    <Form form={form} onFinish={Finish} dir='rtl' disabled={!edite}
                        initialValues={{
                            patient_name: singleOrder?.patient_name,
                            color_id: singleOrder?.color.id,
                            tooth_type_id: singleOrder?.tooth_type.id,
                        }}
                        className='margin'
                        

                    >
                        <Row justify="space-between">
                            <Col span={12}>
                                <Form.Item
                                    name='patient_name'
                                    label="اسم الحالة"


                                    rules={[{
                                        required: true,
                                        message: 'من فضلك ادخال اسم الحالة',
                                    },
                                    ]
                                    }

                                >
                                    <Input onChange={(e)=>setPatientName(e.target.value)} placeholder='ادخل اسم الحالة' />

                                </Form.Item>

                            </Col>
                            <Col span={11}>
                                <Form.Item
                                    name='doctor_id'
                                    label="اسم الطبيب"

                                >

                                    <SelectComponent defaultValue={singleOrder?.doctor.id} data={state.doctor.doctors} handleSelect={(e)=>setDoctorId(e.value)} />


                                </Form.Item>
                            </Col>
                        </Row>

                        <Row justify="space-between">
                            <Col span={11}>
                                <Form.Item
                                    name='color_id'
                                    label="اختار اللون"

                                >
                                    <SelectComponent data={state.color.colors} defaultValue={singleOrder?.color.id} handleSelect={(e)=>setColorId(e.value)} />

                                </Form.Item>
                            </Col>
                            <Col span={11}>
                                <Form.Item
                                    
                                    name='tooth_type_id'
                                    label="اختار مادة التركيب"

                                >
                                    <SelectComponent data={state.tooth.types} defaultValue={singleOrder?.tooth_type.id} handleSelect={(e)=>setToothTypeId(e.value)} />

                                </Form.Item>
                            </Col>
                        </Row>

                        <Row justify="space-between">
                            <Col span={11}>
                                <Form.Item
                                name='attachment'
                                label="Attachment"
                                
                                >
                                    <input
                                    disabled={!edite}
                                        type="file"
                                        onChange={(e)=>setAttachment(e.target.files[0])}
                                        name='attachment'
                                        label="ملف"
                                    />
                                    {/* <Input type='file' onChange={(e)=>setAttachment(e.target.value)}/> */}
                                    <Image src={`http://localhost:8000/storage/uploads/${singleOrder?.attachment}`}/>
                                </Form.Item>
                            </Col>
                            <Col span={11}>
                                <Form.Item>
                                    <Units />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row justify="space-between">
                            <Col span={11}>
                                <Form.Item
                                    name='discount_type'
                                    label="نوع الخصم"
                                >
                                    <Select defaultValue={singleOrder?.invoice?.discount_type}>
                                        <Select.Option value='FIXED'>FIXED</Select.Option>
                                        <Select.Option value='PERCENTAGE'>PERCENTAGE</Select.Option>
                                    </Select>

                                </Form.Item>
                            </Col>

                            <Col span={11}>
                                <Form.Item
                                    name='discount_value'
                                    label="قيمة الخصم"
                                >
                                    <InputNumber defaultValue={singleOrder?.invoice?.discount_value} />

                                </Form.Item>
                            </Col>

                        </Row>








                        <Form.Item>
                            <Button block type="primary" htmlType="submit" loading={state.order.loading}>
                                أضافة
                            </Button>
                        </Form.Item>




                    </Form>
                </Col>
            </Row>

        </>
    )
}

export default OrderUpdate