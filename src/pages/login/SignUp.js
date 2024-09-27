// import { userRow } from '@/data/db/db'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
    const [formData, setFormData] = useState({
        id: "",
        pw: "",
        em: ""
    })

    const handleChangeInput = (e) => {
        setFormData({
            [e.target.name]: e.target.value
        })
    }

    const handleClickSign = () => {
        // userRow.find()
    }

    return (
        <div className='login_form'>
            <form className='flex-col flex-center signup_wrapper'>
                <h1 className='signup_tit'>Sign Up</h1>
                <div className='input_wrap'>
                    <label htmlFor='id' className='form_label'>아이디</label>
                    <input type='text' id='id' name='id' onChange={handleChangeInput} value={formData.id} placeholder='ID' className='form_input' />
                </div>
                <div className='input_wrap'>
                    <label htmlFor='name' className='form_label'>이름</label>
                    <input type='text' id='name' name='이름' onChange={handleChangeInput} value={formData.id} placeholder='Name' className='form_input' />
                </div>
                <div className='input_wrap'>
                    <label htmlFor='pw' className='form_label'>비밀번호</label>
                    <input type='password' id='pw' name='pw' onChange={handleChangeInput} value={formData.pw} placeholder='Password' className='form_input' />
                </div>
                <div className='input_wrap'>
                    <label htmlFor='pw_re' className='form_label'>비밀번호 확인</label>
                    <input type='password' id='pw_re' name='pw_re' onChange={handleChangeInput} value={formData.pw} placeholder='Password confirmation' className='form_input' />
                </div>
                <div className='input_wrap'>
                    <label htmlFor='email' className='form_label'>이메일</label>
                    <input type='text' id='email' name='email' onChange={handleChangeInput} value={formData.em} placeholder='E-mail' className='form_input' />
                </div>
                <button type="submit" className="btn_submit">회원가입</button>
                <div className='social_wrap'>
                    <div className='social_tit'>
                        <span className='tit_name'>소셜 회원가입</span>
                    </div>
                    <ul className='social_menu'>
                        {/*<li className='social_item'>*/}
                        {/*    <Link to='/' className='link google'>*/}
                        {/*        <span className="visually-hidden">구글로 회원가입</span>*/}
                        {/*    </Link>*/}
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

export default SignUp
