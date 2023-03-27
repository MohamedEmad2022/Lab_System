import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTooth } from '@fortawesome/free-solid-svg-icons';
import { Button, Col, Form, Input, Row, Select } from 'antd'
import Upload from 'antd/es/upload/Upload'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isAuthentication } from '../../components/isAuthentication'
import { GetColorsTypes } from '../../store/AdminActions/colorTypeSlice'
import { GetDoctors } from '../../store/AdminActions/doctorSlice'
import { AddOrder, GetUnitTypes, toggilSelect } from '../../store/AdminActions/OrderSlice'
import { GetToothType } from '../../store/AdminActions/toothTypeSlice'

const NewPatient = () => {

    const [form] = Form.useForm()
    const dispatch = useDispatch()
    const [doctorId, setDoctorId] = useState("")
    const [colorId, setColorId] = useState("")
    const [toothTypeId, setToothTypeId] = useState("")
    
    const state = useSelector(state => state)
    const {selectedTooths} = useSelector(state => state.order)

    const token = isAuthentication().token


    useEffect(() => {

        dispatch(GetColorsTypes(token))
        dispatch(GetDoctors(token))
        dispatch(GetToothType(token))
        dispatch(GetUnitTypes(token))
    }, [dispatch])
    


    const SelectComponent = ({ data, handleSelect }) => {


        const options = data?.map((item, index) => {
            return {
                label: item.name,
                value: item.id
            }
        })

        return (


            <Select options={options} onChange={handleSelect} />


        )
    }
    let formData = new FormData()

    const handleChange = (name)=> (event) => {

        console.log(event.target)
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        formData.append(name, value);
      };

      const handleSelect = (name)=> (event) => {

        console.log(event)
        const value = name === "photo" ? event.target.files[0] : event;
        formData.append(name, value);
        
      };


    const Finish = () => {


        // let orderData = new FormData()
        // orderData.append('patient_name', values.name)
        // orderData.append('doctor_id', values.doctor_id)
        // orderData.append('color_id', values.color_id)
        // orderData.append('delivered', true)
        

        const obj = {
            formData,
            token
        }

        dispatch(AddOrder(obj))
    }


    
    const select = (id)=>{

        dispatch(toggilSelect(id +""))

       
        

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
                                <FontAwesomeIcon className='tooth' onClick={() =>select(item.id)}
                                 key={index} icon={faTooth} 
                                style={{ fontSize: `${40 - index * 3}px`, transform: "rotateX(180deg)", color: `${selectedTooths.indexOf(item.id + "") !== -1 ? "red" : ""}`}} />
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
                                style={{ fontSize: `${40 - index * 3}px`, transform: "rotateX(180deg)", color: `${selectedTooths.indexOf(item.id + "") !== -1 ? "red" : ""}`}} />
                            ))
                        }
                    </Col>

                </Row>
                <Row style={{marginBottom: "50px"}}>

                    <Col style={{ transform: "rotateY(180deg)" }} span={12}>
                        {
                            state.order.unitTypes?.filter((unit, index) => {
                                return unit.level === "LOWER" && unit.direction === "RIGHT"
                            }).map((item, index) => (
                                <FontAwesomeIcon className='tooth' onClick={() => select(item.id)} key={index} icon={faTooth}
                                 style={{ fontSize: `${40 - index * 3}px`, color: `${selectedTooths.indexOf(item.id + "") !== -1 ? "red" : ""}`}} />
                            ))
                        }
                    </Col>
                    <Col span={12}>
                        {
                            state.order.unitTypes?.filter((unit, index) => {
                                return unit.level === "LOWER" && unit.direction === "LEFT"
                            }).map((item, index) => (
                                <FontAwesomeIcon className='tooth' onClick={() => select(item.id)} key={index} icon={faTooth}
                                 style={{ fontSize: `${40 - index * 3}px`, color: `${selectedTooths.indexOf(item.id + "") !== -1 ? "red" : ""}`}} />
                            ))
                        }
                    </Col>

                </Row>

            </>
        )
    }



    return (
        <>
            <Row justify="center">
                <Col span={20}>

                    <Form form={form} onFinish={Finish}   dir='rtl'


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
                                <Form.Item
                                    name='attachment'
                                    label="ملف"
                                >
                                    <Upload>
                                        <Button>
                                            تحميل
                                        </Button>
                                    </Upload>
                                </Form.Item>
                            </Col>
                            <Col span={11}>
                                <Units />
                            </Col>
                        </Row>

                        <Row justify="space-between">
                            <Col span={11}>
                                <Form.Item
                                    name='delivered'
                                    label="delivered"
                                >
                                    
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