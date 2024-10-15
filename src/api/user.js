import Axios from "./api";

// user 정보 가져오기
export const getUserInfo = async () => {
    return await Axios.post(
        `/user/info`,
    );
};

// user 수정하기
export const updateUserInfo = async (userData) => {
    return await Axios.post(
        `/user/update`,

        userData

    );
};

// 관심 카테고리 리스트 가져오기
export const getListByCategory = async () => {
    return await Axios.get(`/my/category/list`)

};

// 관심 카테고리 수정
export const postMyCategory = async (blogPostCatId) => {
    return await Axios.post(
        `/my/category/save`,
        {
            blogPostCatId
        }
    );
};

// 관심 태그 리스트 가져오기
export const getListByTag = async () => {
    return await Axios.get(`/my/tag/list`)

};

// 관심 태그 추가
export const postMyTag = async (blogLikeTagCon) => {
    return await Axios.post(
        `/my/tag/add`,
        {
            blogLikeTagCon
        }
    );
};


// 관심 태그 삭제
export const deleteMyTag = async (blogLikeTagId) => {
    return await Axios.post(
        `/my/tag/delete`,
        {
            blogLikeTagId
        }
    );
};

export const getCurrentComments = async () => {
    return await Axios.get(`/my/post/comment/list`)

};


// 좋아요 리스트
export const getListByLike = async () => {
    return await (
        await Axios.get(`/my/post/like/list`)
    )
};



// 카카오 로그인
export const postKakaoLogin = async (code) => {
    return await Axios.post(
        `/user/login/kakao`,
        {
            code
        }
    );
};

// 카카오 로그아웃
export const postKakaoLogout = async (code) => {
    return await Axios.post(
        `/user/logout/kakao`,
        {
            code
        }
    );
};