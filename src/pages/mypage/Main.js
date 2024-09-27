import React, {useEffect, useState} from 'react';
import Layout from "../../components/layout/Layout";
import {likeCategoryList, likeTagList, appliedStudyList, likeStudyList} from "../../data/mypage";
import {categoryList} from "../../data/study";
import ListSection from "../../components/common/ListSection";
import StudyItem from "../../components/study/StudyItem";
import Badge from "../../components/common/Badge";
import {useNavigate} from "react-router-dom";
import {useUser} from "../../context/UserContext";
import ChipBox from "../../components/common/ChipBox";
import Modal from "../../components/common/Modal";

const Main = () => {

    const navigate = useNavigate();
    const {user} = useUser();

    const [allCategoryList, setAllCategoryList] = useState([]);
    const [likeCategoryData, setLikeCategoryData] = useState([]);
    const [likeTagData, setLikeTagData] = useState([]);
    const [appliedStudyData, setAppliedStudyData] = useState([]);
    const [likeStudyData, setLikeStudyData] = useState([]);
    // modal
    const [categoryModal, setCategoryModal] = useState(false);

    const handleAddCategory = () => {
        console.log("관심카티고리 저장 api 호출")
    }

    const handleCheckCategory = (e, item) => {
        const newData = allCategoryList?.map(cate => cate.id === item.id ? ({
            ...cate,
            isChecked: e.target.checked
        }): cate);
        setAllCategoryList(newData);
    }

    useEffect(() => {
        if(likeCategoryList) {
            // 관심 카테고리 목록
            setLikeCategoryData(likeCategoryList);
            // 전체 카테고리 목록
            if(categoryList) {
                const updatedCategoryList = categoryList.map(category => ({
                    ...category,
                    isChecked: likeCategoryList?.some(likedCategory => likedCategory.id === category.id)
                }));
                setAllCategoryList(updatedCategoryList)
            }

        }
        if(likeTagList) {
            const tagNewList = likeTagList.map((tag, idx) => ({id: `tag_${idx}`, title: tag}));
            setLikeTagData(tagNewList);
        }
        appliedStudyList && setAppliedStudyData(appliedStudyList)
        likeStudyList && setLikeStudyData(likeStudyList);
    }, [likeCategoryList, likeTagList, appliedStudyList, likeStudyList, categoryList])



    return (
        <Layout>
            <div className="page_wrap my_page default_width">
                <div className="welcome_message">
                    <p className="text"><b className="name">{user.name}</b>님 환영합니다!🤩</p>
                    <button className={"btn_account"} onClick={() => navigate("/account")}>계정정보 수정</button>
                </div>
                {/*신청한스터디목록*/}
                <section className="apply_study_section">
                    <ListSection title={"가입 스터디 현황"}>
                        {
                            appliedStudyData?.map((item, idx) => (
                                <div className="apply_study_item" key={idx}>
                                    <StudyItem
                                        data={item}
                                    />
                                    <div className="button_group">
                                    <span className={`badge ${item.applyStatus ? "ready": "proceeding"}`}>
                                        { item.applyStatus ? "가입완료": "승인대기" }
                                    </span>
                                        <button className="button linear" onClick={() => navigate(`/study/detail/${item.id}`)}>
                                            커뮤니티 바로가기
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </ListSection>
                </section>
                <div className={"category_tag_section"}>
                    {/*관심카테고리목록*/}
                    <section className={"like_category_section"}>
                        {
                            likeCategoryData &&
                            <ChipBox
                                title={"관심카테고리설정"}
                                type={"plus"}
                                mode={"edit"}
                                data={likeCategoryData}
                                setData={setLikeCategoryData}
                                handleAddCustom={() => setCategoryModal(true)}
                            />
                        }
                    </section>
                    {/*관심태그설정*/}
                    <section className={"like_tag_section"}>
                        {
                            likeTagData &&
                            <ChipBox
                                title={"관심태그설정"}
                                type={"input"}
                                mode={"edit"}
                                data={likeTagData}
                                setData={setLikeTagData}
                                placeholder={"관심태그를 입력하세요"}
                            />
                        }
                    </section>
                </div>

                {/*관심스터디목록*/}
                <section className={"like_study_section"}>
                    <ListSection title={"관심 스터디 현황"}>
                        {
                            likeStudyData?.map((item, idx) => (
                                <div className="like_study_item" key={idx}>
                                    <StudyItem
                                        data={item}
                                    />
                                    <div className="button_group">
                                        <button className="like">❤</button>
                                    </div>
                                </div>
                            ))
                        }
                    </ListSection>
                </section>
            </div>

            {/*관심 카테고리 팝업*/}
            {
                (categoryModal) &&
                <Modal
                    title={"관심 카테고리 설정"}
                    buttonList={[
                        { text: "취소", handleClick: () => setCategoryModal(false), className: "cancel" },
                        { text: "확인", handleClick: () => handleAddCategory(), className: "confirm" }
                    ]}
                    handleClose={() => setCategoryModal(false)}
                    className={"category_setting_popup"}
                >
                    <div className="category_list">
                        {
                            allCategoryList?.map((item, idx) => (
                                <div className="category_item" key={item.id + idx}>
                                    <label className={"checkbox"}>
                                        <input type="checkbox" checked={item?.isChecked} onChange={e => handleCheckCategory(e, item)}/>
                                        <span>{item.title}</span>
                                    </label>
                                </div>
                            ))
                        }
                    </div>
                </Modal>
            }

        </Layout>
    );
};

export default Main;
