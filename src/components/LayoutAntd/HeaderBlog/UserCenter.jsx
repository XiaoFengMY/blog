import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { BASE_URL } from "../../../utils/url";
import { NavLink } from "react-router-dom";
import { Avatar, Button, Popover } from "antd";
import axios from "axios";

class UserCenter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            isLoggedIn: false,
            username: "未登录",
            useravatar: ""
        };
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        if (localStorage.username === null) {
            console.log("usercenter2: ", localStorage.username);
        } else {
            axios
                .post(
                    BASE_URL + "/users/loginStatus",
                    {
                        username: localStorage.username,
                    },
                    {
                        headers: {
                            authorization:
                                "Bearer " +
                                window.localStorage.getItem("token"),
                        },
                    }
                )
                .then((res) => {
                    if (res.data.code === 1) {
                        this.setState({
                            isLoggedIn: true,
                            id: res.data.data.id,
                            username: res.data.data.username,
                            useravatar: res.data.data.useravatar,
                        });
                    } else {
                        this.setState({
                            isLoggedIn: false,
                        });
                    }
                });
        }
    }

    logout() {
        this.setState({
            isLoggedIn: false,
        });
        localStorage.removeItem("token");
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        const content = (
            <div>
                <Button type="text">
                    <NavLink to={`/UserCenter/${this.state.id}`}>
                        个人中心
                    </NavLink>
                </Button>
                <div>
                    <Button type="link" href="/UserCenter">
                        我的收藏
                    </Button>
                </div>
                <div>
                    <Button onClick={this.logout} type="text">
                        退出登录
                    </Button>
                </div>
            </div>
        );

        return (
            <div className="userCenter">
                {isLoggedIn ? (
                    <section>
                        <Popover
                            placement="bottom"
                            content={content}
                            title="个人中心"
                        >
                            <Avatar
                                size={36}
                                src={BASE_URL + "/" + this.state.useravatar}
                            />
                            <Button type="link">{this.state.username}</Button>
                        </Popover>
                        <Button
                            className="btn"
                            type="link"
                            style={{ lineHeight: "64px" }}
                            href="/Write"
                        >
                            写文章
                        </Button>
                    </section>
                ) : (
                    <section>
                        <Button className="btn" type="button" href="/Login">
                            登录注册
                        </Button>
                    </section>
                )}
            </div>
        );
    }
}

export default UserCenter;
