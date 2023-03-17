import { Button, Col, Form, Input, Row, Typography } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { isAuthentication } from '../../components/isAuthentication'
import { LoginHand } from '../../store/Auth/loginSlice'

const LogIn = () => {

    const dispatch = useDispatch()
    const state = useSelector((state) => state.login)
    const navigate = useNavigate()

    const [from] = Form.useForm()

    const onFinish = (values) => {
        dispatch(LoginHand(values))

    }

    // useEffect(()=>{
    //     if(isAuthentication()){
    //         navigate('/control/dashboard')
    //         console.log("true")

    //     }else{
    //         navigate('/')
    //         console.log("false")
    //     }
    // },[isAuthentication])
    return (
        <>
            <Row style={{height: "100vh"}} align="middle" >
                <Col span={22}>

                    <Row justify='center'>
                        <Col>
                            <Typography.Title>تسجيل الدخول</Typography.Title>
                        </Col>
                    </Row>
                    <Row justify='center'>
                        <Col span={10}>
                            <Form dir='rtl' form={from} onFinish={onFinish} labelCol={{ span: 24 }}>
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
                </Col>
            </Row>
        </>
    )
}

export default LogIn