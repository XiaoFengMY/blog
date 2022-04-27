import React from "react";
import { Layout, Input, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import UserCenter from "./UserCenter";
import "../LayoutAntd.css";

const { Header } = Layout;
const { Search } = Input;

const HeaderBlog = () => {
    const navigate = useNavigate();

    const onSearch = (value) => {
        navigate(`/Home/${value}`);
    };

    const menuOnclick = () => {
        document.querySelector(".header .navbar").classList.toggle("active");
    };

    return (
        <Layout>
            <Header
                className="header"
                style={{
                    backgroundColor: "#fff",
                    position: "fixed",
                    zIndex: 1,
                    width: "100%",
                }}
            >
                <Link className="logoLink" to="/">
                    <div className="logo logo"></div>
                </Link>

                <nav className="navbar">
                    <Link to="Home">首页</Link>
                    <Link to="/QueAns">问答</Link>
                    <Link to="/Suggest">留言</Link>
                    <Link to="/About">关于</Link>
                    <Link to="#">
                        <Space className="pageLink" direction="vertical">
                            <Search
                                placeholder="搜索"
                                onSearch={onSearch}
                                style={{ width: 300, padding: "20px 0" }}
                            />
                        </Space>
                    </Link>
                </nav>

                <div className="loginStatus" style={{ display: "flex" }}>
                    <UserCenter />
                </div>

                <div className="icons">
                    <div
                        onClick={menuOnclick}
                        id="menu-btn"
                        className="fas fa-bars"
                    ></div>
                </div>
            </Header>
        </Layout>
    );
};

export default HeaderBlog;
