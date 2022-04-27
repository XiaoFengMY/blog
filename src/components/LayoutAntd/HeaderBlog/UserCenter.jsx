import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { BASE_URL } from "../../../utils/url";
import { NavLink } from "react-router-dom";
import { Avatar, Button, Popover } from "antd";
import axios from "axios";

function UserCenter() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [id, setId] = useState("");
    const [username, setUsername] = useState("未登录");
    const [useravatar, setUseravatar] = useState("");

    useEffect(() => {
        if (localStorage.username === null) {
        } else {
            axios
                .post(
                    BASE_URL + "/users/loginStatus",
                    {},
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
                        setIsLoggedIn(true);
                        setId(res.data.data.id);
                        setUsername(res.data.data.username);
                        setUseravatar(res.data.data.useravatar);
                    } else {
                        setIsLoggedIn(false);
                    }
                });
        }
    });

    const logout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("token");
    };

    const content = (
        <div>
            <Button type="text">
                <NavLink to={`/UserCenter/${id}`}>个人中心</NavLink>
            </Button>
            <div>
                <Button type="link" href="/UserCenter">
                    我的收藏
                </Button>
            </div>
            <div>
                <Button onClick={logout} type="text">
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
                        <Avatar size={36} src={BASE_URL + "/" + useravatar} />
                        <Button type="link">{username}</Button>
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

export default UserCenter;