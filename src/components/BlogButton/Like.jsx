import React, { useState, useEffect } from "react";
import { Button, Space, message } from "antd";
import axios from "axios";
import { BASE_URL } from "../../utils/url";
import IconFont from "../../components/IconFont/IconFont";

function Like(props) {
    const [isLiked, setIsLiked] = useState(false);
    const [likeFont, setLikeFont] = useState("icon-zan1");
    const [likeNum, setLikeNum] = useState(props.likeNum);
    useEffect(() => {
        axios
            .get(BASE_URL + "/orthers/isLiked", {
                params: { blogId: props.blogId },
                headers: {
                    authorization:
                        "Bearer " + window.localStorage.getItem("token"),
                },
            })
            .then((response) => {
                console.log("response", response.data.isLiked);
                if(response.data.isLiked){
                    setIsLiked(true);
                    setLikeFont("icon-zan");
                }else{
                    setIsLiked(false);
                    setLikeFont("icon-zan1");
                }
            });
    }, [props.blogId]);
    const handleLike = () => {
        if (window.localStorage.getItem("token")) {
            axios
                .get(BASE_URL + "/orthers/likeBlog", {
                    params: { blogId: props.blogId, isLiked: isLiked },
                    headers: {
                        authorization:
                            "Bearer " + window.localStorage.getItem("token"),
                    },
                })
                .then((response) => {
                    message.warning(response.data.message);
                });
            let likeStateNum = likeNum;
            if (isLiked) {
                setIsLiked(false);
                setLikeFont("icon-zan1");
                setLikeNum(likeStateNum - 1);
            } else {
                setIsLiked(true);
                setLikeFont("icon-zan");
                setLikeNum(likeStateNum + 1);
            }
        } else {
            message.warning("请先登录");
        }
    };

    return (
        <Button type="text">
            <Space onClick={handleLike} style={{ fontSize: props.fontsize }}>
                <IconFont type={likeFont} />
                {likeNum}
            </Space>
        </Button>
    );
}

export default Like;
