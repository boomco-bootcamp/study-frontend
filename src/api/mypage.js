import Axios from "./api";

// 관심 스터디 목록 조회
export const getLikeStudyList = async () => {
    return await Axios.get(
        `/my/like/list`,
    );
};

// 가입 스터디 목록 조회
export const getAppliedStudyList = async () => {
    return await Axios.get(
        `/my/member/list`,
    );
};

// 관심 카테고리 목록 조회
export const getLikeCategoryList = async () => {
    return await Axios.get(
        '/my/category/list'
    )
}

// 관심 태그 목록 조회
export const getLikeTagList = async () => {
    return await Axios.get(
        '/my/tag/list'
    )
}

// 관심 카테고리 추가 / 삭제
export const saveLikeCategory = async (body) => {
    return await Axios.post('/my/category/save', body)
}

// 관심 태그 추가
export const addMyTag = async (body) => {
    return await Axios.post('/my/tag/add', body)
}

// 관심 태그 삭제
export const deleteMyTag = async (body) => {
    return await Axios.post('/my/tag/delete', body)
}


