import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Regist from "./pages/Regist/Regist";
import About from "./pages/About/About";
import Home from "./pages/Home/Home";
import QueAns from "./pages/QueAns/QueAns";
import UserCenter from "./pages/UserCenter/UserCenter";
import UserDetailEdit from "./pages/UserCenter/UserDetailEdit";
import BlogDetail from "./pages/BlogDetail/BlogDetail";
import Write from "./pages/Write/Write";
import App from "./App";
import "./index.css"

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route path="Home" element={<Home />} >
                <Route path=":searchContent" element={<Home />} />
                </Route>
                <Route path="Login" element={<Login />} />
                <Route path="Regist" element={<Regist />} />
                <Route path="QueAns" element={<QueAns />} />
                <Route path="UserCenter" element={<UserCenter />}>
                    <Route path=":userId" element={<UserCenter />} />
                </Route>
                <Route path="UserDetailEdit" element={<UserDetailEdit />} />
                <Route path="About" element={<About />} />
                <Route path="Write" element={<Write />} >
                    <Route path=":BlogId" element={<Write />} />
                </Route>
                <Route path="BlogDetail" element={<BlogDetail />}>
                    <Route
                        index
                        element={
                            <main style={{ padding: "1rem" }}>
                                <p>Select an invoice</p>
                            </main>
                        }
                    />
                    <Route path=":BlogId" element={<BlogDetail />} />
                </Route>
                <Route
                    path="*"
                    element={
                        <main style={{ padding: "1rem" }}>
                            <p>There's nothing here!</p>
                        </main>
                    }
                />
            </Route>
        </Routes>
    </BrowserRouter>,
    document.getElementById("root")
);
