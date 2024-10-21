import Axios from "./api";

// 관심 스터디 목록 조회
export const deleteStudyLike = async (body) => {
    return await Axios.post(`/like/delete`, body);
};


