import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { BASE_URL } from "../../utils/url";
import { Form, Input, Select, Checkbox, Divider, Button,message } from "antd";
import BraftEditor from "braft-editor";
import CodeHighlighter from "braft-extensions/dist/code-highlighter";
import "braft-editor/dist/index.css";
import "braft-extensions/dist/code-highlighter.css";
import "prismjs/components/prism-java";
import "prismjs/components/prism-php";

import "prismjs/components/prism-c";
import "prismjs/components/prism-jsx";
import axios from "axios";

const BraftEdit = () => {
    const [items, setItems] = useState([
        "前端",
        "后端",
        "小程序",
        "iOS",
        "Android",
        "工具",
        "程序员",
        "AI",
        "云计算",
        "人工智能",
        "安全",
        "大数据",
    ]);
    const [tabs, setTabs] = useState([]);
    const [sortName, setSortName] = useState("");
    const params = useParams();
    const list = {};
    const [form] = Form.useForm();
    const navigate = useNavigate();

    useEffect(() => {
        if (params.BlogId) {
            axios
                .post(
                    BASE_URL + "/blogs/editBlog",
                    {
                        id: params.BlogId,
                    },
                    {
                        headers: {
                            authorization:
                                "Bearer " +
                                window.localStorage.getItem("token"),
                        },
                    }
                )
                .then((response) => {
                    form.setFieldsValue({
                        blogTitle: response.data.data.blogTitle,
                        blogSort: response.data.data.blogSort,
                        blogRecommend: response.data.data.blogRecommend,
                        blogTabs: response.data.data.blogTabs,
                        blogContent: BraftEditor.createEditorState(
                            response.data.data.blogContent
                        ),
                        blogSee: response.data.data.blogSee,
                    });
                });
        }
    }, [form, params.BlogId]);

    const onFinish = (values) => {
        if (params.BlogId) {
            list.id = params.BlogId;
        }
        list.blogTitle = values.blogTitle;
        list.blogSort = values.blogSort;
        list.blogTabs = values.blogTabs;
        list.blogRecommend = values.blogRecommend;
        list.blogContent = values.blogContent.toHTML();
        // list.image = fileList;
        list.blogSee = values.blogSee;
        axios
            .post(BASE_URL + "/blogs/addBlog", list, {
                headers: {
                    authorization:
                        "Bearer " + window.localStorage.getItem("token"),
                },
            })
            .then((res) => {
                if (res.status === 200) {
                    if (res.data.code === 1) {
                        // 不能在组件销毁后设置state
                        navigate("/Home");
                    } else {
                        message.error(res.data.error);
                    }
                }
            });
    };

    const onNameChange = (event) => {
        setSortName(event.target.value);
    };

    const addItem = () => {
        setItems([...items, sortName]);
    };

    function handleChange(value) {
        setTabs(value);
    }

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="blog"
            onFinish={onFinish}
            scrollToFirstError
        >
            <Form.Item
                name="blogTitle"
                label="标题"
                rules={[
                    {
                        required: true,
                        message: "请输入标题!",
                        whitespace: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="blogTabs"
                label="标签"
                rules={[
                    {
                        type: "array",
                        required: true,
                        message: "请输标签!",
                        whitespace: true,
                    },
                ]}
            >
                <Select
                    mode="tags"
                    style={{ width: "100%" }}
                    onChange={handleChange}
                    tokenSeparators={[","]}
                >
                    {tabs.map((tab) => (
                        <Select.Option value={tab} key={tab}>
                            {tab}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                name="blogSort"
                label="分类"
                rules={[
                    {
                        required: true,
                        message: "请输入分类!",
                        whitespace: true,
                    },
                ]}
            >
                <Select
                    style={{ width: 240 }}
                    placeholder="请选择分类"
                    dropdownRender={(menu) => (
                        <div>
                            {menu}
                            <Divider style={{ margin: "4px 0" }} />
                            <div
                                style={{
                                    display: "flex",
                                    flexWrap: "nowrap",
                                    padding: 8,
                                }}
                            >
                                <Input
                                    style={{ flex: "auto" }}
                                    onChange={onNameChange}
                                />
                                <div
                                    style={{
                                        flex: "none",
                                        padding: "8px",
                                        display: "block",
                                        cursor: "pointer",
                                    }}
                                    onClick={addItem}
                                >
                                    <PlusOutlined /> Add item
                                </div>
                            </div>
                        </div>
                    )}
                >
                    {items.map((item) => (
                        <Select.Option value={item} key={item}>
                            {item}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                name="blogRecommend"
                label="推荐语"
                rules={[{ required: true, message: "请输入推荐语" }]}
            >
                <Input.TextArea showCount maxLength={100} />
            </Form.Item>

            <Form.Item
                className="editor-wrapper"
                label="文章正文"
                name="blogContent"
                rules={[
                    {
                        required: true,
                        message: "请输入正文!",
                    },
                ]}
            >
                <BraftEditor
                    className="my-editor"
                    id="xiaoFengBlogEdit"
                    placeholder="请输入正文内容"
                />
            </Form.Item>

            <Form.Item
                label="所有人可见"
                name="blogSee"
                valuePropName="checked"
            >
                <Checkbox>所有人可见</Checkbox>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    保存
                </Button>
            </Form.Item>
        </Form>
    );
};

const formItemLayout = {
    labelCol: {
        xs: {
            span: 12,
        },
        sm: {
            span: 6,
        },
    },
    wrapperCol: {
        xs: {
            span: 20,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const options = {
    includeEditors: ["xiaoFengBlogEdit"],
    syntaxs: [
        {
            name: "JavaScript",
            syntax: "javascript",
        },
        {
            name: "HTML",
            syntax: "html",
        },
        {
            name: "CSS",
            syntax: "css",
        },
        {
            name: "Java",
            syntax: "java",
        },
        {
            name: "PHP",
            syntax: "php",
        },
        {
            name: "C",
            syntax: "c",
        },
        {
            name: "React JSX",
            syntax: "jsx",
        },
    ],
};

BraftEditor.use(CodeHighlighter(options));

export default BraftEdit;
