import About from "../pages/About";
import Login from "../pages/Login";
import PostIdPage from "../pages/PostIdPage";
import Posts from "../pages/Posts";


export const privateRoutes = [
    {path: '/posts', component: <Posts/>},
    {path: '/posts/:id', component: <PostIdPage/>},
    {path: '/about', component: <About/>}
]

export const publicRoutes = [
    {path: '/login', component: <Login/>}
]