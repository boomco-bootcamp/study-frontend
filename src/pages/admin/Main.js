import React, {useEffect, useState} from 'react';
import {useUser} from "../../context/UserContext";
import Layout from "../../components/layout/Layout";
import ChipBox from "../../components/common/ChipBox";
import {categoryList} from "../../data/study";
import {adminStudyList} from "../../data/mypage";
import StudyItem from "../../components/study/StudyItem";
import ListSection from "../../components/common/ListSection";
import {useNavigate, Link} from "react-router-dom";
import Modal from "../../components/common/Modal";
import {PlusIcon} from "../../assets/icons/Icon";
import api from "../../api/api";

const Main = () => {
    const navigate = useNavigate();
    const { user } = useUser();

    const [categoryDataList, setCategoryDataList] = useState([]);
    const [adminStudyData, setAdminStudyData] = useState([]);
    // 팝업
    const [applyModal, setApplyModal] = useState({
        status: false,
        data: null
    });

    const handleApplyModal = (data) => {
        console.log("data -> ", data);
        setApplyModal({
            status: !applyModal.status,
            data: data
        });
    }

    const handleApplyConfirm = () => {

    }

    const customListHeader = () => {
        return(
            <div className={"list_section_header"}>
                <h3>가입 스터디 현황</h3>
                <Link to={"/study/write/new"}><PlusIcon/></Link>
            </div>
        )
    }

    // category
    const handleGetCategory = async () => {
        // 추후 검색 api 호출
        api.get(`/category/list/all`)
            .then(function (response) {
                const categorySelect = response.data.map((cat, index) => ({
                    id: cat.stdyCatId,
                    title: cat.stdyCatNm
                }));
                setCategoryDataList(categorySelect)
            })
            .catch(function (error) {
                console.log("error", error);
            })
    }
    const handleSetCategory = (data) => {
        api.post(`/category/save`, {
            stdyCatNm: data
        })
            .then( (response)  => {
                handleGetCategory();
            })
            .catch(function (error) {
                console.log("error", error);
            })
    }
    const handleDeleteCategory = (id) => {
        console.log("handleDeleteCategory -> ", id);
    }


    useEffect(() => {
        handleGetCategory();
        // (categoryList) &&setCategoryData(categoryList);
        (adminStudyList) && setAdminStudyData(adminStudyList);
    }, [])

    return (
        <Layout>
            <div className="page_wrap admin_page default_width">
                {/*카테고리 설정 */}
                <section className="category_setting_wrap">
                    <section className={"like_tag_section"}>
                        {
                            categoryDataList &&
                            <ChipBox
                                title={"카테고리 설정"}
                                type={"input"}
                                mode={"edit"}
                                data={categoryDataList}
                                handleSetData={handleSetCategory}
                                handleDelete={handleDeleteCategory}
                                placeholder={"관심태그를 입력하세요"}
                            />
                        }
                    </section>

                    {/*등록 스터디 현황*/}
                    <section className={"study_setting_wrap"}>
                        <ListSection
                            title={"가입 스터디 현황"}
                            customHeader={customListHeader}
                        >
                            {
                                adminStudyList?.map((item, idx) => (
                                    <div className="apply_study_item" key={idx}>
                                        <StudyItem data={item} />
                                        <div className="button_list">
                                            <button className={"button linear"} onClick={() => handleApplyModal(item.applyParticipants)}>
                                                승인대기 {
                                                    item?.applyParticipants?.filter(item => !item.applyStatus)?.length ?? 0
                                                }명
                                            </button>
                                           <div className="button_group">
                                               <button
                                                   onClick={() => navigate(`/study/write/${item.id}`)}
                                                   className={"button linear"}
                                               >
                                                   수정
                                               </button>
                                               <button
                                                   onClick={() => console.log("스터디 삭제")}
                                                   className={"button"}
                                               >
                                                   삭제
                                               </button>
                                           </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </ListSection>
                    </section>
                </section>
            </div>
            {
                (applyModal.status) &&
                <Modal
                    title={"관심 카테고리 설정"}
                    buttonList={[
                        { text: "취소", handleClick: () => setApplyModal({...applyModal, status: false}), className: "cancel" },
                        { text: "확인", handleClick: () => handleApplyConfirm(), className: "confirm" }
                    ]}
                    handleClose={() => setApplyModal({...applyModal, status: false})}
                    className={"apply_study_modal"}
                >
                    <div className="apply_participant_wrap">
                        {
                            (applyModal?.data?.length <= 0) &&
                            <div className="no_result">
                                신청중인 학생이 없습니다.
                            </div>
                        }
                        {
                            (applyModal?.data?.length > 0) &&
                            (
                                applyModal?.data?.map((item, idx) => (
                                    <div className={"apply_participant_item"}>
                                        <div className="name">{item.userName}</div>
                                        <div className="status">
                                            {item.applyStatus ? <span className={"badge proceeding"}>승인완료</span> : <span className={"badge ready"}>승인대기</span>}
                                        </div>
                                        {
                                            item.applyStatus ?
                                                <button className="button linear button_cancel">승인취소</button>:
                                                <button className="button button_confirm">승인</button>
                                        }
                                    </div>
                                ))
                            )
                        }
                    </div>
                </Modal>
            }
        </Layout>
    );
};



export default Main;
