import React, {useEffect, useState} from 'react';
import {useUser} from "../../context/UserContext";
import Layout from "../../components/layout/Layout";
import ChipBox from "../../components/common/ChipBox";
import StudyItem from "../../components/study/StudyItem";
import ListSection from "../../components/common/ListSection";
import {useNavigate, Link} from "react-router-dom";
import Modal from "../../components/common/Modal";
import {PlusIcon} from "../../assets/icons/Icon";
import Axios from "../../api/api";
import {MODAL_INFO} from "../../util/const";
import Paging from "../../components/common/Paging";

const Main = () => {
    const navigate = useNavigate();
    const { user } = useUser();

    // 공통
    const [isModal, setIsModal] = useState(MODAL_INFO);
    // 카테고리 데이터
    const [categoryDataList, setCategoryDataList] = useState([]);
    // 스터디 데이터
    const [studyList, setStudyList] = useState([]);
    const [paging, setPaging] = useState({
        endPage: 10,
        next: true,
        page: 1,
        prev: false,
        record: 5,
        startPage: 1,
        total: 2,
        totalPage: 20
    })
    // 팝업
    const [applyModal, setApplyModal] = useState({
        status: false,
        data: null
    });

    const handleApplyModal = () => {
        setApplyModal({
            status: !applyModal.status,
            data: []
        });
    }

    const handleApplyConfirm = () => {
        // @todo 현재 가입신청하면 바로 가입되서 중간단계 논의후 추가 개발 필요
        console.log("가입 승인 ")
    }

    const customListHeader = () => {
        return(
            <div className={"list_section_header"}>
                <h3>가입 스터디 현황</h3>
                <Link to={"/study/write/new"}><PlusIcon/></Link>
            </div>
        )
    }

    // study list
    const handleGetList = async (paging=null) => {
        // 추후 검색 api 호출
        Axios.get(`/study/list`, {
            params: {
                page: paging ?? paging?.page ?? 1,
            }
        })
            .then(function (response) {
                const data = response.data;
                setStudyList(data.list);
                setPaging({
                    endPage: data.endPage,
                    next: data.next,
                    page: data.page,
                    prev: data.prev,
                    record: data.record,
                    startPage: data.startPage,
                    total: data.total,
                    totalPage: data.totalPage
                })
            })
            .catch(function (error) {
                console.log("error", error);
            })

    }

    const handlePaging = async (param) => {
        if(paging.page !== param.page) {
            await handleGetList(param.page);
        }
    }


    const handleDelete = async (id) => {
        Axios.post(`/study/delete`, {stdyId: id})
            .then(function (response) {
                handleGetList();
                setIsModal(MODAL_INFO);
            })
            .catch(function (error) {
                console.log("error", error);
            })
    }

    // category
    const handleGetCategory = async () => {
        Axios.get(`/category/list/all`)
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
        Axios.post(`/category/save`, {
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
        //@ TODO 관련된 스터디를 어떻게 할지 논의후 추가개발 필요
        console.log("handleDeleteCategory -> ", id);
    }

    useEffect(() => {
        handleGetCategory();
        handleGetList();
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
                                studyList?.map((item, idx) => (
                                    <div className="apply_study_item" key={item.stdyId}>
                                        <StudyItem data={item} />
                                        <div className="button_list">
                                            <button className={"button linear"} onClick={handleApplyModal}>
                                                승인대기
                                                {item?.applyParticipants?.filter(item => !item.applyStatus)?.length ?? 0}
                                                명
                                            </button>
                                           <div className="button_group">
                                               <button
                                                   className={"button linear"}
                                                   onClick={() => navigate(`/study/write/${item.stdyId}`)}
                                               >
                                                   수정
                                               </button>
                                               <button
                                                   className={"button"}
                                                   // onClick={() => handleDelete(item.stdyId)}
                                                   onClick={() => setIsModal({
                                                       status: true,
                                                       message: "해당 스터디를 삭제하시겠습니까?",
                                                       buttonList: [
                                                           { text: "취소", handleClick: () => setIsModal(MODAL_INFO), className: "cancel" },
                                                           { text: "확인", handleClick: () => handleDelete(item.stdyId), className: "confirm" }
                                                       ],
                                                   })}
                                               >
                                                   삭제
                                               </button>
                                           </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </ListSection>
                        <Paging pagingData={paging} handlePaging={handlePaging} />
                    </section>
                </section>
            </div>
            {
                (applyModal.status) &&
                <Modal
                    title={"스터디 가입 현황"}
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

            {
                isModal.status &&
                <Modal
                    title={""}
                    buttonList={isModal?.buttonList}
                    handleClose={isModal?.handleCancel}
                    className={"confirm_modal"}>
                    <div className="modal_message">
                        { isModal?.message }
                    </div>
                </Modal>
            }

        </Layout>
    );
};



export default Main;
