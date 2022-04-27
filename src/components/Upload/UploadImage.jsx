import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../utils/url";
import axios from "axios";
import { Upload, message } from "antd";
import ImgCrop from "antd-img-crop";

const UserAvatar = ({ userAvatar }) => {
    const [fileList, setFileList] = useState([
        {
            uid: "-1",
            name: userAvatar,
            status: "done",
            url: BASE_URL + "/" + userAvatar,
        },
    ]);

    const onChange = ({ fileList: newFileList }) => {
        if (newFileList[0] && newFileList[0].status === "done") {
            axios
                .post(
                    BASE_URL + "/users/editUserAvatar",
                    {
                        avatar: newFileList[0].response.name,
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
                    if (response.data.code === 0) {
                        message.error(response.data.message);
                    } else {
                        message.success(response.data.message);
                    }
                });
        }
        setFileList(newFileList);
    };

    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };

    useEffect(() => {
        var avatar = [
            {
                uid: "-1",
                name: userAvatar,
                status: "done",
                url: BASE_URL + "/" + userAvatar,
            },
        ];
        setFileList(avatar);
    }, [userAvatar]);

    return (
        <ImgCrop rotate>
            <Upload
                action={BASE_URL + "/orthers/upload"}
                listType="picture-card"
                fileList={fileList}
                maxCount={1}
                onChange={onChange}
                onPreview={onPreview}
            >
                {fileList.length < 1 && "+ Upload"}
            </Upload>
        </ImgCrop>
    );
};

export default UserAvatar;
