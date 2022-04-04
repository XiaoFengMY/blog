import React from "react";
import { Comment, Tooltip, List, Avatar } from "antd";
import moment from "moment";

const ExampleComment = () => (
    <List
        className="comment-list"
        header={`${data.length} replies`}
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
            <li>
                <Comment
                    actions={[<span key="comment-nested-reply-to">回复</span>]}
                    author={<a>{item.author}</a>}
                    avatar={<Avatar src={item.avatar} alt="Han Solo" />}
                    content={<p>{item.content}</p>}
                >
                    {item.children &&
                        item.children.map((child) => {
                            return (
                                <Comment
                                    actions={[
                                        <span key="comment-nested-reply-to">
                                            回复
                                        </span>,
                                    ]}
                                    author={<a>{child.author}</a>}
                                    avatar={
                                        <Avatar src={child.avatar} alt="Han Solo" />
                                    }
                                    content={<p>{child.content}</p>}
                                />
                            );
                        })
                    }
                </Comment>
            </li>
        )}
    />
);

class QueAns extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            fileList: [],
        };
    }
    /*点击上传时触发*/
    onChange = ({ fileList: newFileList }) => {
        this.setState({ fileList: newFileList });
        console.log(newFileList);
    };
    render() {
        return (
            <div style={{ marginTop: "100px" }}>
                <ExampleComment />
            </div>
        );
    }
}

const data = [
    {
        actions: [<span key="comment-list-reply-to-0">回复</span>],
        author: "Han ",
        avatar: "https://joeschmoe.io/api/v1/random",
        content:
            "lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, quisquam.",
    },
    {
        actions: [<span key="comment-list-reply-to-0">回复</span>],
        author: "Han Solo fdsf",
        avatar: "https://joeschmoe.io/api/v1/random",
        content:
            "lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, quisquam.",
        children: [
            {
                actions: [<span key="comment-list-reply-to-0">回复</span>],
                author: "Han dsds Solo",
                avatar: "https://joeschmoe.io/api/v1/random",
                content:
                    "lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, quisquam.",
            },
            {
                actions: [<span key="comment-list-reply-to-0">回复</span>],
                author: "Han Solo",
                avatar: "https://joeschmoe.io/api/v1/random",
                content:
                    "lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, quisquam.",
            },
        ],
    },
    {
        actions: [<span key="comment-list-reply-to-0">回复</span>],
        author: "Han dsdsd  Solo",
        avatar: "https://joeschmoe.io/api/v1/random",
        content:
            "lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, quisquam.",
        children: [
            {
                actions: [<span key="comment-list-reply-to-0">回复</span>],
                author: "Han Solo",
                avatar: "https://joeschmoe.io/api/v1/random",
                content:
                    "lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, quisquam.",
            },
            {
                actions: [<span key="comment-list-reply-to-0">回复</span>],
                author: "Han Solo",
                avatar: "https://joeschmoe.io/api/v1/random",
                content:
                    "lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, quisquam.",
            },
        ],
    },
];

export default QueAns;
