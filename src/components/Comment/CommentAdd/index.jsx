import React, { useState } from "react";
import moment from "moment";
import { Comment, Avatar, Form, Button, Input,message } from "antd";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../../utils/url";
import axios from "axios";

const { TextArea } = Input;

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button
                htmlType="submit"
                loading={submitting}
                onClick={onSubmit}
                type="primary"
            >
                评论
            </Button>
        </Form.Item>
    </>
);

const CommentAdd = ({commentId}) => {
    const [submitting, setSubmitting] = useState(false);
    const [value, setValue] = useState("");
    const params = useParams();

    const handleSubmit = () => {
        setSubmitting(true);
        axios
            .post(
                BASE_URL + "/comments/blogComment",
                {
                    id: params.BlogId,
                    commentId: commentId,
                    content: value,
                    datetime: moment(),
                },
                {
                    headers: {
                        authorization:
                            "Bearer " + window.localStorage.getItem("token"),
                    },
                }
            )
            .then((res) => {
                if (res.data.code === 1) {
                    message.success(res.data.message);
                    setSubmitting(false);
                    setValue("");
                }else{
                    message.error(res.data.message);
                    setSubmitting(false);
                    setValue("");
                }
            });

    };

    const handleChange = (e) => {
        setValue(e.target.value);
    };
    return (
        <section>
            <Comment
                style={{ width: "90%" }}
                avatar={
                    <Avatar
                        src="https://tse1-mm.cn.bing.net/th/id/R-C.7237ee86f5b57f5ae1c0a9cfab99a21f?rik=4l1sX91jBLVjDg&riu=http%3a%2f%2fi2.hdslb.com%2fbfs%2farchive%2fd1b0ef4edd2648defe28c2c2a605506b6262eb02.jpg&ehk=Bakt2tifjXbEwngmxlRUkRZPD5K56UayNDpvPaGvbaM%3d&risl=&pid=ImgRaw&r=0"
                        alt="Han Solo"
                    />
                }
                content={
                    <Editor
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        submitting={submitting}
                        value={value}
                    />
                }
            />
        </section>
    );
};

export default CommentAdd;
