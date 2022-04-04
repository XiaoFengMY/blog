import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/url";
import { Menu, Layout } from "antd";
import { List, Button, Space, Card, Avatar } from "antd";
import { useParams, NavLink } from "react-router-dom";
import IconFont from "../../components/IconFont/IconFont";
import Like from "../../components/BlogButton/Like";
import Collect from "../../components/BlogButton/Collect";

const { Content, Sider } = Layout;

const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const [current, setCurrent] = useState("comprehensive");
    const [classify, setClassify] = useState("全部");
    const [hotBlog, setHotBlog] = useState([]);
    const params = useParams();
    const blogSort = [
        "全部",
        "前端",
        "后端",
        "小程序",
        "iOS",
        "Android",
        "工具",
        "程序员",
        "AI",
        "云计算",
        "人工智能",
        "安全",
        "大数据",
    ];

    useEffect(() => {
        if (params.searchContent) {
            axios
                .post(BASE_URL + "/blogs/search", {
                    title: params.searchContent,
                    sort: current,
                    classify: classify,
                })
                .then((response) => {
                    setBlogs(response.data.data);
                });
        } else {
            axios
                .get(BASE_URL + "/blogs/showBlogs", {
                    params: {
                        sort: current,
                        classify: classify,
                    },
                })
                .then((response) => {
                    setBlogs(response.data.data);
                });
        }
        axios.get(BASE_URL + "/blogs/hotBlogList").then((response) => {
            setHotBlog(response.data.data);
        });
    }, [classify, current, params.searchContent]);

    const sortClick = (e) => {
        setCurrent(e.key);
    };

    const classifyClick = (e) => {
        setClassify(blogSort[e.key]);
    };

    return (
        <div style={{ width: "90%", margin: "10px auto" }}>
            <Layout style={{ background: "#fff" }}>
                <Sider
                    breakpoint="xl"
                    collapsedWidth="0"
                    trigger={null}
                    style={{ marginTop: "100px" }}
                    width={200}
                    theme="light"
                >
                    <Menu
                        onClick={classifyClick}
                        theme="theme"
                        mode="inline"
                        defaultSelectedKeys={["0"]}
                    >
                        {blogSort.map((item, index) => {
                            return <Menu.Item key={index}>{item}</Menu.Item>;
                        })}
                    </Menu>
                </Sider>
                <Content
                    className="site-layout"
                    style={{ padding: "0 50px", marginTop: 64 }}
                >
                    <Menu
                        onClick={sortClick}
                        mode="horizontal"
                        defaultSelectedKeys={["comprehensive"]}
                    >
                        <Menu.Item key="comprehensive">综合排序</Menu.Item>
                        <Menu.Item key="nowTime">时间最新</Menu.Item>
                        <Menu.Item key="focus"> 关注</Menu.Item>
                    </Menu>
                    <div
                        className="site-layout-background"
                        style={{ padding: "24px 10px", minHeight: 380 }}
                    >
                        <List
                            itemLayout="vertical"
                            size="large"
                            pagination={{
                                onChange: (page) => {},
                                pageSize: 10,
                            }}
                            dataSource={blogs}
                            renderItem={(item) => (
                                <List.Item
                                    key={item.id}
                                    actions={[
                                        <Like
                                            likeNum={item.blogLikes}
                                            fontsize="20px"
                                        ></Like>,
                                        <Button
                                            type="link"
                                            href={`/BLogDetail/${item.id}#blog_detail_comment`}
                                        >
                                            <Space style={{ fontSize: "20px" }}>
                                                <IconFont type="icon-pinglun" />
                                                {item.commentsNums}
                                            </Space>
                                        </Button>,
                                        <Collect
                                            colectNum={item.blogCollects}
                                            fontsize="20px"
                                        ></Collect>,
                                    ]}
                                >
                                    <List.Item.Meta
                                        avatar={
                                            <div
                                                style={{
                                                    textAlign: "center",
                                                    width: "100px",
                                                }}
                                            >
                                                <Avatar src={BASE_URL + "/" + item.username.useravatar} />
                                                <div
                                                    style={{
                                                        marginTop: "10px",
                                                    }}
                                                >
                                                    {item.username.username}
                                                </div>
                                                <div>
                                                    {item.blogRecommend}
                                                </div>
                                            </div>
                                        }
                                        title={
                                            <NavLink
                                                to={`/BLogDetail/${item.id}`}
                                            >
                                                {item.blogTitle}
                                            </NavLink>
                                        }
                                        description={
                                            <span>
                                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi eos voluptatem velit perspiciatis illum minus omnis quo natus illo! Perspiciatis dicta accusantium dolores consectetur ipsam optio illo quos, incidunt veniam!
                                            </span>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                </Content>
                <Sider
                    breakpoint="xl"
                    collapsedWidth="0"
                    trigger={null}
                    style={{ marginTop: "100px" }}
                    width={300}
                    theme="light"
                >
                    {/* <Card title="热门标签" style={{ width: 300 }}>
                        <img src="https://apis.jxcxin.cn/api/ip" alt="天气" />
                    </Card> */}
                    <Card title="热门文章" style={{ width: 300 }}>
                        <List
                            size="small"
                            dataSource={hotBlog}
                            renderItem={(item) => (
                                <List.Item key={item.id}>
                                    <NavLink to={`/BLogDetail/${item.id}`}>
                                        {item.blogTitle}
                                    </NavLink>
                                </List.Item>
                            )}
                        />
                    </Card>
                </Sider>
            </Layout>
        </div>
    );
};

export default Home;
