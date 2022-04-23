import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    PageHeader,
    Form,
    Input,
    Button,
    Select,
    message,
    DatePicker,
    Divider,
    Avatar,
} from "antd";
import {  useNavigate } from "react-router-dom";
import { AntDesignOutlined } from "@ant-design/icons";
import { BASE_URL } from "../../utils/url";
import moment from 'moment';
import locale from "antd/lib/date-picker/locale/zh_CN";
import "moment/locale/zh-cn";

const { Option } = Select;

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const UserDetailEdit = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = (values) => {
        axios
            .post(
                BASE_URL + "/users/editUserInfo",
                {values},
                {
                    headers: {
                        authorization:
                            "Bearer " + window.localStorage.getItem("token"),
                    },
                }
            )
            .then((response) => {
                if(response.data.code === 0) {
                    message.success(response.data.message);
                } else {
                    message.success(response.data.message);
                }
            });
    };

    useEffect(() => {
        axios
            .post(
                BASE_URL + "/users/getUserInfo",
                {},
                {
                    headers: {
                        authorization:
                            "Bearer " + window.localStorage.getItem("token"),
                    },
                }
            )
            .then((response) => {
                if(response.data.code === 0) {
                    message.success(response.data.error);
                    navigate("/Home");
                } else {
                    console.log(response.data.data);
                    var data = response.data.data;
                    data.birthday  = moment(data.birthday);                    
                    form.setFieldsValue({
                        user: response.data.data,
                    });
                }
            });
    });

    return (
        <div style={{ width: "40%", margin: "80px auto 10px auto" }}>
            <PageHeader className="site-page-header" title="个人资料" />
            <Divider />

            <Form
                {...layout}
                name="userInfo"
                onFinish={onFinish}
                size="large"
                form={form}
                layout="vertical"
            >
                <Form.Item name={["user", "username"]} label="用户名">
                    <Input />
                </Form.Item>
                <Form.Item
                    name={["user", "email"]}
                    label="邮箱"
                    rules={[{ type: "email" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name={["user", "phone"]} label="手机号">
                    <Input />
                </Form.Item>
                <Form.Item name={["user", "introduce"]} label="个性签名">
                    <Input.TextArea showCount maxLength={10} />
                </Form.Item>
                <Form.Item
                    name={["user", "sex"]}
                    label="性别"
                    rules={[
                        {
                            message: "Please select gender!",
                        },
                    ]}
                >
                    <Select>
                        <Option value="male">男</Option>
                        <Option value="female">女</Option>
                        <Option value="other">保密</Option>
                    </Select>
                </Form.Item>
                <Form.Item name={["user", "birthday"]} label="生日">
                    <DatePicker locale={locale} format="YYYY/MM/DD" />
                </Form.Item>

                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                        保存
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UserDetailEdit;
