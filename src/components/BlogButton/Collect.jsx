import React, { Component } from "react";
import { Button, Space } from "antd";
import IconFont from "../../components/IconFont/IconFont"

class Collect extends Component {
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
                    {this.props.colectNum}
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
}

export default Collect;
