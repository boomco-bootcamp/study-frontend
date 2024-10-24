import React, {useEffect, useState} from 'react';
import Layout from "../../components/layout/Layout";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useUser} from "../../context/UserContext";
import {COMMUNITY_TYPE, MODAL_INFO} from "../../util/const";
import Reply from "../../components/common/Reply";
import Axios from "../../api/api";
import dayjs from "dayjs";
import Modal from "../../components/common/Modal";

const Detail = () => {

    const {user} = useUser();
    const {commId} = useParams();
    const location = useLocation();
    const { stdyId } = location?.state || {};

    const navigate = useNavigate();

    // 공통
    const [isModal, setIsModal] = useState(MODAL_INFO);

    // 게시글
    const [data, setData] = useState(null);
    const [prevData, setPrevData] = useState(null);
    const [nextData, setNextData] = useState(null);

    // 댓글
    const [replyData, setReplyData] = useState([]);
    const [replyPage, setReplyPage] = useState({});


    // 게시글
    const handleGetData = async () => {
        await Axios.get(`/community/detail?stdyComtId=${commId}`, )
            .then(function (response) {
                setData(response.data);
            })
            .catch(function (error) {
                console.log("error", error);
            })
    }

    // 댓글 목록 불러오기
    const handleGetReplyData = async () => {
        await Axios.get(`/comment/community/list?stdyComtId=${commId}`, )
            .then(function (response) {
                const newData = response.data?.list?.map(item => {
                    const updatedItem = {
                        ...item,
                        isEdit: false,
                    };
                    if (item.stdyChildComCommentList) {
                        updatedItem.stdyChildComCommentList = item.stdyChildComCommentList.map(subItem => ({
                            ...subItem,
                            isEdit: false,
                        }));
                    }
                    return updatedItem;
                });

                setReplyData(newData);
                setReplyPage({
                    endPage: response.data?.endPage,
                    next: response.data?.next,
                    page: response.data?.page,
                    prev: response.data?.prev,
                    record: response.data?.record,
                    startPage: response.data?.startPage,
                    total: response.data?.total,
                    totalPage: response.data?.totalPage,
                })
            })
            .catch(function (error) {
                console.log("error", error);
            })
    }
    // 댓글 등록
    const handleWriteReplyData = async (content, id=null) => {
        if(content === "") {
            // @todo modal 로 변경
            alert("글을 입력하세요!");
        } else {
            let postData = {
                stdyComtId: commId,
                stdyComCommentCon: content
            }
            if(id) {
                postData = {
                    ...postData,
                    stdyParentComCommentId: id
                }
            }

            await Axios.post(`/comment/community/save`, postData)
                .then(function (response) {
                    handleGetReplyData();
                })
                .catch(function (error) {
                    console.log("error", error);
                })
        }
    }
    // 댓글 삭제
    const handleDeleteData = async (id) => {
        await Axios.post(`/comment/community/delete`, {
            stdyComCommentId: id
        })
        .then(function (response) {
            handleGetReplyData();
            setIsModal(MODAL_INFO);
        })
        .catch(function (error) {
            console.log("error", error);
        })
    }


    // 수정모드
    // @Param type= edit(수정모드)
    const handleChangeMode = (targetId, type="edit") => {
        if(type === "edit") {
            const updateList = replyData?.map(item => (item.stdyComCommentId === targetId) ? ({
                ...item,
                isEdit: !item.isEdit
            }): item);
            setReplyData(updateList);
        }
    }

    // 대댓글 수정 모드
    const handleChangeReplyMode = (parentId, targetId) => {
        const updateData = replyData?.map(item => {
            // 부모의 데이터 값이 일치하는지 확인
            if (item.stdyComCommentId === parentId) {
                if (item.stdyChildComCommentList) {
                    const updatedList = item.stdyChildComCommentList.map(subItem => {
                        if (subItem.stdyComCommentId === targetId) {
                            return { ...subItem, isEdit: !subItem.isEdit };
                        }
                        return subItem;
                    });

                    return { ...item, stdyChildComCommentList: updatedList };
                }
            }
            return item;
        });
        setReplyData(updateData);
    }


    //@INFO 내용 세팅
    useEffect(() => {
        if(commId) {
            handleGetData();
            handleGetReplyData();
        }
    }, [commId]);


    return (
        <Layout>
            {
                data &&
                <div className={"page_wrap comm_detail_page detail_page default_width"}>
                    {/*content_section start*/}
                    <section className={"content_section"}>
                        <div className="content_header_wrap">
                            <h3 className={"title"}>
                                <b className={"type"}>[{COMMUNITY_TYPE[`${data.stdyComSt}`]}]</b>
                                { data.stdyComTitle }
                            </h3>
                        </div>
                        <div className="info_wrap">
                            <div className="left_section">
                                <p className="writer">{data?.amnnUserId}</p>
                                <div className="sub_info_wrap">
                                    <span>작성일: {data?.amnnTs && dayjs(data.amnnTs).format("YYYY-MM-DD HH:mm")}</span>
                                </div>
                            </div>
                            {
                                (user.userId === data?.rgsnUserId) &&
                                <div className="right_section">
                                    <button className="button linear" onClick={() => navigate(`/community/write/${commId}`, {state: {stdyId: stdyId}})}>수정</button>
                                    <button className="button">삭제</button>
                                </div>
                            }
                        </div>
                        <div className="content_wrap">
                            { data?.stdyComCon }
                        </div>
                        <div className="button_group">
                            <button
                                onClick={() => navigate(`/community/detail/${prevData.id}`, {state: {stdyId: stdyId}})}
                                className={"button linear"}
                                disabled={!prevData}
                            >
                                ←&nbsp;&nbsp;이전글
                            </button>
                            <button
                                className={"button linear"}
                                onClick={() => navigate(`/community/${stdyId}`)}
                            >
                                목록
                            </button>
                            <button
                                className={"button linear"}
                                onClick={() => navigate(`/community/detail/${nextData.id}`, {state: {stdyId: stdyId}})}
                                disabled={!nextData}
                            >
                                다음글&nbsp;&nbsp;→
                            </button>
                        </div>
                        {
                            replyData &&
                            <Reply
                                data={replyData}
                                user={user}
                                handleChangeMode={handleChangeMode}
                                handleChangeReplyMode={handleChangeReplyMode}
                                parentId={commId}
                                handleGetList={handleGetReplyData}
                                handleWrite={handleWriteReplyData}
                                handleDelete={(id) => setIsModal({
                                    status: true,
                                    message: "해당 스터디를 삭제하시겠습니까?",
                                    buttonList: [
                                        { text: "취소", handleClick: () => setIsModal(MODAL_INFO), className: "cancel" },
                                        { text: "확인", handleClick: () => handleDeleteData(id), className: "confirm" }
                                    ],
                                })}
                            />
                        }
                    </section>
                    {/*content_section end*/}
                    {/*participant_section start*/}
                    <section className="participant_section">
                        <div className="participants_list_wrap">
                            <p className="label">참여인원 {(data?.memberList?.length - 1) ?? 0}명</p>
                            <div className="participants_list">
                                {
                                    data?.memberList?.filter(member => member.userId !== user.userId)?.map((item, idx) => (
                                        <span className={"participant"}>{item.userNm}</span>
                                    ))
                                }
                                {
                                    (data?.memberList?.filter(member => member.userId !== user.userId)?.length <= 0) &&
                                    <p>신청한 회원이 없습니다.</p>
                                }
                            </div>
                        </div>
                    </section>
                    {/*participant_section end*/}
                </div>
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

export default Detail;
