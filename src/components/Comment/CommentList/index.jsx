import React, { createElement, useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { useParams, NavLink } from "react-router-dom";
import { List, Comment, Avatar, Tooltip, Popover } from "antd";
import { BASE_URL } from "../../../utils/url";
import {
    DislikeOutlined,
    LikeOutlined,
    DislikeFilled,
    LikeFilled,
} from "@ant-design/icons";
import ReplyComment from "../CommentAdd/index";

const ExampleComment = () => {
    const params = useParams();

    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [action, setAction] = useState(null);
    const [commentList, setCommentList] = useState([]);

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

    useEffect(() => {
        axios
            .post(BASE_URL + "/comments/blogCommentList", {
                blogId: params.BlogId,
            })
            .then((response) => {
                setCommentList(response.data.data);
            });
    }, [params.BlogId]);

    const Content = ({ commentId }) => {
        return (
            <div>
                <ReplyComment commentId={commentId} />
            </div>
        );
    };

    return (
        <List
            className="comment-list"
            header={`${commentList.length} 评论`}
            itemLayout="horizontal"
            dataSource={commentList}
            renderItem={(item) => (
                <li>
                    <Comment
                        actions={[
                            <Tooltip key="comment-basic-like" title="赞">
                                <span onClick={like}>
                                    {createElement(
                                        action === "liked"
                                            ? LikeFilled
                                            : LikeOutlined
                                    )}
                                    <span className="comment-action">
                                        {likes}
                                    </span>
                                </span>
                            </Tooltip>,
                            <Tooltip key="comment-basic-dislike" title="踩">
                                <span onClick={dislike}>
                                    {React.createElement(
                                        action === "disliked"
                                            ? DislikeFilled
                                            : DislikeOutlined
                                    )}
                                    <span className="comment-action">
                                        {dislikes}
                                    </span>
                                </span>
                            </Tooltip>,
                            <Popover
                                className={item.username}
                                overlayStyle={{ width: "600px" }}
                                key="comment-basic-reply-to"
                                placement="bottom"
                                content={<Content commentId={item.id} />}
                                title="回复评论"
                                trigger="click"
                            >
                                回复
                            </Popover>,
                        ]}
                        author={
                            <NavLink to={`/UserCenter/${item.username.id}`}>
                                {item.username.username}
                            </NavLink>
                        }
                        avatar={
                            <Avatar
                                src={BASE_URL + "/" + item.username.useravatar}
                                alt="Han Solo"
                            />
                        }
                        content={<p>{item.commentContent}</p>}
                        datetime={
                            <Tooltip
                                title={moment(item.createTime)
                                    .utc()
                                    .format("YYYY-MM-DD HH:mm:ss")}
                            >
                                <span>
                                    {moment(item.createTime).utc().fromNow()}
                                </span>
                            </Tooltip>
                        }
                    >
                        {item.children &&
                            item.children.map((child, index) => {
                                return (
                                    <Comment
                                        key={index}
                                        actions={[
                                            <Tooltip
                                                key="comment-basic-like"
                                                title="赞"
                                            >
                                                <span onClick={like}>
                                                    {createElement(
                                                        action === "liked"
                                                            ? LikeFilled
                                                            : LikeOutlined
                                                    )}
                                                    <span className="comment-action">
                                                        {likes}
                                                    </span>
                                                </span>
                                            </Tooltip>,
                                            <Tooltip
                                                key="comment-basic-dislike"
                                                title="踩"
                                            >
                                                <span onClick={dislike}>
                                                    {React.createElement(
                                                        action === "disliked"
                                                            ? DislikeFilled
                                                            : DislikeOutlined
                                                    )}
                                                    <span className="comment-action">
                                                        {dislikes}
                                                    </span>
                                                </span>
                                            </Tooltip>,
                                        ]}
                                        author={
                                            <NavLink
                                                to={`/UserCenter/${child.username.id}`}
                                            >
                                                {item.username.username}
                                            </NavLink>
                                        }
                                        avatar={
                                            <Avatar
                                                src={
                                                    BASE_URL +
                                                    "/" +
                                                    child.username.useravatar
                                                }
                                                alt="Han Solo"
                                            />
                                        }
                                        content={<p>{child.commentContent}</p>}
                                        datetime={
                                            <Tooltip
                                                title={moment(
                                                    child.commentTime
                                                ).format("YYYY-MM-DD HH:mm:ss")}
                                            >
                                                <span>
                                                    {moment(child.commentTime)
                                                        .utc()
                                                        .fromNow()}
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

const CommentList = () => {
    return (
        <section>
            <ExampleComment></ExampleComment>
        </section>
    );
};

export default CommentList;
