import React, {useEffect} from 'react';
import {useUser} from "../../context/UserContext";

import Header from "./Header";
import Footer from './Footer';
import {useLocation, useNavigate} from "react-router-dom";

function Layout({children}) {
    const {login, user, logout} = useUser();
    const location = useLocation();
    const navigate = useNavigate();
    const allowUrls = ["/", "/login", "/signup", "findPw"];

    useEffect(() => {
        if(!user || !user?.userIdx) {
            // @INFO 새로고침시 user 초기화 방지를 위해 localStorage 체크를 한번 더 해준다.
            if(!JSON.parse(localStorage.getItem("user"))?.userIdx) {
                if (!allowUrls.includes(location.pathname)) {
                    navigate("/", { replace: true }); // "/"로 리다이렉트
                }
            }
        }
    }, [user])

    return (
        <div className={"wrap"}>
            <Header user={user} handleLogin={(data) => login(data)} handleLogout={logout}/>
            <div className="container">
                {children}
            </div>
            <Footer/>
        </div>
    );
}

export default Layout;