import React, { useState,useEffect } from "react";
import { Button, Space,message } from "antd";
import axios from "axios";
import { BASE_URL } from "../../utils/url";
import IconFont from "../../components/IconFont/IconFont"

function Collect(props) {
    const [isCollected, setIsCollected] = useState(false);
    const [collectFont, setCollectFont] = useState("icon-shoucang1");
    const [collectNum, setCollectNum] = useState(props.collectNum);
    useEffect(() => {
        axios
            .get(BASE_URL + "/orthers/isCollected", {
                params: { blogId: props.blogId },
                headers: {
                    authorization:
                        "Bearer " + window.localStorage.getItem("token"),
                },
            })
            .then((response) => {
                console.log("response", response.data.isCollected);
                if(response.data.isCollected){
                    setIsCollected(true);
                    setCollectFont("icon-shoucang");
                }else{
                    setIsCollected(false);
                    setCollectFont("icon-shoucang1");
                }
            });
    }, [props.blogId]);
    const handleCollect = () => {
        console.log("isCollected", isCollected);
        console.log("collectNum", collectNum);
        console.log("collectFont", collectFont);
        if (window.localStorage.getItem("token")) {
            axios
                .get(BASE_URL + "/orthers/collectBlog", {
                    params: { blogId: props.blogId, isCollected: isCollected },
                    headers: {
                        authorization:
                            "Bearer " + window.localStorage.getItem("token"),
                    },
                })
                .then((response) => {
                    message.warning(response.data.message);
                });
            let collectStateNum = collectNum;
            if (isCollected) {
                setIsCollected(false);
                setCollectFont("icon-shoucang1");
                setCollectNum(collectStateNum - 1);
            } else {
                setIsCollected(true);
                setCollectFont("icon-shoucang");
                setCollectNum(collectStateNum + 1);
            }
        } else {
            message.warning("请先登录");
        }
    };

    return (
        <Button type="text">
            <Space onClick={handleCollect} style={{ fontSize: props.fontsize }}>
                <IconFont type={collectFont} />
                {collectNum}
            </Space>
        </Button>
    );
}


/* class Collect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCollected: false,
            collectFont: "icon-shoucang1",
        };
    }
    render() {
        return (
            <Button type="text">
                <Space
                    onClick={this.handleCollect.bind(this)}
                    style={{ fontSize: this.props.fontsize }}
                >
                    <IconFont type={this.state.collectFont}/>
                    {this.props.collectNum}
                </Space>
            </Button>
        );
    }

    handleCollect() {
        if (this.state.isCollected) {
            this.setState({
                isCollected: false,
                collectFont: "icon-shoucang1",
            });
        } else {
            this.setState({
                isCollected: true,
                collectFont: "icon-shoucang",
            });
        }
    }
} */

export default Collect;
