import React, { Component } from "react";
import { Layout } from "antd";
import RegistForm from "../../components/Regist"

const { Content } = Layout;

class Regist extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="regist-container">
                <Content
                    className="site-layout"
                    style={{ padding: "0 50px", marginTop: 64 }}
                >
                    <div
                        className="site-layout-background"
                        style={{ padding: 24, minHeight: 380 }}
                    >
                        <RegistForm />
                    </div>
                </Content>
            </div>
        );
    }
}

export default Regist;
