import { useUser } from '../../context/UserContext';
import { getUserInfo } from '../../api/user';
import { postSignIn } from '../../api/auth';
import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Axios from "../../api/api";

const Login = () => {
    const navigate = useNavigate();
    const { user, login, logout } = useUser();
    const [formData, setFormData] = useState({
        id: "",
        pw: ""
    })

    const handleChangeInput = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSetUserInfo = () => {
        Axios.post(`/user/info`)
        .then(function (response) {
            const userInfo = response.data;
            login(userInfo);
            window.location.href = '/'
        })
        .catch(function (error) {
            console.log("error", error);
        })
    }

    const handleClickLogin = async (e) => {
        if(formData.id === "") alert("아이디를 입력하세요");
        if(formData.pw === "") alert("비밀번호를 입력하세요");

        if(formData.id && formData.pw) {
            await Axios.post(`/user/login`, {
                userId : formData.id,
                userPswd : formData.pw
            })
            .then(function (response) {
                localStorage.setItem("authToken", response.data);
                handleSetUserInfo();
            })
            .catch(function (error) {
                console.log("error", error);
                alert("아이디 혹은 비밀번호를 확인해주세요");
            })
        }
    }

    useEffect(() => {
        if(user?.userId) navigate("/");
    }, [user])

    return (
        <div className='login_form'>
            <div className='flex-col flex-center login_wrapper'>
                <h1 className='login_tit'>Login</h1>
                <div className='input_wrap'>
                    <label htmlFor='id' className='form_label'>아이디</label>
                    <input
                        type='text'
                        id='id'
                        name='id'
                        onChange={handleChangeInput}
                        onKeyPress={e => e.key === "Enter" && handleClickLogin}
                        value={formData.id}
                        placeholder='ID'
                        className='form_input'
                    />
                </div>
                <div className='input_wrap'>
                    <label htmlFor='pw' className='form_label'>비밀번호</label>
                    <input
                        type='password'
                        id='pw'
                        name='pw'
                        onChange={handleChangeInput}
                        onKeyPress={e => e.key === "Enter" && handleClickLogin}
                        value={formData.pw}
                        placeholder='Password'
                        className='form_input'
                    />
                </div>
                <ul className='login_menu'>
                    <li className='menu_item'>
                        <Link to='/findPw'>비밀번호 찾기</Link>
                    </li>
                    <li className='menu_item'>
                        <Link to='/signup'>회원가입</Link>
                    </li>
                </ul>
                <button type="button" className="btn_submit" onClick={handleClickLogin}>로그인</button>
                <div className='social_wrap'>
                    <div className='social_tit'>
                        <span className='tit_name'>소셜 로그인</span>
                    </div>
                    <ul className='social_menu'>
                        <li className='social_item'>
                            <button className='link kakao'>
                                <span className="visually-hidden">카카오로 로그인</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Login
