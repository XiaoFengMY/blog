import React, { Component } from "react";
import { Button, Space } from "antd";
import axios from "axios";
import { BASE_URL } from "../../utils/url";
import IconFont from "../../components/IconFont/IconFont";

class Like extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLiked: false,
            likeFont: "icon-zan1",
            likeNum: props.likeNum,
        };
    }
    render() {
        return (
            <Button type="text">
                <Space
                    onClick={this.handleLike.bind(this)}
                    style={{ fontSize: this.props.fontsize }}
                >
                    <IconFont type={this.state.likeFont} />
                    {this.state.likeNum}
                </Space>
            </Button>
        );
    }

    handleLike() {
        let likeStateNum = this.state.likeNum;
        if (this.state.isLiked) {
            this.setState({
                isLiked: false,
                likeFont: "icon-zan",
                likeNum: likeStateNum++,
            });
            console.log("1", this.state.likeNum);
            axios
                .get(BASE_URL + "/blogs/likeBlog", { blogId: 1, userId: 1 })
                .then((response) => {
                    console.log(response.data.data);
                });
        } else {
            this.setState({
                isLiked: true,
                likeFont: "icon-zan1",
                likeNum: likeStateNum--,
            });
            console.log("2", this.state.likeNum);
        }
    }
}

export default Like;
