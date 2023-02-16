import { Button, Col, Form, Input, Row, Typography } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RegisterHand } from '../../store/Auth/registerSlice'

const Register = () => {
    const dispatch = useDispatch()
    const state = useSelector((state) => state.register)
    
console.log(state)

    const [from] = Form.useForm()

    const onFinish = (values) => {
       dispatch(RegisterHand(values))
    }
    return (
        <>
        <Row justify='center'>
                <Col>
                    <Typography.Title>انشاء حساب جديد</Typography.Title>
                </Col>
            </Row>
        <Row justify={'center'}>
            <Col span={12}>
            
            <Form form={from} onFinish={onFinish} labelCol={{span: 24}}>
                <Form.Item
                    name='name'
                    label="الاسم"
                    rules={[{
                        required: true,
                        message: 'من فضلك ادخل الاسم'
                    }]
                    }

                >
                    <Input placeholder='ادخل الاسم'/>

                </Form.Item>
                <Form.Item
                    name='email'
                    label="البريد الالكتروني"

                    rules={[{
                        required: true,
                        message: ' من فضلك ادخل البريد الالكتروني '
                    },
                    {
                        type: 'email',
                        message: ' من فضلك ادخل بريد الكتروني صحيح'

                    }]
                    }

                >
                    <Input type='email' placeholder='ادخل البريد الالكتروني' />

                </Form.Item>
                <Form.Item
                    name='password'
                    label="كلمة السر"
                    rules={[{
                        required: true,
                        message: 'من فضلك ادخل كلمة السر'

                    },
                    ]
                    }
                    hasFeedback
                >
                    <Input.Password placeholder='ادخل كلمة السر' />

                </Form.Item>
                <Form.Item
                    name="password_confirmation"
                    label="تأكيد كلمة السر"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'اعد كتابة كلمة السر',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('كلمة السر غير مطابقة'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button block type="primary" htmlType="submit" loading={state.loading}>
                        تأكيد
                    </Button>
                </Form.Item>
            </Form>
            </Col>
            </Row>
        </>
    )
}

export default Register