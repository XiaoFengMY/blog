import React, { useState } from 'react'
import { Form, Input, Button, Checkbox } from "antd";
import { BASE_URL } from "../../utils/url";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom";
import axios from "axios";
import './Login.css'


const LoginForm = () => {
    const [ message, setMessage ] = useState('');
    // useHistory 在 v6 中不可用
    const navigate = useNavigate();
    // axios.defaults.withCredentials = true; 
    const onFinish = (values) => {
        axios.post(BASE_URL + "/users/login", values)
        .then((res) => {
            if(res.status === 200) {
                if(res.data.code === 1) {
                    localStorage.token = res.data.token;
                    // 不能在组件销毁后设置state
                    navigate('/Home');
                }else{
                    setMessage(res.data.error);
                }
            }
        });
    };

    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >
            <h1 style={{textAlign:"center"}}>登录</h1>
            <Form.Item
                name="username"
                label="账号"
                rules={[
                    {
                        required: true,
                        message: "请输入用户名!",
                    },
                ]}
            >
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="请输入用户名"
                    autoComplete="on"
                />
            </Form.Item>
            <Form.Item
                name="password"
                label="密码"
                extra={message}
                rules={[
                    {
                        required: true,
                        message: "请输入密码!",
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="密码"
                    autoComplete="on"
                />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>记住我</Checkbox>
                </Form.Item>

                <Link className="login-form-forgot" to="">
                    忘记密码
                </Link> 
                <span style={{marginLeft:"20px"}}>
                    <Link to="/Regist">没有账号，立即注册!</Link>
                </span>
                
            </Form.Item>

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                >
                    登录
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;
