import React, {Component} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


// pages
import Main from "../pages/main/Main";
import StudyLst from '../pages/study/List';
import StudyDetail from '../pages/study/Detail';
import StudyWrite from '../pages/study/Write';
import CommunityList from '../pages/community/List';
import CommunityDetail from '../pages/community/Detail';
import CommunityWrite from '../pages/community/Write';
import MyPage from '../pages/mypage/Main';
import AdminPage from '../pages/admin/Main';
import Login from '../pages/login/Login';
import SignUp from '../pages/login/SignUp';
import FindPw from "../pages/login/FindPw";
import Account from "../pages/mypage/Account";

class RouterPage extends Component {
    render() {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path={"/login"} element={<Login/>} />
                    <Route path={"/signup"} element={<SignUp/>} />
                    <Route path={"/findPw"} element={<FindPw/>} />
                    <Route path="/study" element={<StudyLst />} />
                    <Route path="/study/:keyword" element={<StudyLst />} />
                    <Route path="/study/detail/:id" element={<StudyDetail />} />
                    <Route path="/study/write/:id" element={<StudyWrite />} />
                    <Route path="/community/:id" element={<CommunityList />} />
                    <Route path="/community/detail/:commId" element={<CommunityDetail />} />
                    <Route path="/community/write/:commId" element={<CommunityWrite />} />
                    <Route path={"/mypage"} element={<MyPage/>} />
                    <Route path={"/account"} element={<Account/>} />
                    <Route path={"/admin"} element={<AdminPage/>} />
                </Routes>
            </Router>
        );
    }
}

export default RouterPage;
