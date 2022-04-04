import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/url";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { Layout, Card, Avatar, Space, Button, Table, Tag } from "antd";
const { Content, Sider } = Layout;
const { Meta } = Card;

const UserCenter = () => {
    const [blogs, setBlogs] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        axios
            .get(BASE_URL + "/blogs/showBlogs", {
                params: {
                    sort: "comprehensive",
                    classify: "全部",
                    username: localStorage.username,
                },
            })
            .then((response) => {
                setBlogs(response.data.data);
            });
        axios
            .post(BASE_URL + "/users/showAvatar", { id: params.userId })
            .then((response) => {
                setUserInfo(response.data.data);
            });
    }, [params.userId]);

    const handleDeleteBlog = () => {
        axios
            .post(BASE_URL + "/blogs/deleteBlog", {
                id: params.BlogId,
            })
            .then((response) => {
                if (response.data.code === 1) {
                    navigate("/Home");
                } else {
                }
            });
    };

    const columns = [
        {
            title: "标题",
            dataIndex: "blogTitle",
            key: "blogTitle",
            render: (text, record) => (
                <NavLink to={`/BLogDetail/${record.id}`}>{text}</NavLink>
            ),
        },
        {
            title: "作者",
            dataIndex: "blogAuthor",
            key: "blogAuthor",
        },
        /* {
            title: "协作者",
            dataIndex: "address",
            key: "address",
        }, */
        {
            title: "标签",
            key: "blogTabs",
            dataIndex: "blogTabs",
            render: (blogTabs) => (
                <>
                    {blogTabs.map((tag) => {
                        let color = tag.length > 5 ? "geekblue" : "green";
                        if (tag === "loser") {
                            color = "volcano";
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: "操作",
            key: "action",
            render: (record) => (
                <Space size="middle">
                    <NavLink to={`/Write/${record.id}`}>编辑</NavLink>
                    <Button type="text" onClick={handleDeleteBlog}>
                        删除
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ width: "60%", margin: "80px auto 10px auto" }}>
            <Layout style={{ background: "#fff" }}>
                <Sider
                    breakpoint="xl"
                    collapsedWidth="0"
                    trigger={null}
                    width={360}
                    theme="light"
                >
                    <Card
                        style={{ width: 300 }}
                        cover={
                            <img
                                alt="example"
                                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            />
                        }
                        actions={[
                            <Button type="link" href="/UserDetailEdit" block>
                                编辑个人资料
                            </Button>,
                        ]}
                    >
                        <Meta
                            avatar={
                                <Avatar
                                    src={BASE_URL + "/" + userInfo.useravatar}
                                />
                            }
                            title={userInfo.username}
                            description={userInfo.introduce}
                        />
                        <Space
                            align="baseline"
                            size="large"
                            style={{ margin: "20px" }}
                        >
                            <div style={{ padding: "12px" }}>
                                <div>关注</div>
                                <span>{userInfo.userFocus}</span>
                            </div>
                            <div style={{ padding: "12px" }}>
                                <div>粉丝</div>
                                <span>{userInfo.userFans}</span>
                            </div>
                            <div style={{ padding: "12px" }}>
                                <div>声望</div>
                                <span>{userInfo.userPrestige}</span>
                            </div>
                        </Space>
                    </Card>
                </Sider>
                <Content>
                    <Table
                        columns={columns}
                        dataSource={blogs}
                        rowKey={(record) => record.id}
                    />
                </Content>
            </Layout>
        </div>
    );
};

export default UserCenter;
