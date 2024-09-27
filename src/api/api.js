import axios from 'axios';

// Axios 인스턴스 생성
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // 환경 변수에서 API URL 가져오기
    timeout: 10000, // 요청 제한 시간 설정 (10초)
    headers: {
        'Content-Type': 'application/json', // 기본 헤더 설정
    },
});

// 요청 인터셉터 설정 (API 호출 전 공통 처리)
// api.interceptors.request.use(
//     (config) => {
//         // 토큰이 필요한 경우, 여기서 설정
//         const token = localStorage.getItem('token');
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// 응답 인터셉터 설정 (API 응답 후 공통 처리)
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // 에러 처리 (예: 401 Unauthorized 처리)
        // if (error.response && error.response.status === 401) {
        //     // 로그아웃 처리 또는 리다이렉트
        //     window.location.href = '/login';
        // }
        return Promise.reject(error);
    }
);

export default api;
