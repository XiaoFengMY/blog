import React, { createElement, useState } from "react";
import moment from "moment";
import { List, Comment, Avatar, Tooltip, Popover } from "antd";
import {
    DislikeOutlined,
    LikeOutlined,
    DislikeFilled,
    LikeFilled,
} from "@ant-design/icons";
import ReplyComment from "../CommentAdd/index"

const ExampleComment = () => {
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [action, setAction] = useState(null);

    const like = () => {
        setLikes(!likes);
        setDislikes(0);
        setAction("liked");
    };

    const dislike = () => {
        setLikes(!dislikes);
        setDislikes(1);
        setAction("disliked");
    };

    const content = (
        <div>
            <ReplyComment></ReplyComment>
        </div>
    );

    const actions = [
        <Tooltip key="comment-basic-like" title="赞">
            <span onClick={like}>
                {createElement(action === "liked" ? LikeFilled : LikeOutlined)}
                <span className="comment-action">{likes}</span>
            </span>
        </Tooltip>,
        <Tooltip key="comment-basic-dislike" title="踩">
            <span onClick={dislike}>
                {React.createElement(
                    action === "disliked" ? DislikeFilled : DislikeOutlined
                )}
                <span className="comment-action">{dislikes}</span>
            </span>
        </Tooltip>,
        <Popover
            overlayStyle={{width:"600px"}}
            key="comment-basic-reply-to"
            placement="bottom"
            content={content}
            title="回复评论"
            trigger="click"
        >
            回复
        </Popover>,
    ];

    return (
        <List
            className="comment-list"
            header={`${data.length} 评论`}
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
                <li>
                    <Comment
                        actions={actions}
                        author={<span>{item.author}</span>}
                        avatar={<Avatar src={item.avatar} alt="Han Solo" />}
                        content={<p>{item.content}</p>}
                        datetime={
                            <Tooltip
                                title={moment().format("YYYY-MM-DD HH:mm:ss")}
                            >
                                <span>{moment().fromNow()}</span>
                            </Tooltip>
                        }
                    >
                        {item.children &&
                            item.children.map((child, index) => {
                                return (
                                    <Comment
                                        key={index}
                                        actions={actions}
                                        author={<span>{child.author}</span>}
                                        avatar={
                                            <Avatar
                                                src={child.avatar}
                                                alt="Han Solo"
                                            />
                                        }
                                        content={<p>{child.content}</p>}
                                        datetime={
                                            <Tooltip
                                                title={moment().format(
                                                    "YYYY-MM-DD HH:mm:ss"
                                                )}
                                            >
                                                <span>
                                                    {moment().fromNow()}
                                                </span>
                                            </Tooltip>
                                        }
                                    />
                                );
                            })}
                    </Comment>
                </li>
            )}
        />
    );
};

const CommentList = (props) => {
    console.log("comment add ", props.blogComments);
    return (
        <section>
            <ExampleComment commentList={props.blogComments}></ExampleComment>
        </section>
    );
};

const data = [
    {
        author: "会员甲 ",
        avatar: "https://pic2.zhimg.com/v2-37a71fb880e5462e57bdc894c4c5336f_r.jpg?source=1940ef5c",
        content:
            "这是一条评论",
    },
    {
        author: "会员乙",
        avatar: "https://tse3-mm.cn.bing.net/th/id/OIP-C.L0eqrfLu9zx3pEl6ZxgYVAHaHa?pid=ImgDet&rs=1",
        content:
            "请友善评论",
        children: [
            {
                author: "会员甲",
                avatar: "https://pic2.zhimg.com/v2-37a71fb880e5462e57bdc894c4c5336f_r.jpg?source=1940ef5c",
                content:
                    "测试",
            },
            {
                author: "会员乙",
                avatar: "https://tse3-mm.cn.bing.net/th/id/OIP-C.L0eqrfLu9zx3pEl6ZxgYVAHaHa?pid=ImgDet&rs=1",
                content:
                    "OK",
            },
        ],
    },
    {
        author: "会员丙",
        avatar: "https://tse3-mm.cn.bing.net/th/id/OIP-C.bMpLom1CxNg3hJ1fEabwZwHaHa?w=184&h=184&c=7&r=0&o=5&pid=1.7",
        content:
            "没问题",
        children: [
            {
                author: "会员丁",
                avatar: "https://tse2-mm.cn.bing.net/th/id/OIP-C.qNTOXFA4fslC3-S_CqACQgHaHa?w=204&h=204&c=7&r=0&o=5&pid=1.7",
                content:
                    "好的",
            },
            {
                author: "会员丁",
                avatar: "https://tse2-mm.cn.bing.net/th/id/OIP-C.qNTOXFA4fslC3-S_CqACQgHaHa?w=204&h=204&c=7&r=0&o=5&pid=1.7",
                content:
                    "可以呀",
            },
        ],
    },
];

export default CommentList;
