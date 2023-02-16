import { Button, Col, Form, Input, Row, Typography } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { LoginHand } from '../../store/Auth/loginSlice'

const LogIn = () => {

    const dispatch = useDispatch()
    const state = useSelector((state) => state.login)

    const [from] = Form.useForm()

    const onFinish = (values) => {
        dispatch(LoginHand(values))
    }
    return (
        <>
            <Row justify='center'>
                <Col>
                    <Typography.Title>تسجيل الدخول</Typography.Title>
                </Col>
            </Row>
            <Row justify='center'>
                <Col span={10}>
                    <Form form={from} onFinish={onFinish} labelCol={{ span: 24 }}>
                        <Form.Item
                            name='email'
                            label="البريد الالكتروني"

                            rules={[{
                                required: true,
                                message: 'من فضلك ادخال البريد الالكتروني',
                            },
                            {
                                type: 'email',
                                message: 'من فضلك ادخال البريد الالكتروني الصحيح'
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

                        >
                            <Input.Password placeholder='ادخل كلمة السر' />

                        </Form.Item>
                        <Form.Item>
                            <Button block type="primary" htmlType="submit" loading={state.loading}>
                                تأكيد
                            </Button>
                        </Form.Item>
                    </Form>
                    <Typography.Text>انشاء <Link to='/register'>حساب جديد</Link></Typography.Text>
                </Col>
            </Row>
        </>
    )
}

export default LogIn