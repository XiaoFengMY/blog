import React, { Component } from "react";
import { Layout, Divider, Timeline, Typography, Checkbox } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import CalendarBlog from "../../components/Calendar/Calendar";
import TimelineItem from "antd/lib/timeline/TimelineItem";

const { Content, Sider } = Layout;
const { Title, Paragraph } = Typography;

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="about-container">
                <Layout>
                    <Content
                        theme="light"
                        className="site-layout"
                        style={{
                            padding: "50px",
                            marginTop: "50px",
                            backgroundColor: "#fff",
                        }}
                    >
                        <Timeline mode="alternate">
                            <TimelineItem label="2022.01.20">
                                开始记录
                            </TimelineItem>
                            <TimelineItem label="2022.01.20" color="green">
                                开始写关于界面
                            </TimelineItem>
                            <TimelineItem
                                label="2022.01.20"
                                color="red"
                                dot={
                                    <ClockCircleOutlined
                                        style={{ fontSize: "16px" }}
                                    />
                                }
                            >
                                内存泄漏待处理
                            </TimelineItem>
                            <TimelineItem label="2022.01.22">
                                博客的标签分类
                            </TimelineItem>
                            <TimelineItem label="2022.01.23">
                                搜索博客
                            </TimelineItem>
                            <TimelineItem label="2022.01.23">
                                优化请求
                            </TimelineItem>
                            <TimelineItem label="2022.01.23">
                                代码高亮
                            </TimelineItem>
                            <TimelineItem label="2022.01.25">
                                评论
                            </TimelineItem>
                            <TimelineItem label="2022.02.12">
                                导航栏修改
                            </TimelineItem>
                            <TimelineItem label="2022.02.13">
                                首页修改
                            </TimelineItem>
                        </Timeline>
                    </Content>
                    <Sider width={400} theme="light">
                        <Title>侧边栏</Title>
                        <CalendarBlog />
                        <Divider orientation="left">计划任务</Divider>
                        <Paragraph>
                            <Checkbox defaultChecked disabled>
                                新建文件夹
                            </Checkbox>
                            <br />
                            <Checkbox defaultChecked={false} disabled>
                                问答
                            </Checkbox>
                            <br />
                            <Checkbox defaultChecked={false} disabled>
                                留言
                            </Checkbox>
                            <br />
                            <Checkbox defaultChecked={false} disabled>
                                修BUG
                            </Checkbox>
                            <br />
                            <Checkbox defaultChecked={false} disabled>
                                适配移动端
                            </Checkbox>
                            <br />
                        </Paragraph>
                    </Sider>
                </Layout>
            </div>
        );
    }
}

export default About;
