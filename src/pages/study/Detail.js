import React, {useState, useEffect} from 'react';
import Layout from "../../components/layout/Layout";
import {useNavigate, useParams} from "react-router-dom";
import {studyList, studyReplyList} from "../../data/study";
import Reply from "../../components/common/Reply";
import {useUser} from "../../context/UserContext";
import Badge from "../../components/common/Badge";
import {MODAL_INFO, STATUS_DATA} from "../../util/const";
import api from "../../api/api";
import {format} from "date-fns";
import Modal from "../../components/common/Modal";

const Detail = () => {

    const navigate = useNavigate();

    const {user} = useUser();
    const {id} = useParams();

    const [contentData, setContentData] = useState({});
    const [replyData, setReplyData] = useState({});

    const [isConfirmModal, setIsConfirmModal] = useState(MODAL_INFO);

    //
    const handleGetDetail = () => {
        api.get(`/study/detail`, {
            params: {
                stdyId: id,
            }
        })
        .then(function (response) {
            setContentData(response.data);
        })
        .catch(function (error) {
            console.log("error", error);
        })
    }

    // 스터디신청하기 핸들러
    const handleApply = () => {
        console.log("신청하기 핸들러")
    }

    // 수정모드
    const handleChangeMode = (targetId) => {
        const editModeData = replyData.replyList.map(item => item.idx === targetId ? ({
            ...item,
            isEdit: !item.isEdit
        }) : item);
        setReplyData({
            ...replyData,
            replyList: editModeData
        });
    }


    //@INFO 내용 세팅
    useEffect(() => {
        if(id) {
            // console.log("Detail -> ", id)
            // const targetData = studyList.filter(item => item.id === parseInt(id));
            // if(targetData?.length > 0) setContentData(targetData[0]);
            handleGetDetail()
        }
    }, [id])

    //@INFO reply 내용 가져요기
    useEffect(() => {
        if(studyReplyList && id) {
            const replyData = studyReplyList.filter(item => item.id === parseInt(id));
            if(replyData?.length > 0) {
                const newData = replyData[0]?.replyList?.map(item => ({
                    ...item,
                    isEdit: false
                }))
                setReplyData({
                    ...replyData[0],
                    replyList: newData
                });
            } else {
                setReplyData([]);
            }
        }
    }, [studyReplyList, id])



    return (
        <Layout>
            {
                contentData &&
                <div className={"page_wrap study_detail_page detail_page default_width"}>
                    {/*content_section start*/}
                    <section className={"content_section"}>
                        <div className="content_header_wrap">
                            <h3 className={"title"}>
                                <Badge
                                    className={contentData.stdySt}
                                    text={STATUS_DATA[`${contentData.stdySt}`]}
                                />
                                { contentData?.stdyNm }
                            </h3>
                            <button className="like">♡ {contentData?.stdyLikeCnt ?? 0}</button>
                        </div>
                        <div className="info_wrap">
                            <p className="writer">{contentData?.rgsnUserNm ?? "글쓴이"}</p>
                            <div className="sub_info_wrap">
                                {
                                    (contentData?.rgsnTs) &&
                                    <span>작성일: {format(contentData?.rgsnTs, "yyyy-MM-dd mm:ss")}</span>
                                }
                                <span>조회수: {contentData?.stdyViewsCnt ?? 0}</span>
                            </div>
                        </div>
                        <div className="content_wrap">
                            { contentData?.stdyCon ?? "-" }
                        </div>
                        <div className="tag_list_wrap">
                            {
                                contentData.tagList?.map((tag, idx) => (
                                    <span className={"tag"} key={tag?.stdyTagId}>
                                        {tag?.stdyTagCon}
                                    </span>
                                ))
                            }
                        </div>
                        <div className="participants_list_wrap">
                            <p className="label">참여인원 {contentData?.memberList?.length ?? 0}명</p>
                            <div className="participants_list">
                                {
                                    (contentData?.memberList?.length <= 0) &&
                                    <span>참여인원이 없습니다.</span>
                                }
                                {
                                    contentData?.memberList?.map((item, idx) => (
                                        <span className={"participant"}>{item.userName}</span>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="button_group">
                            <button
                                onClick={() => navigate(`/study/detail/${contentData?.previousStdyId}`)}
                                className={"button linear"}
                                disabled={!contentData?.previousStdyId}
                            >
                                ←&nbsp;&nbsp;이전글
                            </button>
                            <button
                                className={"button linear"}
                                onClick={() => navigate("/study")}
                            >
                                목록
                            </button>
                            <button
                                className={"button linear"}
                                onClick={() => navigate(`/study/detail/${contentData?.nextStdyId}`)}
                                disabled={!contentData?.nextStdyId}
                            >
                                다음글&nbsp;&nbsp;→
                            </button>
                        </div>
                        {/*{*/}
                        {/*    replyData &&*/}
                        {/*    <Reply*/}
                        {/*        data={replyData}*/}
                        {/*        user={user}*/}
                        {/*        handleChangeMode={handleChangeMode}*/}
                        {/*    />*/}
                        {/*}*/}
                    </section>
                    {/*content_section end*/}
                    {/*apply_section start*/}
                    <section className={"apply_section"}>
                        {
                            (user?.userId) ?
                            (contentData?.participants?.filter(item => item.userId === user.userId)?.length > 0) ?
                                <>
                                    <p className={"main_text"}>신청된 스터디입니다. 😉</p>
                                    <p>커뮤니티를 통해 다양한 커뮤니케이션 활동을 해보세요!</p>
                                    <button
                                        className={"button"}
                                        onClick={() => navigate(`/community/${id}`)}
                                    >
                                        커뮤니티로 이동 →
                                    </button>
                                </> :
                                <>
                                    <p>스터디를 신청하여 갓생러가 되어보세요~!</p>
                                    <button
                                        className={"button linear"}
                                        onClick={() => setIsConfirmModal({
                                            status: true,
                                            message: "해당 스터디를 신청하시겠습니까?",
                                            handleConfirm: () => {},
                                            handleCancel: () => {
                                                console.log("cancel !!!")
                                                setIsConfirmModal(MODAL_INFO)
                                            }
                                        })}
                                    >
                                        신청하기
                                    </button>
                                </>:
                                <>
                                    <p>로그인을 통해 스터디 서비스를 사용해보세요</p>
                                    <button className={"button"} onClick={handleApply}>LOGIN</button>
                                </>
                        }
                    </section>
                    {/*apply_section end*/}
                </div>
            }
            {
                isConfirmModal.status &&
                <Modal
                    title={"스터디 신청"}
                    buttonList={[
                        { text: "취소", handleClick: isConfirmModal.handleCancel, className: "cancel" },
                        { text: "확인", handleClick: isConfirmModal.handleConfirm, className: "confirm" }
                    ]}
                    handleClose={isConfirmModal?.handleCancel}
                    className={"confirm_modal"}>
                    <div className="modal_message">
                        { isConfirmModal?.message }
                    </div>
                </Modal>
            }
        </Layout>
    );
};

export default Detail;
