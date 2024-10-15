import axios from 'axios';

// Axios 인스턴스 생성
const Axios = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // 환경 변수에서 API URL 가져오기
    timeout: 10000, // 요청 제한 시간 설정 (10초)
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    },
    withCredentials: false,
});

Axios.interceptors.request.use(
    (config) => {
        // 로컬 스토리지에서 토큰을 가져옴
        const token = localStorage.getItem('authToken');

        // 토큰이 있으면 Authorization 헤더에 추가
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        alert('로그인이 만료되었습니다. 다시 로그인해주세요.')
        localStorage.removeItem('authToken')
        localStorage.removeItem('userInfo')
        return Promise.reject(error);

    }
);

export default Axios;
