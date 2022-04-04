import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Regist from '../pages/Regist/Regist'
import Write from '../pages/Write/Write'
import BlogDetail from "../pages/BlogDetail/BlogDetail"

const routers = [
    {path: "/Login", element: <Login />, exact: true, strict: true},
    {path: "/Regist", element: <Regist />, exact: true, strict: true},
    {path: "/Write", element: <Write />, exact: true, strict: true},
    {path: "/BlogDetail/:id/:title", element: <BlogDetail />, exact: true, strict: true},
    {path: "/", element: <Home />, exact: true, strict: true},
  ]
export default routers;