import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import Logo from '../../assets/images/logo.png';
import {BellIcon} from "../../assets/icons/Icon";

const Header = ({ user, handleLogin, handleLogout }) => {
    const navigate = useNavigate();

    const {keyword} = useParams();

    const [alarmPopup, setAlarmPopup] = useState(false);
    const [searchInput, setSearchInput] = useState("");


    useEffect(() => {
        (keyword) && setSearchInput(keyword)
    }, [keyword])

    return (
        <header className={"header"}>
            <h1 className={"logo"}><Link to={"/"}><img src={Logo} alt=""/></Link></h1>
            <div className="right_section">
                <div className="search">
                    <input
                        type="text"
                        className={"input"}
                        placeholder={"강의를 검색해 보세요!"}
                        value={searchInput}
                        onChange={e => setSearchInput(e.target.value)}
                        onKeyPress={e => (e.key === "Enter") && navigate(`/study/${searchInput}`)}
                    />
                    <button
                        className={"button"}
                        onClick={() => {
                            if(!searchInput) {
                                alert("검색어를 입력하세요!");
                                return;
                            }
                            navigate(`/study/${searchInput}`)
                        }}
                    >
                        search
                    </button>
                </div>
                <div className="user_menu">
                    {
                        (user?.userId) ?
                            <>
                                <button
                                    className={"button linear"}
                                    onClick={handleLogout}>
                                    LOGOUT
                                </button>
                                {
                                    (user?.type === "admin") ?
                                    <>
                                        <button className="button" onClick={() => navigate("/admin")}>adminpage</button>
                                        <button className={`button_alarm ${alarmPopup ? "active": ""}`} onClick={() => setAlarmPopup(!alarmPopup)}>
                                            <BellIcon/>
                                        </button>
                                        {
                                            alarmPopup &&
                                            <div className="alarm_wrap custom_scroll">
                                                <ul className="alarm_list">
                                                    <li className="alarm_item">
                                                        <div className="content">
                                                            <p className="text">최사라님이 000스터디에 가입신청을 하였습니다.</p>
                                                            <span className="date">2024-08-23 10:00</span>
                                                        </div>
                                                        <button className={"button"}>읽음</button>
                                                    </li>
                                                    <li className="alarm_item">
                                                        <div className="content">
                                                            <p className="text">최사라님이 000스터디에 가입신청을 하였습니다.</p>
                                                            <span className="date">2024-08-23 10:00</span>
                                                        </div>
                                                        <button className={"button linear"}>읽지않음</button>
                                                    </li>
                                                    <li className="alarm_item">
                                                        <div className="content">
                                                            <p className="text">최사라님이 000스터디에 가입신청을 하였습니다.</p>
                                                            <span className="date">2024-08-23 10:00</span>
                                                        </div>
                                                        <button className={"button"}>읽음</button>
                                                    </li>
                                                    <li className="alarm_item">
                                                        <div className="content">
                                                            <p className="text">최사라님이 000스터디에 가입신청을 하였습니다.</p>
                                                            <span className="date">2024-08-23 10:00</span>
                                                        </div>
                                                        <button className={"button"}>읽음</button>
                                                    </li>
                                                </ul>
                                            </div>
                                        }
                                    </> :
                                    <button className="button" onClick={() => navigate("/mypage")}>
                                        mypage
                                    </button>
                                }

                            </> :
                            <>
                                <button
                                    className={"button linear"}
                                    onClick={() => navigate('/login')}
                                >
                                    LOGIN
                                </button>
                            </>
                    }
                </div>
            </div>
        </header>
    );
};

export default Header;
