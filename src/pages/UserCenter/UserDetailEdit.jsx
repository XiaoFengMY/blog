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
} from "antd";
import {  useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/url";
import UserAvatar from "../../components/Upload/UploadImage"
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
    const [userAvatar, setUserAvatar] = useState("");
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
                    var data = response.data.data;
                    data.birthday  = moment(data.birthday);
                    setUserAvatar(data.useravatar)             
                    form.setFieldsValue({
                        user: response.data.data,
                    });
                }
            });
    });

    return (
        <div style={{ width: "40%", margin: "80px auto 10px auto" }}>
            <PageHeader className="site-page-header" title="????????????" />
            <Divider />
            <UserAvatar userAvatar={userAvatar} />

            <Form
                {...layout}
                name="userInfo"
                onFinish={onFinish}
                size="large"
                form={form}
                layout="vertical"
            >
                <Form.Item name={["user", "username"]} label="?????????">
                    <Input />
                </Form.Item>
                <Form.Item
                    name={["user", "email"]}
                    label="??????"
                    rules={[{ type: "email", message: "?????????????????????" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name={["user", "phone"]} label="?????????">
                    <Input />
                </Form.Item>
                <Form.Item name={["user", "introduce"]} label="????????????">
                    <Input.TextArea showCount maxLength={10} />
                </Form.Item>
                <Form.Item
                    name={["user", "sex"]}
                    label="??????"
                    rules={[
                        {
                            message: "???????????????!",
                        },
                    ]}
                >
                    <Select>
                        <Option value="male">???</Option>
                        <Option value="female">???</Option>
                        <Option value="other">??????</Option>
                    </Select>
                </Form.Item>
                <Form.Item name={["user", "birthday"]} label="??????">
                    <DatePicker locale={locale} format="YYYY/MM/DD" />
                </Form.Item>

                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                        ??????
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UserDetailEdit;
