import React, { useState, useEffect } from "react";
import {
    Affix,
    Layout,
    PageHeader,
    Button,
    Descriptions,
    Dropdown,
    Typography,
    Divider,
    Menu,
    Tag,
    List,
    BackTop,
    Timeline,
    Tabs,
    Space,
    message,
} from "antd";
import axios from "axios";
import { BASE_URL } from "../../utils/url";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import CalendarBlog from "../../components/Calendar/Calendar";
import CommentAdd from "../../components/Comment/CommentAdd";
import CommentList from "../../components/Comment/CommentList";
import Like from "../../components/BlogButton/Like";
import Collect from "../../components/BlogButton/Collect";
import IconFont from "../../components/IconFont/IconFont";
import { EllipsisOutlined } from "@ant-design/icons";
import "braft-editor/dist/output.css";
import moment from "moment";

const { Content, Sider } = Layout;
const { TabPane } = Tabs;
const { Title, Paragraph } = Typography;

const BlogDetail = () => {
    const [blogDetail, setBlogDetail] = useState({});
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        const value = { id: params.BlogId };
        let isMounted = true;

        axios.post(BASE_URL + "/blogs/blogDetail", value).then((response) => {
            //防止内存泄漏
            if (isMounted) {
                var data = {
                    title: response.data.data.blogTitle,
                    blogTabs: response.data.data.blogTabs,
                    createTime: moment(
                        new Date(response.data.data.createTime)
                    ).format("YYYY-MM-DD HH:mm:ss"),
                    updateTime: moment(
                        new Date(response.data.data.updateTime)
                    ).format("YYYY-MM-DD HH:mm:ss"),
                    content: response.data.data.blogContent,
                    blogReadings: response.data.data.blogReadings,
                    blogRecommend: response.data.other,
                    blogCollects: response.data.data.blogCollects,
                    blogLikes: response.data.data.blogLikes,
                    editUser: response.data.data.editUser,
                };
                console.log("blogDetail", response.data.data);
                // setCommentNums(response.data.data.blogComments.length);
                setBlogDetail(data);
            }
        });
    }, [params.BlogId]);

    const handleDeleteBlog = () => {
        axios
            .post(
                BASE_URL + "/blogs/deleteBlog",
                {
                    id: params.BlogId,
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
                    message.success("删除成功");
                    navigate("/Home");
                } else {
                    message.error("删除失败");
                }
            });
    };

    return (
        <div
            className="regist-container"
            style={{ width: "80%", margin: "1px auto" }}
        >
            <Layout>
                <Sider width={100} theme="light">
                    <Affix offsetTop={120}>
                        <div>
                            <Like
                                likeNum={blogDetail.blogLikes}
                                blogId={params.BlogId}
                                fontsize="25px"
                            />
                            <Button
                                type="link"
                                href="#blog_detail_comment"
                                style={{ margin: "20px auto" }}
                            >
                                <Space style={{ fontSize: "25px" }}>
                                    <IconFont type="icon-pinglun" />
                                </Space>
                            </Button>
                            <Collect
                                collectNum={blogDetail.blogCollects}
                                blogId={params.BlogId}
                                fontsize="25px"
                            />
                        </div>
                    </Affix>
                </Sider>
                <Content
                    className="site-layout"
                    style={{
                        padding: "0 25px",
                        marginTop: 64,
                        backgroundColor: "#fff",
                    }}
                >
                    <BackTop />
                    <PageHeader
                        ghost={false}
                        onBack={() => window.history.back()}
                        title={blogDetail.title}
                        // subTitle="这是副标题"
                        extra={[
                            <Dropdown
                                key="more"
                                overlay={
                                    <Menu>
                                        <Menu.Item key="1">
                                            <Button type="text">
                                                <NavLink
                                                    to={`/Write/${params.BlogId}`}
                                                >
                                                    编辑
                                                </NavLink>
                                            </Button>
                                        </Menu.Item>
                                        <Menu.Item key="2">
                                            <Button
                                                type="text"
                                                onClick={handleDeleteBlog}
                                            >
                                                删除
                                            </Button>
                                        </Menu.Item>
                                        <Menu.Item key="3"></Menu.Item>
                                    </Menu>
                                }
                            >
                                <Button
                                    style={{
                                        border: "none",
                                        padding: 0,
                                    }}
                                >
                                    <EllipsisOutlined
                                        style={{
                                            fontSize: 20,
                                            verticalAlign: "top",
                                        }}
                                    />
                                </Button>
                            </Dropdown>,
                        ]}
                    >
                        <Descriptions size="small" column={3}>
                            <Descriptions.Item label="阅读量">
                                {blogDetail.blogReadings}
                            </Descriptions.Item>
                            <Descriptions.Item label="推荐数">
                                {blogDetail.blogLikes}
                            </Descriptions.Item>
                            <Descriptions.Item label="发布时间">
                                {blogDetail.createTime}
                            </Descriptions.Item>
                            <Descriptions.Item label="最后更新时间">
                                {blogDetail.updateTime}
                            </Descriptions.Item>
                        </Descriptions>
                    </PageHeader>
                    <Tabs defaultActiveKey="1" style={{ margin: "10px 30px" }}>
                        <TabPane tab="正文" key="1">
                            <Typography>
                                <Paragraph>
                                    <div
                                        className="braft-output-content"
                                        dangerouslySetInnerHTML={{
                                            __html: blogDetail.content,
                                        }}
                                    ></div>
                                </Paragraph>
                            </Typography>
                        </TabPane>
                        <TabPane tab="历史" key="2">
                            <List
                                dataSource={blogDetail.editUser}
                                renderItem={(item, index) => (
                                    <NavLink
                                        to={`/Usercenter/${item.username.id}`}
                                        key={index}
                                    >
                                        <Timeline mode="left">
                                            <Timeline.Item
                                                label={moment(
                                                    item.editTime
                                                ).format("YYYY-MM-DD HH:mm:ss")}
                                            >
                                                {item.username.username}
                                            </Timeline.Item>
                                        </Timeline>
                                    </NavLink>
                                )}
                            />
                        </TabPane>
                    </Tabs>
                    <section id="blog_detail_comment">
                        <CommentAdd />
                        <CommentList />
                    </section>
                </Content>
                <Sider
                    width={400}
                    theme="light"
                    breakpoint="xl"
                    collapsedWidth="0"
                    trigger={null}
                >
                    <Title>侧边栏</Title>
                    <CalendarBlog />
                    <Divider orientation="left">标签</Divider>
                    <List
                        dataSource={blogDetail.blogTabs}
                        renderItem={(item) => (
                            <Tag
                                key={item}
                                style={{ marginTop: "10px " }}
                                color="blue"
                            >
                                {item}
                            </Tag>
                        )}
                    />
                    <Divider orientation="left">推荐</Divider>
                    <List
                        size="small"
                        dataSource={blogDetail.blogRecommend}
                        renderItem={(item) => (
                            <List.Item key={item.id}>
                                <NavLink to={`/BLogDetail/${item.id}`}>
                                    {item.blogTitle}
                                </NavLink>
                            </List.Item>
                        )}
                    />
                </Sider>
            </Layout>
        </div>
    );
};

export default BlogDetail;
