import React, { Component } from "react";
import { Layout } from "antd";
import LoginForm from "../../components/Login"
// import axios from 'axios'

const { Content } = Layout;

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            str: ''
        };
    }

    render() {
        return (
            <div className="login-container">
                <Content
                    className="site-layout"
                    style={{ padding: "0 50px", marginTop: 64 }}
                >
                    <div
                        className="site-layout-background"
                        style={{ padding: 24, minHeight: 380 }}
                    >
                        <LoginForm />
                    </div>
                </Content>
            </div>
        );
    }
}

export default Login;
