import {useEffect, useState} from 'react';
import {useUser} from "../../context/UserContext";
import Layout from "../../components/layout/Layout";
import {Link, useNavigate} from "react-router-dom";

const Account = () => {
    const navigate = useNavigate();
    const {user} = useUser();

    const [formData, setFormData] = useState({
        id: "",
        pw: "",
        em: "",
        name: ""
    });
    const [pwCheck, setPwCheck] = useState("");

    const handleChangeInput = (e) => {
        setFormData({
            [e.target.name]: e.target.value
        })
    }

    const handleUpdate = () => {
        // 이름, 비밀번호, 비밀번호확인 빈값 확인
        if(formData.name === "" || formData.pw === "" || pwCheck === "") {
            alert("값을 입력하세요!");
            return false;
        }
        // 비밀번호와 비밀번호확인값이 같은지 확인
        if(formData.pw !== pwCheck) {
            alert("비밀번호값이 일치하지 않습니다.");
            return false;
        }

        console.log("회원정보 api 호출")
    }

    useEffect(() => {
        if(user?.userId) setFormData({
            ...formData,
            id: user.userId,
            em: user?.email ?? "",
            name: user?.name
        })
    }, [user])

    return(
        <Layout>
            <div className={"page_wrap account_page default_width"}>
                <div className='login_form'>
                    <div className='flex-col flex-center signup_wrapper'>
                        <h1 className='signup_tit'>회원정보 수정</h1>
                        <div className='input_wrap'>
                            <label htmlFor='id' className='form_label'>아이디</label>
                            <input type='text' id='id' name='id' defaultValue={formData.id} placeholder='ID' className='form_input' readOnly={true}/>
                        </div>
                        <div className='input_wrap'>
                            <label htmlFor='name' className='form_label'>이름</label>
                            <input type='text' id='name' name='이름' onChange={handleChangeInput} value={formData.name} placeholder='Name' className='form_input' />
                        </div>
                        <div className='input_wrap'>
                            <label htmlFor='pw' className='form_label'>새로운 비밀번호</label>
                            <input type='password' id='pw' name='pw' onChange={handleChangeInput} value={formData.pw} placeholder='Password' className='form_input' />
                        </div>
                        <div className='input_wrap'>
                            <label htmlFor='pw_re' className='form_label'>비밀번호 확인</label>
                            <input type='password' id='pw_re' name='pw_re' onChange={e=>setPwCheck(e.target.value)} value={pwCheck} placeholder='Password confirmation' className='form_input' />
                        </div>
                        <div className='input_wrap'>
                            <label htmlFor='email' className='form_label'>이메일</label>
                            <input type='text' id='email' name='email' onChange={handleChangeInput} value={formData.em} placeholder='E-mail' className='form_input' />
                        </div>
                        <div className="button_group">
                            <button type="submit" className="button linear" onClick={() => navigate(-1)}>취소</button>
                            <button type="submit" className="button" onClick={handleUpdate}>수정</button>
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Account
