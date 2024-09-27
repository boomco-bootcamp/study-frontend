import { useUser } from '../../context/UserContext';
import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'

// 일반회원 테스트 계정
// {
//     name: "최지훈",
//         userId: "choijh83",
//     userIdx: 321321,
//     loginStatus: true,
//     type: "user"
// }

// 관리자 테스트 계정
// {
//     name: "관리자",
//         userId: "admin",
//     userIdx: 100001,
//     loginStatus: true,
//     type: "admin"
// }

const Login = () => {
    const navigate = useNavigate();
    const { user, login, logout } = useUser();
    const [formData, setFormData] = useState({
        id: "",
        pw: ""
    })

    const handleChangeInput = (e) => {
        setFormData({
            [e.target.name]: e.target.value
        })
    }

    const handleClickLogin = (e) => {
        e.preventDefault();
        setFormData({
            id: "test",
            pw: "test123"
        })
    }

    useEffect(() => {
        if(user?.userId) navigate("/");
    }, [user])

    return (
        <div className='login_form'>
            <form className='flex-col flex-center login_wrapper' onSubmit={handleClickLogin}>
                <h1 className='login_tit'>Login</h1>
                <div className='input_wrap'>
                    <label htmlFor='id' className='form_label'>아이디</label>
                    <input type='text' id='id' name='id' onChange={handleChangeInput} value={formData.id} placeholder='ID' className='form_input' />
                </div>
                <div className='input_wrap'>
                    <label htmlFor='pw' className='form_label'>비밀번호</label>
                    <input type='password' id='pw' name='pw' onChange={handleChangeInput} value={formData.pw} placeholder='Password' className='form_input' />
                </div>
                <ul className='login_menu'>
                    <li className='menu_item'>
                        <Link to='/findPw'>비밀번호 찾기</Link>
                    </li>
                    <li className='menu_item'>
                        <Link to='/signup'>회원가입</Link>
                    </li>
                </ul>
                <button type="submit" className="btn_submit"
                        onClick={() => login({
                            name: "최지훈",
                            userId: "choijh83",
                            userIdx: 321321,
                            loginStatus: true,
                            type: "user"
                        })}
                >
                    로그인
                </button>
                <button type="submit" className="btn_submit"
                        onClick={() => login({
                            name: "관리자",
                            userId: "admin",
                            userIdx: 100001,
                            loginStatus: true,
                            type: "admin"
                        })}
                >
                    로그인-admin
                </button>
                <div className='social_wrap'>
                    <div className='social_tit'>
                        <span className='tit_name'>소셜 로그인</span>
                    </div>
                    <ul className='social_menu'>
                        {/*<li className='social_item'>*/}
                        {/*    <button  className='link google'>*/}
                        {/*        <span className="visually-hidden">구글로 로그인</span>*/}
                        {/*    </button>*/}
                        {/*</li>*/}
                        <li className='social_item'>
                            <button className='link kakao'>
                                <span className="visually-hidden">카카오로 로그인</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </form>
        </div>
    )
}

export default Login
