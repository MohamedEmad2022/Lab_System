import { Button, Col, Form, Image, Input, InputNumber, Row, Select } from 'antd'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Units from './Units'

const OrderForm = ({ Finish, handleSelect, update, edit }) => {

    const { colors } = useSelector(state => state.color)
    const { doctors } = useSelector(state => state.doctor)
    const { types } = useSelector(state => state.tooth)
    const { loading, singleOrder } = useSelector(state => state.order)
    const [form] = Form.useForm()


    useEffect(() => {
        if (update) {
            form.setFieldsValue({
                patient_name: singleOrder?.patient_name,
                color_id: singleOrder?.color_id,
                doctor_id: singleOrder?.doctor_id,
                tooth_type_id: singleOrder?.tooth_type_id,
                discount_type: singleOrder?.invoice?.discount_type,
                discount_value: singleOrder?.invoice?.discount_value
            })
        } else {
            form.setFieldsValue({
                patient_name: "",
                color_id: "",
                doctor_id: "",
                tooth_type_id: "",
                discount_type: "",
                discount_value: ""
            })
        }
    }, [singleOrder])


    return (
        <>
            <Form form={form} onFinish={Finish} dir='rtl' disabled={!edit}


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
                            <Input placeholder='ادخل اسم الحالة' />

                        </Form.Item>

                    </Col>
                    <Col span={11}>
                        <Form.Item
                            name='doctor_id'
                            label="اسم الطبيب"

                        >

                            <Select>
                                {
                                    doctors?.map((item) => (
                                        <Select.Option value={item.id} label={item.name} >{item.name}</Select.Option>
                                    ))
                                }
                            </Select>


                        </Form.Item>
                    </Col>
                </Row>

                <Row justify="space-between">
                    <Col span={11}>
                        <Form.Item
                            name='color_id'
                            label="اختار اللون"

                        >
                            <Select>
                                {
                                    colors?.map((item) => (
                                        <Select.Option value={item.id} label={item.name} >{item.name}</Select.Option>
                                    ))
                                }
                            </Select>

                        </Form.Item>
                    </Col>
                    <Col span={11}>
                        <Form.Item
                            name='tooth_type_id'
                            label="اختار مادة التركيب"

                        >
                            <Select>
                                {
                                    types?.map((item) => (
                                        <Select.Option value={item.id} label={item.name} >{item.name}</Select.Option>
                                    ))
                                }
                            </Select>


                        </Form.Item>
                    </Col>
                </Row>

                <Row justify="space-between">
                    <Col span={11}>
                        <Form.Item
                            name="attachment"
                            label="مرفقات"
                        >
                            <input
                                disabled={!edit}
                                type="file"
                                onChange={handleSelect("attachment")}



                            />
                            {update ? <Image src={`http://localhost:8000/storage/uploads/${singleOrder?.attachment}`} /> : null}
                        </Form.Item>
                    </Col>
                    <Col span={11}>
                        <Units edit={edit} />
                    </Col>
                </Row>

                <Row justify="space-between">
                    <Col span={11}>
                        <Form.Item
                            name='discount_type'
                            label="نوع الخصم"
                        >
                            <Select placeholder='اختار نوع الخصم' allowClear={true}>
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
                            <InputNumber placeholder='0' />

                        </Form.Item>
                    </Col>

                </Row>

                <Form.Item>
                    <Button block type="primary" htmlType="submit" loading={loading}>
                        أضافة
                    </Button>
                </Form.Item>




            </Form>

        </>
    )
}

export default OrderForm