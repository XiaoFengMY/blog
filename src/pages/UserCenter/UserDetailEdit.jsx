import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    PageHeader,
    Form,
    Input,
    Button,
    Select,
    DatePicker,
    Divider,
    Avatar,
} from "antd";
import { AntDesignOutlined } from "@ant-design/icons";
import { BASE_URL } from "../../utils/url";
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
    const [blogs, setBlogs] = useState([]);

    const onFinish = (values) => {
        console.log(values);
    };

    return (
        <div style={{ width: "40%", margin: "80px auto 10px auto" }}>
            <PageHeader className="site-page-header" title="个人资料" />
            <Divider />

            <Form
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                size="large"
                layout="vertical"
            >
                <Form.Item name={["user", "userAvatar"]} label="头像">
                    <Avatar size={100} icon={<AntDesignOutlined />} />
                    <Button>修改头像</Button>
                </Form.Item>
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
                <Form.Item name={["user", "introduction"]} label="个性签名">
                    <Input.TextArea showCount maxLength={100} />
                </Form.Item>
                <Form.Item
                    name={["user", "gender"]}
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
