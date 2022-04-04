import React, { Component } from "react";
import { Outlet,LocaleProvider } from "react-router-dom";
import moment from 'moment';
import 'moment/locale/zh-cn';
import HeaderBlog from "./components/LayoutAntd/HeaderBlog";
import FooterBlog from "./components/LayoutAntd/FooterBlog";
moment.locale('zh-cn');
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <HeaderBlog />
                <Outlet />
                <FooterBlog />   
            </div>
        );
    }
}

export default App;
