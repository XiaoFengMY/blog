import React, { useState, useEffect } from "react";
import HtmlDiff from "htmldiff-js";

const QueAns = () => {
    const [diffdom, setDiffdom] = useState("");
    useEffect(() => {
        let oldHtml = document.getElementById("oldHtml");
        let newHtml = document.getElementById("newHtml");
        var diffHtml =document.getElementById("htmlDiff");

        diffHtml.innerHTML = HtmlDiff.execute(
            oldHtml.innerHTML,
            newHtml.innerHTML
        );
        console.log('hello ',diffHtml);
        // setDiffdom(diffHtml);
    }, []);
    return (
        <div style={{marginTop:"200px"}}>
            <div id="oldHtml">
                <p>
                    Some <em>old</em> html here
                </p>
            </div>

            <div id="newHtml">
                <p>
                    Some <b>new</b> html goes here
                </p>
            </div>

            <div id="htmlDiff" ></div>
        </div>
    );
};

export default QueAns;
