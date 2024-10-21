import Axios from "./api";

// 관심 스터디 목록 조회
export const getAllCategoryList = async () => {
    return await Axios.get(
        `/category/list/all`,
    );
};