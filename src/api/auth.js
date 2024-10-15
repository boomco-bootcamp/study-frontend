import Axios from "./api";


// 로그인
export const postSignIn = async (loginData) => {
    return await Axios.post('/user/login', {
        ...loginData
    });
};

// 로그아웃
export const postSignOut = async () => {
    return (await Axios.get('/auth/logout'));
};

// 비밀번호 찾기
export const postFindPassword = async (mail) => {
    return await Axios.post('/auth/password/find', {
        mail
    });
};

// 회원가입
export const postSignUp = async (signData) => {
    return await Axios.post('/user/add', {
        ...signData
    });
};

