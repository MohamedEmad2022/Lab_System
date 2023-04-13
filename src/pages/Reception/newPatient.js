import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTooth } from '@fortawesome/free-solid-svg-icons';
import { Alert, Button, Col, Form, Input, InputNumber, Row, Select, Spin } from 'antd'
import Upload from 'antd/es/upload/Upload'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isAuthentication } from '../../components/isAuthentication'
import { GetColorsTypes } from '../../store/AdminActions/colorTypeSlice'
import { GetDoctors } from '../../store/AdminActions/doctorSlice'
import { AddOrder, GetUnitTypes, toggleSelect } from '../../store/AdminActions/OrderSlice'
import { GetToothType } from '../../store/AdminActions/toothTypeSlice'



export const SelectComponent = ({ data, handleSelect, placeholder, allowClear }) => {

    const options = data?.map((item, index) => {
        return {
            label: item.name,
            value: item.id
        }
    })

    return (
        <Select options={options} onSelect={handleSelect} onClear={handleSelect} placeholder={placeholder} allowClear={allowClear} />
    )
}

const NewPatient = () => {

    const [form] = Form.useForm()
    const dispatch = useDispatch()
    const [image, setImage] = useState(null);
    const state = useSelector(state => state)
    let { selectedTooths, error, loading } = useSelector(state => state.order)

    const token = isAuthentication().token


    useEffect(() => {
        dispatch(GetColorsTypes(token))
        dispatch(GetDoctors(token))
        dispatch(GetToothType(token))
        dispatch(GetUnitTypes(token))

        selectedTooths = []
    }, [])



    
    let formData = new FormData()

    const handleChange = (name) => (event) => {
        const value = event.target.value;
        formData.append(name, value);
    };

    const handleSelect = (name) => (event) => {

        const value = name === "attachment" ? event.fileList[0] : event;
        formData.append(name, value);
        console.log(event)

    };


    const Finish = () => {
    
        

        
        selectedTooths.forEach(element => {
            formData.append('unit_types_ids[]', element);            
        });
        // // formData.append('unit_types_ids',JSON.parse(localStorage.getItem('unit_types')));
        // console.log(JSON.parse(localStorage.getItem('unit_types')));

        // console.log(image);

        const obj = {
            formData,
            token
        }

        dispatch(AddOrder(obj));

    }



    const select = (id) => {
        
        dispatch(toggleSelect(id));
        

    }

    const Units = () => {


        return (
            <>
                <Row>

                    <Col style={{ transform: "rotateY(180deg)" }} span={12}>
                        {
                            state.order.unitTypes?.filter((unit, index) => {
                                return unit.level === "UPPER" && unit.direction === "RIGHT"
                            }).map((item, index) => (
                                <FontAwesomeIcon className='tooth' onClick={() => select(item.id)}
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
                                <FontAwesomeIcon className='tooth' onClick={() => select(item.id)}
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
                                <FontAwesomeIcon className='tooth' onClick={() => select(item.id)} key={index} icon={faTooth}
                                    style={{ fontSize: `${40 - index * 3}px`, color: `${selectedTooths.indexOf(item.id) !== -1 ? "red" : ""}` }} />
                            ))
                        }
                    </Col>
                    <Col span={12}>
                        {
                            state.order.unitTypes?.filter((unit, index) => {
                                return unit.level === "LOWER" && unit.direction === "LEFT"
                            }).map((item, index) => (
                                <FontAwesomeIcon className='tooth' onClick={() => select(item.id)} key={index} icon={faTooth}
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
              error ?
                  <Alert message={error} type="error" showIcon closable />
                  : null

          }
            <Row justify="center">
                <Col span={20}>

                    <Form form={form} onFinish={Finish} dir='rtl'
                    

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
                                    <Input onChange={handleChange("patient_name")} placeholder='ادخل اسم الحالة' />

                                </Form.Item>

                            </Col>
                            <Col span={11}>
                                <Form.Item
                                    name='doctor_id'
                                    label="اسم الطبيب"

                                >

                                    <SelectComponent data={state.doctor.doctors} handleSelect={handleSelect("doctor_id")} />


                                </Form.Item>
                            </Col>
                        </Row>

                        <Row justify="space-between">
                            <Col span={11}>
                                <Form.Item
                                    name='color_id'
                                    label="اختار اللون"

                                >
                                    <SelectComponent data={state.color.colors} handleSelect={handleSelect("color_id")} />

                                </Form.Item>
                            </Col>
                            <Col span={11}>
                                <Form.Item
                                    name='tooth_type_id'
                                    label="اختار مادة التركيب"

                                >
                                    <SelectComponent data={state.tooth.types} handleSelect={handleSelect("tooth_type_id")} />

                                </Form.Item>
                            </Col>
                        </Row>

                        <Row justify="space-between">
                            <Col span={11}>
                                <input
                                  type="file"
                                  onSelect={
                                    handleSelect("attachment")
                                    // console.log(e.target);
                                    // setImage(e.target.files[0]);
                                  
                                 }
                                    name='attachment'
                                    label="ملف"
                                />
                                
                            </Col>
                            <Col span={11}>

                                {
                                    loading ? <Spin tip="Loading" size="large" /> : <Units/>
                                }
                            </Col>
                        </Row>

                        <Row justify="space-between">
                            <Col span={11}>
                                <Form.Item
                                    name='discount_type'
                                    label="نوع الخصم"
                                >
                                    <Select onSelect={handleChange("discount_type")} placeholder='اختار نوع الخصم' allowClear>
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
                                    <InputNumber onChange={handleChange("discount_value")} placeholder='0' />

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

export default NewPatient