import { PrinterOutlined } from '@ant-design/icons'
import { Button, Col, Descriptions, Row } from 'antd'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'
import { isAuthentication } from '../../components/isAuthentication'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTooth } from '@fortawesome/free-solid-svg-icons';
import { GetSingleOrder, GetUnitTypes } from '../../store/AdminActions/OrderSlice'


const Invoice = () => {
    const componentPDF = useRef()
    const dispatch = useDispatch()
    const { singleOrder, selectedTooths, unitTypes } = useSelector(state => state.order)
    const { id } = useParams()

    const token = isAuthentication().token

    useEffect(() => {

        dispatch(GetUnitTypes(token))
        dispatch(GetSingleOrder({ token, id }))
    }, [])


    console.log(singleOrder)

    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: "invoicePDF",

    })

const OrderDate = ()=>{
    const date = new Date(singleOrder?.created_at).toLocaleDateString()
    return date
}
    return (
        <>
            <Row justify='center'>
                <Col span={22}>
                    <Button icon={<PrinterOutlined />} onClick={generatePDF} >طباعة</Button>
                </Col>
                <Col span={22} ref={componentPDF}>
                    <Row style={{ height: "70vh" }} justify='center' align='middle'>

                        <Col span={24} >
                            <Descriptions bordered
                                column={{
                                    xxl: 2,
                                    xl: 2,
                                    lg: 3,
                                    md: 3,
                                    sm: 2,
                                    xs: 1,
                                }}
                            >
                                <Descriptions.Item label="اسم الطبيب">{singleOrder?.doctor.name}</Descriptions.Item>
                                <Descriptions.Item label="تاريخ الفاتورة">{<OrderDate />}</Descriptions.Item>
                                <Descriptions.Item label="عدد الوحدات">{singleOrder?.units?.length}</Descriptions.Item>
                                <Descriptions.Item label="التكلفة لكل وحدة">{singleOrder?.tooth_type?.cost}</Descriptions.Item>
                                <Descriptions.Item label="نوع مادة التركيب">{singleOrder?.tooth_type.name}</Descriptions.Item>
                                <Descriptions.Item label="اللون">{singleOrder?.color.name}</Descriptions.Item>
                                <Descriptions.Item label="اجمالي التكلفة">{singleOrder?.invoice?.subtotal_amount}</Descriptions.Item>
                                <Descriptions.Item label="نوع الخصم">{singleOrder?.invoice?.discount_type || ""}</Descriptions.Item>
                                <Descriptions.Item label="قيمة الخصم">{singleOrder?.invoice?.discount_value}</Descriptions.Item>
                                <Descriptions.Item label="التكلفة بعد الخصم">{singleOrder?.invoice?.total_amount}</Descriptions.Item>


                            </Descriptions>
                        </Col>
                        <Col span={17}>
                            <Row>

                                <Col style={{ transform: "rotateY(180deg)" }} span={12}>
                                    {
                                        unitTypes?.filter((unit, index) => {
                                            return unit.level === "UPPER" && unit.direction === "RIGHT"
                                        }).map((item, index) => (
                                            <FontAwesomeIcon className={`tooth disabled`}
                                                key={index} icon={faTooth}
                                                style={{ fontSize: `${40 - index * 3}px`, transform: "rotateX(180deg)", color: `${selectedTooths.indexOf(item.id) !== -1 ? "" : "gray"}` }} />
                                        ))
                                    }
                                </Col>
                                <Col span={12}>
                                    {
                                        unitTypes?.filter((unit, index) => {
                                            return unit.level === "UPPER" && unit.direction === "LEFT"
                                        }).map((item, index) => (
                                            <FontAwesomeIcon sName={`tooth disabled`}
                                                key={index} icon={faTooth}
                                                style={{ fontSize: `${40 - index * 3}px`, transform: "rotateX(180deg)", color: `${selectedTooths.indexOf(item.id) !== -1 ? "" : "gray"}` }} />
                                        ))
                                    }
                                </Col>

                            </Row>
                            <Row style={{ marginBottom: "50px" }}>

                                <Col style={{ transform: "rotateY(180deg)" }} span={12}>
                                    {
                                        unitTypes?.filter((unit, index) => {
                                            return unit.level === "LOWER" && unit.direction === "RIGHT"
                                        }).map((item, index) => (
                                            <FontAwesomeIcon sName={`tooth disabled`} key={index} icon={faTooth}
                                                style={{ fontSize: `${40 - index * 3}px`, color: `${selectedTooths.indexOf(item.id) !== -1 ? "" : "gray"}` }} />
                                        ))
                                    }
                                </Col>
                                <Col span={12}>
                                    {
                                        unitTypes?.filter((unit, index) => {
                                            return unit.level === "LOWER" && unit.direction === "LEFT"
                                        }).map((item, index) => (
                                            <FontAwesomeIcon sName={`tooth disabled`} key={index} icon={faTooth}
                                                style={{ fontSize: `${40 - index * 3}px`, color: `${selectedTooths.indexOf(item.id) !== -1 ? "" : "gray"}` }} />
                                        ))
                                    }
                                </Col>

                            </Row>
                        </Col>
                    </Row>
                </Col>


            </Row>
        </>
    )
}

export default Invoice