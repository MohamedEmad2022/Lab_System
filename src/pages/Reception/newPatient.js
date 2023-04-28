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
import Dragger from 'antd/es/upload/Dragger';
import Units from '../../components/Units';
import OrderForm from '../../components/OrderForm';



const NewPatient = () => {

    
    const dispatch = useDispatch()
    const [image, setImage] = useState(null);
    const state = useSelector(state => state)
    

    let { selectedTooths, error, loading } = useSelector(state => state.order)

    const token = isAuthentication().token


    // useEffect(() => {

    //     selectedTooths = []
    // }, [])




    let formData = new FormData()

    const handleChange = (name) => (event) => {
        const value = event.target.value;
        formData.append(name, value);
    };

    const handleSelect = (name) => (event) => {

        const value = name === "attachment" ? event.target.files[0] : event;
        formData.append(name, value);



    };
   

    const Finish = (values) => {

        console.log(values)


        selectedTooths.forEach(element => {
            formData.append('unit_types_ids[]', element);
        });

        formData.append("patient_name", values.patient_name)
        formData.append("color_id", values.color_id)
        formData.append("doctor_id", values.doctor_id)
        formData.append("tooth_type_id", values.tooth_type_id)
        // formData.append("attachment", values.attachment)

        formData.append("discount_type", values.discount_type)
        formData.append("discount_value", values.discount_value)

        const obj = {
            formData,
            token
        }

        dispatch(AddOrder(obj));

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

                    <OrderForm Finish={Finish} handleSelect={handleSelect} update={false} edit={true} />
                </Col>
            </Row>

        </>
    )
}

export default NewPatient