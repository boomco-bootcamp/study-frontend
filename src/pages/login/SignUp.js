// import { userRow } from '@/data/db/db'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from "../../components/common/Modal";
import {MODAL_INFO} from "../../util/const";

const SignUp = () => {
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        pw: "",
        email: ""
    });
    const [pwCheck, setPwCheck] = useState("");
    const [isModal, setIsModal] = useState(MODAL_INFO);

    const handleChangeInput = (e) => {
        console.log("handleChangeInput -> ", e.target.name, e.target.value)
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let message = "";
        // 빈값 체크
        let emptyCheck = 0;
        Object.keys(formData)?.map(key => (formData[key] === "") && emptyCheck++);
        if(pwCheck === "") emptyCheck++;
        // 아이디 한글 체크
        let koCheck = 0;
        const koreanRegex = /^[가-힣]+$/;
        (koreanRegex.test(formData.id)) && koCheck++;
        // 비밀번호 체크
        let passwordCheck = 0;
        (formData.pw !== pwCheck) && passwordCheck++;
        // 이메일 유효성 체크
        let emailCheck = 0;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        (!emailRegex.test(formData.email)) && emailCheck++;

        if(emptyCheck > 0) {
            setIsModal({
                status: true,
                message: "필수값을 확인하세요",
                handleConfirm: () => setIsModal(MODAL_INFO)
            });
            return;
        }
        if(koCheck > 0) {
            setIsModal({
                status: true,
                message: "아이디는 한국어만 입력 가능합니다.",
                handleConfirm: () => setIsModal(MODAL_INFO)
            });
            return;
        }
        if(passwordCheck > 0) {
            setIsModal({
                status: true,
                message: "비밀번호가 일치하지 않습니다.",
                handleConfirm: () => setIsModal(MODAL_INFO)
            });
            return;
        }
        if(emailCheck > 0) {
            setIsModal({
                status: true,
                message: "메일양식을 확인하세요",
                handleConfirm: () => setIsModal(MODAL_INFO)
            });
            return;
        }

        console.log("emptyCheck", emptyCheck, koCheck, emailCheck);
        console.log("등록가능", formData);
    }


    return (
        <div className='login_form'>
            <form className='flex-col flex-center signup_wrapper' onSubmit={handleSubmit}>
                <h1 className='signup_tit'>Sign Up</h1>
                <div className='input_wrap'>
                    <label htmlFor='id' className='form_label require'>아이디</label>
                    <input type='text' id='id' name='id' onChange={handleChangeInput} value={formData.id} placeholder='ID' className='form_input' />
                </div>
                <div className='input_wrap'>
                    <label htmlFor='name' className='form_label require'>이름</label>
                    <input type='text' id='name' name='name' onChange={handleChangeInput} value={formData.name} placeholder='Name' className='form_input' />
                </div>
                <div className='input_wrap'>
                    <label htmlFor='pw' className='form_label require'>비밀번호</label>
                    <input type='password' id='pw' name='pw' onChange={handleChangeInput} value={formData.pw} placeholder='Password' className='form_input' />
                </div>
                <div className='input_wrap'>
                    <label htmlFor='pw_re' className='form_label require'>비밀번호 확인</label>
                    <input type='password' id='pw_re' name='pw_re' onChange={e => setPwCheck(e.target.value)} value={pwCheck} placeholder='Password confirmation' className='form_input' />
                </div>
                <div className='input_wrap'>
                    <label htmlFor='email' className='form_label require'>이메일</label>
                    <input type='text' id='email' name='email' onChange={handleChangeInput} value={formData.email} placeholder='E-mail' className='form_input' />
                </div>
                <button type="submit" className="btn_submit">회원가입</button>
                <div className="link_wrap">
                    <Link to='/login'>이미 회원이세요?</Link>
                </div>
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

            {
                isModal.status &&
                <Modal
                    title={"회원가입에러"}
                    buttonList={[
                        { text: "확인", handleClick: isModal.handleConfirm, className: "confirm" }
                    ]}
                    className={"confirm_modal"}>
                    <div className="modal_message">
                        { isModal?.message }
                    </div>
                </Modal>
            }
        </div>
    )
}

export default SignUp
