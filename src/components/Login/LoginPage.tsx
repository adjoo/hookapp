//Login and logout

import React, {useState} from "react";
import {Form, Input, Button, Checkbox} from 'antd';

type LoginPagePropsType = {
    setAuthStatus: (email: string, password: string,rememberMe: boolean) => void
}
export const LoginPage: React.FC<LoginPagePropsType> = (props) => {
    return (
        <div>
            <LoginForm setAuthStatus={props.setAuthStatus}/>
        </div>
    )
}


type FormPropsType = {
    email: string
    password: string
    rememberMe: boolean
}
const LoginForm: React.FC<LoginPagePropsType> = (props) => {
    const [checked, setChecked] = useState(true);
    const onCheckboxChange = (e:any) => {
        setChecked(e.target.checked);
    }
    const [form] = Form.useForm()
    const layout = {
        labelCol: {span : 4},
        wrapperCol: {span: 10},
    }

    const onFinish = (values:FormPropsType) => {
        const {email,password,rememberMe} = values
        props.setAuthStatus(email,password,rememberMe)
        console.log('Finished:',values)
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Form {...layout} form={form} name="loginForm"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}>
            <Form.Item label="Email"
                       name="email"
                       rules={[{required: true, message: 'Please input your login!'}]}>
                <Input />
            </Form.Item>
            <Form.Item label="Пароль"
                       name="password"
                       rules={[{required: true, message: 'Please input your password!'}]}>
                <Input.Password />
            </Form.Item>
            <Form.Item name="rememberMe" valuePropName="checked" wrapperCol={{offset: 8, span: 16}}>
                <Checkbox checked={checked} onChange={onCheckboxChange}>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )

}





