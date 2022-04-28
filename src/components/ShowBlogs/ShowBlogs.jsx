import React from "react";

import { NavLink } from "react-router-dom";
import { List } from "antd";

function ShowBlogs({ blog }) {
    return (
        <div>
            <List
                itemLayout="horizontal"
                dataSource={blog}
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                            title={
                                <NavLink to={`/BLogDetail/${item.id}`}>
                                    {item.blogTitle}
                                </NavLink>
                            }
                            description={item.blogRecommend}
                        />
                    </List.Item>
                )}
            />
        </div>
    );
}

export default ShowBlogs;
