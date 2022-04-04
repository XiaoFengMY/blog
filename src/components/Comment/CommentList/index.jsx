import React, { createElement, useState } from "react";
import moment from "moment";
import { List, Comment, Avatar, Tooltip, Popover, Button } from "antd";
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
            header={`${data.length} replies`}
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
    console.log("hi", props.blogComments);
    return (
        <section>
            <ExampleComment></ExampleComment>
        </section>
    );
};

const data = [
    {
        author: "Han ",
        avatar: "https://joeschmoe.io/api/v1/random",
        content:
            "lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, quisquam.",
    },
    {
        author: "Han Solo fdsf",
        avatar: "https://joeschmoe.io/api/v1/random",
        content:
            "lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, quisquam.",
        children: [
            {
                author: "Han dsds Solo",
                avatar: "https://joeschmoe.io/api/v1/random",
                content:
                    "lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, quisquam.",
            },
            {
                author: "Han Solo",
                avatar: "https://joeschmoe.io/api/v1/random",
                content:
                    "lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, quisquam.",
            },
        ],
    },
    {
        author: "Han dsdsd  Solo",
        avatar: "https://joeschmoe.io/api/v1/random",
        content:
            "lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, quisquam.",
        children: [
            {
                author: "Han Solo",
                avatar: "https://joeschmoe.io/api/v1/random",
                content:
                    "lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, quisquam.",
            },
            {
                author: "Han Solo",
                avatar: "https://joeschmoe.io/api/v1/random",
                content:
                    "lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, quisquam.",
            },
        ],
    },
];

export default CommentList;
