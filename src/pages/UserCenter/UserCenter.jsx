import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/url";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import {
    Layout,
    Card,
    Avatar,
    message,
    Space,
    Button,
    Table,
    Tag,
    Tabs,
} from "antd";
import ShowBlogs from "../../components/ShowBlogs/ShowBlogs";
const { Content, Sider } = Layout;
const { Meta } = Card;

const UserCenter = () => {
    const [show, setShow] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    const [loginUser, setLoginUser] = useState("unFocusUser");

    const { TabPane } = Tabs;
    const navigate = useNavigate();
    const params = useParams();

    const UserButton = () => {
        switch (loginUser) {
            case "loginUser":
                return (
                    <Button type="link" href="/UserDetailEdit" block>
                        编辑个人资料
                    </Button>
                );
            case "unFocusUser":
                return <Button onClick={focusUser}>关注</Button>;
            case "focusUser":
                return <Button onClick={focusUser}>取消关注</Button>;
            default:
                return <Button onClick={focusUser}>关注</Button>;
        }
    };

    useEffect(() => {
        axios
            .get(BASE_URL + "/blogs/showUerBlogs", {
                params: {
                    sort: "comprehensive",
                    classify: "全部",
                    id: params.userId,
                },
            })
            .then((response) => {
                setBlogs(response.data.data);
            });
        axios
            .post(
                BASE_URL + "/users/showUserInfo",
                { userId: params.userId },
                {
                    headers: {
                        authorization:
                            "Bearer " + window.localStorage.getItem("token"),
                    },
                }
            )
            .then((response) => {
                if (response.data.code === 1) {
                    setLoginUser(response.data.isLoginUser);
                    setUserInfo(response.data.data);
                } else {
                    message.warning(response.data.error);
                    navigate("/Home");
                }
            });
    }, [navigate, params.userId, loginUser]);

    const handleDeleteBlog = () => {
        axios
            .post(BASE_URL + "/blogs/deleteBlog", {
                id: params.BlogId,
            })
            .then((response) => {
                if (response.data.code === 1) {
                    message.warning("删除成功");
                } else {
                    message.warning("删除失败");
                }
            });
    };

    function focusUser() {
        axios
            .post(
                BASE_URL + "/users/focusUser",
                {
                    userId: params.userId,
                    isLoginUser: loginUser,
                },
                {
                    headers: {
                        authorization:
                            "Bearer " + window.localStorage.getItem("token"),
                    },
                }
            )
            .then((response) => {
                if (response.data.code === 1) {
                    setLoginUser(response.data.isLoginUser);
                    message.success(response.data.message);
                } else {
                    setLoginUser(response.data.isLoginUser);
                    message.warning(response.data.message);
                }
            });
    }

    function callback(key) {
        axios
            .post(
                BASE_URL + "/blogs/showSelectBlogs",
                { userId: params.userId, select: key },
                {
                    headers: {
                        authorization:
                            "Bearer " + window.localStorage.getItem("token"),
                    },
                }
            )
            .then((response) => {
                if (response.data.code === 1) {
                    setShow(response.data.data);
                } else {
                    message.warning(response.data.message);
                }
            });
    }

    const columns = [
        {
            title: "标题",
            dataIndex: "blogTitle",
            key: "blogTitle",
            render: (text, record) => (
                <NavLink to={`/BLogDetail/${record.id}`}>{text}</NavLink>
            ),
        },
        /* {
            title: "作者",
            dataIndex: "blogAuthor",
            key: "blogAuthor",
        }, */
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
                        actions={[<UserButton />]}
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
                                <span>{userInfo.userFocusNum}</span>
                            </div>
                            <div style={{ padding: "12px" }}>
                                <div>粉丝</div>
                                <span>{userInfo.userFansNum}</span>
                            </div>
                            <div style={{ padding: "12px" }}>
                                <div>声望</div>
                                <span>{userInfo.userPrestige}</span>
                            </div>
                        </Space>
                    </Card>
                </Sider>
                <Content>
                    <Tabs defaultActiveKey="1" onChange={callback}>
                        <TabPane tab="我的博客" key="mine">
                            <Table
                                columns={columns}
                                dataSource={blogs}
                                rowKey={(record) => record.id}
                            />
                        </TabPane>
                        <TabPane tab="关注作者博客" key="user">
                            <ShowBlogs blog={show} />
                        </TabPane>
                        <TabPane tab="收藏的博客" key="collect">
                            <ShowBlogs blog={show} />
                        </TabPane>
                    </Tabs>
                </Content>
            </Layout>
        </div>
    );
};

export default UserCenter;
