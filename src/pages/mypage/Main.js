import React, {useEffect, useRef, useState} from 'react';
import Layout from "../../components/layout/Layout";
import ListSection from "../../components/common/ListSection";
import StudyItem from "../../components/study/StudyItem";
import {
    getAppliedStudyList,
    getLikeCategoryList,
    getLikeTagList,
    getLikeStudyList,
    saveLikeCategory, addMyTag, deleteMyTag
} from '../../api/mypage';
import {deleteStudyLike} from '../../api/like'
import { getAllCategoryList } from '../../api/category'
import {useNavigate} from "react-router-dom";
import {useUser} from "../../context/UserContext";
import ChipBox from "../../components/common/ChipBox";
import Modal from "../../components/common/Modal";

const Main = () => {

    const navigate = useNavigate();
    const {user} = useUser();

    const [allCategoryList, setAllCategoryList] = useState([]);
    const [allCategoryData, setAllCategoryData] = useState([]);

    const [likeCategoryList, setLikeCategoryList] = useState([]);
    const [likeCategoryData, setLikeCategoryData] = useState([]);

    const [likeTagList, setLikeTagList] = useState([]);
    const [likeTagData, setLikeTagData] = useState([]);

    const [appliedStudyList, setAppliedStudyList] = useState([]);
    const [appliedStudyData, setAppliedStudyData] = useState([]);

    const [likeStudyList, setLikeStudyList] = useState([])
    const [likeStudyData, setLikeStudyData] = useState([]);

    // modal
    const [categoryModal, setCategoryModal] = useState(false);
    const [tagModal, setTagModal] = useState(false);


    // 관심 스터디
    const addCategory = async (param) => {
        await saveLikeCategory({ stdyCatId : param });
    }

    const deleteLike = async (param) => {
        await deleteStudyLike({stdyId : param})
        setLikeStudyList((await getLikeStudyList()).data.list)
    }

    // 관심 태그설정
    const addTag = async (param) => {
        await addMyTag({stdyLikeTagCon : param});
        setLikeTagList((await getLikeTagList()).data);
    }

    const deleteTag = async (param) => {
        await deleteMyTag({stdyLikeTagId : param});
        setLikeTagList((await getLikeTagList()).data);
    }

    // 관심 카테고리 설정
    const handleCheckCategory = (e, item) => {
        addCategory(item.stdyCatId)
        categorySaveRef.current = true
        const newData = allCategoryData?.map(cate => cate.id === item.id ? ({
            ...cate,
            isChecked: e.target.checked
        }): cate);
        setAllCategoryData(newData);
    }

    useEffect( () => {
        const fetchData = async () => {
            setAppliedStudyList((await getAppliedStudyList()).data.list)
            setLikeCategoryList((await getLikeCategoryList()).data);
            setLikeTagList((await getLikeTagList()).data);
            setLikeStudyList((await getLikeStudyList()).data.list)
            setAllCategoryList((await getAllCategoryList()).data)
        };
        fetchData();
    }, [])

    useEffect(() => {
        if(likeCategoryList) {
            // 관심 카테고리 목록
            likeCategoryList && setLikeCategoryData(likeCategoryList);
            // 전체 카테고리 목록
            if(allCategoryList && allCategoryList.length > 0) {
                const updatedCategoryList = allCategoryList.map(category => ({
                    ...category,
                    isChecked: likeCategoryList?.some(likedCategory => likedCategory.id === category.id)
                }));
                setAllCategoryData(updatedCategoryList)
            }
        }
        if(likeTagList) {
            const tagNewList = likeTagList.map((tag, idx) => ({id: tag.stdyLikeTagId, title: tag.stdyLikeTagCon}));
            setLikeTagData(tagNewList);
        }
        appliedStudyList && setAppliedStudyData(appliedStudyList)
        likeStudyList && setLikeStudyData(likeStudyList);

    }, [likeCategoryList, likeTagList, appliedStudyList, likeStudyList, allCategoryList])


    // 관심 카테고리 설정 모달(categoryModal) false 시, 관심 카테고리 재 조회
    const categorySaveRef = useRef(false);
    const funcLikeCategoryList = async () => {
        setLikeCategoryList((await getLikeCategoryList()).data);
    }
    useEffect(() => {
        if(categorySaveRef.current) {
            categorySaveRef.current = false;
            funcLikeCategoryList()
        }
    }, [categoryModal])

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
                            appliedStudyData.length > 0 ?
                                appliedStudyData.map((item, idx) => (
                                    <div className="apply_study_item" key={idx}>
                                        <StudyItem
                                            data={item}
                                        />
                                        <div className="button_group">
                                        <span className={`badge ${item.stdyMemberYn === 'N' ? "ready" : "proceeding"}`}>
                                            {item.stdyMemberYn === 'N' ? "승인대기" : "가입완료"}
                                        </span>
                                            <button className="button linear"
                                                    onClick={() => navigate(`/community/${item.stdyId}`)}>
                                                커뮤니티 바로가기
                                            </button>
                                        </div>
                                    </div>
                                ))
                                : <div className="apply_study_item" style={{placeContent:'center'}}>
                                    <div style={{padding:'50px'}}>가입된 스터디가 존재하지 않습니다.</div>
                                </div>
                        }
                    </ListSection>
                </section>
                <div className={"category_tag_section"}>
                    {/*관심카테고리목록*/}
                    <section className={"like_category_section"}>{
                        likeCategoryData &&
                        <ChipBox
                            title={"관심 카테고리 설정"}
                            type={"plus"}
                            mode={"edit"}
                            data={likeCategoryData}
                            setData={setLikeCategoryData}
                            handleDelete={() => setCategoryModal(true)}
                            handleAddCustom={() => setCategoryModal(true)}
                            nodataMessage={"등록한 관심 카테고리가 존재하지 않습니다."}
                        />
                    }
                    </section>
                    {/*관심 태그설정*/}
                    <section className={"like_tag_section"}>
                        {
                            likeTagData &&
                            <ChipBox
                                title={"관심 태그설정"}
                                type={"input"}
                                mode={"edit"}
                                data={likeTagData}
                                setData={setLikeTagData}
                                placeholder={"관심 태그를 입력하세요"}
                                handleDelete={(param) => deleteTag(param)}
                                handleAddCustom={() => setTagModal(true)}
                                handleSetData={(param) => addTag(param)}
                                nodataMessage={"등록한 관심 태그가 존재하지 않습니다."}
                            />
                        }
                    </section>
                </div>

                {/*관심스터디목록*/}
                <section className={"like_study_section"}>
                    <ListSection title={"관심 스터디 현황"}>
                        {
                            likeStudyData?.length > 0 ?
                                likeStudyData.map((item, idx) => (
                                    <div className="like_study_item" key={idx}>
                                        <StudyItem
                                            data={item}
                                        />
                                        <div className="button_group">
                                            <button className="like" onClick={() => deleteLike(item.stdyId)}>❤</button>
                                        </div>
                                    </div>
                                ))
                            : <div className="apply_study_item" style={{placeContent: 'center'}}>
                                <div style={{padding: '50px', textAlignLast: 'center'}}>등록한 관심 스터디가 존재하지 않습니다.</div>
                            </div>
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
                        /*{ text: "취소", handleClick: () => setCategoryModal(false), className: "cancel" },*/
                        { text: "확인", handleClick: () => setCategoryModal(false), className: "cancel" }
                    ]}
                    handleClose={() =>
                        setCategoryModal(false)
                    }
                    className={"category_setting_popup"}
                >
                    <div className="category_list">
                        {
                            allCategoryData?.map((item, idx) => (
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
            {/*관심 태그 팝업*/}
            {
                (tagModal) &&
                <Modal
                    title={"관심 태그 설정"}
                    buttonList={[
                        {text: "취소", handleClick: () => setTagModal(false), className: "cancel"},
                        // {text: "확인", handleClick: () => handleAddCategory(), className: "confirm"}
                    ]}
                    handleClose={() => setTagModal(false)}
                    className={"category_setting_popup"}
                >
                    <div className="category_list">

                    </div>
                </Modal>
            }
        </Layout>
    );
};

export default Main;
