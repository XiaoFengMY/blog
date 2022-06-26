import React from "react";
import MdEditor from "react-markdown-editor-lite";
import ReactMarkdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";

function QueAns() {
    function handleEditorChange({ html, text }) {
        console.log("handleEditorChange", html, text);
    }
    function renderHTML(text) {
        // 使用 react-markdownｓ
        return React.createElement(ReactMarkdown, {}, text);
    }
    return (
        <div style={{marginTop:"100px"}}>
            <MdEditor
                value="# Title"
                placeholder="请输入"
                style={{ height: "500px" }}
                renderHTML={renderHTML}
                onChange={handleEditorChange}
            />
        </div>
    );
}

export default QueAns;
