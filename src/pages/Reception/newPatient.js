import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTooth } from '@fortawesome/free-solid-svg-icons';
import { Button, Col, Form, Input, Row, Select } from 'antd'
import Upload from 'antd/es/upload/Upload'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isAuthentication } from '../../components/isAuthentication'
import { GetColorsTypes } from '../../store/AdminActions/colorTypeSlice'
import { GetDoctors } from '../../store/AdminActions/doctorSlice'
import { AddOrder, GetUnitTypes, toggleSelect } from '../../store/AdminActions/OrderSlice'
import { GetToothType } from '../../store/AdminActions/toothTypeSlice'

const NewPatient = () => {

    const [form] = Form.useForm()
    const dispatch = useDispatch()
    const [doctorId, setDoctorId] = useState("")
    const [colorId, setColorId] = useState("")
    const [toothTypeId, setToothTypeId] = useState("")
    const [image,setImage] = useState(null);
    const state = useSelector(state => state)
    const {selectedTooths} = useSelector(state => state.order)

    const token = isAuthentication().token


    useEffect(() => {
        dispatch(GetColorsTypes(token))
        dispatch(GetDoctors(token))
        dispatch(GetToothType(token))
        dispatch(GetUnitTypes(token))
        localStorage.setItem('unit_types',JSON.stringify([]));
    }, [])
    


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
        const value = event.target.value;
        console.log(value);
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
        
        let unit_types =JSON.parse(localStorage.getItem('unit_types'));
        unit_types.forEach(element => {
            formData.append('unit_types_ids[]', element);            
        });
        // formData.append('unit_types_ids',JSON.parse(localStorage.getItem('unit_types')));
        console.log(JSON.parse(localStorage.getItem('unit_types')));

        console.log(image);
        formData.append('attachment',image);

        const obj = {
            formData,
            token
        }

        dispatch(AddOrder(obj));
        localStorage.setItem('unit_types',[]);

    }


    
    const select = (id) => {
      //store ids in local storage
      let unitTypes = JSON.parse(localStorage.getItem('unit_types'));
      console.log(unitTypes);
        if(!unitTypes.includes(id)){   
            console.log('add');       //checking weather array contain the id
            unitTypes.push(id);               //adding to array because value doesnt exists
            console.log('arr',unitTypes);
        }
        else{
            console.log('remove');
            unitTypes.splice(unitTypes.indexOf(id), 1);  //deleting
        } 

        localStorage.setItem('unit_types',JSON.stringify(unitTypes));
        console.log('json str',localStorage.getItem('unit_types'));
        dispatch(toggleSelect(id));
        console.log('selected tooth',selectedTooths);

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
                                style={{ fontSize: `${40 - index * 3}px`, transform: "rotateX(180deg)", color: `${selectedTooths.indexOf(item.id) !== -1 ? "red" : ""}`}} />
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
                                style={{ fontSize: `${40 - index * 3}px`, transform: "rotateX(180deg)", color: `${selectedTooths.indexOf(item.id) !== -1 ? "red" : ""}`}} />
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
                                 style={{ fontSize: `${40 - index * 3}px`, color: `${selectedTooths.indexOf(item.id) !== -1 ? "red" : ""}`}} />
                            ))
                        }
                    </Col>
                    <Col span={12}>
                        {
                            state.order.unitTypes?.filter((unit, index) => {
                                return unit.level === "LOWER" && unit.direction === "LEFT"
                            }).map((item, index) => (
                                <FontAwesomeIcon className='tooth' onClick={() => select(item.id)} key={index} icon={faTooth}
                                 style={{ fontSize: `${40 - index * 3}px`, color: `${selectedTooths.indexOf(item.id) !== -1 ? "red" : ""}`}} />
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
                                <input
                                  type="file"
                                  onChange={(e) => {
                                    console.log('file input');
                                    console.log(e.target);
                                    setImage(e.target.files[0]);
                                  }
                                 }
                                    name='attachment'
                                    label="ملف"
                                />
                                    
                                
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