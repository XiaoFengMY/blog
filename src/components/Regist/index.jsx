import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/url";
import { Form, Input, Checkbox, Button, Modal, Space } from "antd";
import axios from "axios";

const RegistForm = () => {
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const [form] = Form.useForm();
    // axios.defaults.withCredentials = true; 
    const onFinish = (values) => {
        console.log("Received values of form: ", values);
        axios.post(BASE_URL + "/users/regist", values)
        .then((res) => {
            console.log("Received res: ", res);
            if(res.status === 200) {
                if(res.data.code === 1) {
                    // 不能在组件销毁后设置state
                    navigate('/Login');
                }else{
                    setMessage(res.data.error);
                }
            }
        });
    };

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
        >
            <h1 style={{textAlign:"center"}}>注册</h1>
            <Form.Item
                name="username"
                label="用户名"
                tooltip="四个以上字符"
                extra={message}
                rules={[
                    {
                        required: true,
                        message: "请输入用户名!",
                        whitespace: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="phone"
                label="手机号"
                rules={[
                    {
                        required: false,
                        message: "请输入手机号码!",
                    },
                ]}
            >
                <Input
                    style={{
                        width: "100%",
                    }}
                />
            </Form.Item>

            <Form.Item
                name="email"
                label="邮箱"
                rules={[
                    {
                        type: "email",
                        message: "不是一个正确邮箱!",
                    },
                    {
                        required: false,
                        message: "请输入邮箱",
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="密码"
                rules={[
                    {
                        required: true,
                        message: "请输入密码!",
                    },
                ]}
                hasFeedback
            >
                <Input.Password autoComplete="off" />
            </Form.Item>

            <Form.Item
                name="rePassword"
                label="确认密码"
                dependencies={["password"]}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: "请确认你的密码",
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                                return Promise.resolve();
                            }

                            return Promise.reject(new Error("两次密码不一致!"));
                        },
                    }),
                ]}
            >
                <Input.Password autoComplete="off" />
            </Form.Item>

            <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                    {
                        validator: (_, value) =>
                            value
                                ? Promise.resolve()
                                : Promise.reject(new Error("需同意用户协议")),
                    },
                ]}
                {...tailFormItemLayout}
            >
                <Checkbox>
                    我已阅读并同意{" "}
                    <Space wrap>
                        <Button type="link" onClick={info}>
                            用户协议
                        </Button>
                    </Space>
                </Checkbox>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    注册
                </Button>
                <Link to="/Login">已有账号，立即登录</Link>
            </Form.Item>
        </Form>
    );
};


const formItemLayout = {
    labelCol: {
        xs: {
            span: 12,
        },
        sm: {
            span: 6,
        },
    },
    wrapperCol: {
        xs: {
            span: 20,
        },
        sm: {
            span: 16,
        },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

function info() {
    Modal.info({
        title: "用户协议",
        content: (
            <div>
                <p>some messages...some messages...</p>
                <p>some messages...some messages...</p>
            </div>
        ),
        onOk() {},
    });
}


export default RegistForm;
