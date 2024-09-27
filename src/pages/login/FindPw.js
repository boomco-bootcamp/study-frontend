// import { userRow } from '@/data/db/db'
import React, { useState } from 'react'

const FindPw = () => {
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
            <form className='flex-col flex-center password_wrapper'>
                <h1 className='signup_tit'>Find password</h1>
                <div className='input_wrap'>
                    <label htmlFor='email' className='form_label'>이메일</label>
                    <input type='text' id='email' name='email' onChange={handleChangeInput} value={formData.em} placeholder='E-mail' className='form_input' />
                </div>
                <button type="submit" className="btn_submit">변경 링크 전송하기</button>
            </form>
        </div>
    )
}

export default FindPw
