import React, { Component } from "react";
import { Layout } from "antd";
import BraftEdit from "../../components/BraftEdit/BraftEdit"

const { Content } = Layout;

class Write extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="write-container">
                <Content
                    className="site-layout"
                    style={{ padding: "0 50px", marginTop: 64 }}
                >
                    <div
                        className="site-layout-background"
                        style={{ padding: 24, minHeight: 380 }}
                    >
                        <BraftEdit />
                    </div>
                </Content>
            </div>
        );
    }
}

export default Write;
