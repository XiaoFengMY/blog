import React, { Component } from "react";
import { Layout, Descriptions } from "antd";

import "../LayoutAntd.css";

const { Footer } = Layout;

class FooterBlog extends Component {
    render() {
        return (
            <Layout>
                <Footer style={{ textAlign: "center" }}>
                    <Descriptions title="网站信息">
                        <Descriptions.Item label="网站名">
                            知识分享网站
                        </Descriptions.Item>
                        <Descriptions.Item label="联系电话">
                            18112341234
                        </Descriptions.Item>
                        <Descriptions.Item label="邮箱">
                            2352671485@qq.com
                        </Descriptions.Item>
                        <Descriptions.Item label="邮编">
                            421002
                        </Descriptions.Item>
                        <Descriptions.Item label="联系地址">
                            湖南省衡阳市珠晖区衡花路118号
                        </Descriptions.Item>
                    </Descriptions>
                    XiaoFeng ©2022 Created by React
                </Footer>
            </Layout>
        );
    }
}

export default FooterBlog;
