import React, {useEffect, useState} from 'react';
import Layout from "../../components/layout/Layout";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useUser} from "../../context/UserContext";
import {communityList, commReplyList} from "../../data/community";
import {studyList, studyReplyList} from "../../data/study";
import Badge from "../../components/common/Badge";
import {COMMUNITY_TYPE, STATUS_DATA} from "../../util/const";
import Reply from "../../components/common/Reply";

const Detail = () => {

    const {user} = useUser();
    const {commId} = useParams();
    const {state} = useLocation();

    const navigate = useNavigate();

    const [studyData, setStudyData] = useState({});
    const [contentData, setContentData] = useState({});
    const [prevData, setPrevData] = useState(null);
    const [nextData, setNextData] = useState(null);
    const [replyData, setReplyData] = useState({});


    // 수정모드
    // @Param type= edit(수정모드) || reply(대댓글) || reEdit(대댓글 수정)
    const handleChangeMode = (targetId, type="edit") => {
        let editModeData = [];
        if(type === "edit") {
            editModeData = replyData.replyList.map(item => item.idx === targetId ? ({
                ...item,
                isEdit: !item.isEdit
            }) : item);
        }
        if(type === "reply") {
            editModeData = replyData.replyList.map(item => item.idx === targetId ? ({
                ...item,
                isReply: !item.isReply,
            }) : item);
        }
        setReplyData({
            ...replyData,
            replyList: editModeData
        });
    }

    // 대댓글 수정 모드
    const handleChangeReplyMode = (parentId, targetId) => {
        console.log("parentId, targetId -> ", parentId, targetId);
        const targetData = replyData.replyList.map(item => item.idx === parentId ? ({
            ...item,
            reReplyList: item.reReplyList?.map(re => re.idx === targetId ? ({
                ...re,
                isEdit: !re.isEdit,
            }): re)
        }) : item);

        setReplyData({
            ...replyData,
            replyList: targetData
        });
    }

    useEffect(() => {
        console.log("replyData -> ", replyData)
    }, [replyData])

    //@INFO 내용 세팅
    useEffect(() => {
        if(commId) {
            const targetData = communityList.filter(item => item.id === parseInt(commId));
            if(targetData?.length > 0) setContentData(targetData[0]);
        }
    }, [commId]);

    //@INFO reply 내용 가져요기
    useEffect(() => {
        if(commReplyList && commId) {
            const replyData = commReplyList.filter(item => item.id === parseInt(commId));
            if(replyData?.length > 0) {
                const newData = replyData[0]?.replyList?.map(item => ({
                    ...item,
                    isEdit: false, // 수정모드
                    isReply: false, // 대댓글상태
                    reReplyList: item?.reReplyList?.map(re => ({
                        ...re,
                        isEdit: false // 대댓글 수정모드
                    }))
                }))
                setReplyData({
                    ...replyData[0],
                    replyList: newData
                });
            } else {
                setReplyData([]);
            }
        }
    }, [commReplyList, commId]);

    // @INFO 이전, 다음 컨텐츠 찾기
    useEffect(() => {
        if(communityList && commId) {
            const findPrevNextData = (data, targetId) => {
                let prevData = null;
                let nextData = null;
                const targetIndex = data.findIndex(item => item.id === parseInt(targetId));
                if (targetIndex !== -1) {
                    if (targetIndex > 0) {
                        prevData = data[targetIndex - 1];
                    }
                    if (targetIndex < data.length - 1) {
                        nextData = data[targetIndex + 1];
                    }
                }
                setPrevData(prevData);
                setNextData(nextData);
            };

            findPrevNextData(communityList, commId);
        }
    }, [communityList, commId])

    useEffect(() => {
        if(state?.id) {
            setStudyData(state);
        }
    }, [state])

    return (
        <Layout>
            {
                contentData &&
                <div className={"page_wrap comm_detail_page detail_page default_width"}>
                    {/*content_section start*/}
                    <section className={"content_section"}>
                        <div className="content_header_wrap">
                            <h3 className={"title"}>
                                <b>[{COMMUNITY_TYPE[`${contentData.postType}`]}]</b>
                                { contentData.title }
                            </h3>
                        </div>
                        <div className="info_wrap">
                            <div className="left_section">
                                <p className="writer">{contentData?.writer?.userId}</p>
                                <div className="sub_info_wrap">
                                    <span>작성일: {contentData.createDate}</span>
                                </div>
                            </div>
                            {
                                (user.userIdx === contentData?.writer?.userIdx) &&
                                <div className="right_section">
                                    <button className="button linear" onClick={() => navigate(`/community/write/${commId}`)}>수정</button>
                                    <button className="button">삭제</button>
                                </div>
                            }
                        </div>
                        <div className="content_wrap">
                            { contentData.content }
                        </div>
                        <div className="button_group">
                            <button
                                onClick={() => navigate(`/community/detail/${prevData.id}`, { state: state })}
                                className={"button linear"}
                                disabled={!prevData}
                            >
                                ←&nbsp;&nbsp;이전글
                            </button>
                            <button
                                className={"button linear"}
                                onClick={() => navigate(`/community/${state.id}`)}
                            >
                                목록
                            </button>
                            <button
                                className={"button linear"}
                                onClick={() => navigate(`/community/detail/${nextData.id}`, { state: state })}
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
                            />
                        }
                    </section>
                    {/*content_section end*/}
                    {/*participant_section start*/}
                    <section className="participant_section">
                        <div className="participants_list_wrap">
                            <p className="label">참여인원 {studyData?.participants?.length ?? 0}명</p>
                            <div className="participants_list">
                                {
                                    studyData?.participants?.map((item, idx) => (
                                        <span className={"participant"}>{item.userName}</span>
                                    ))
                                }
                            </div>
                        </div>
                    </section>
                    {/*participant_section end*/}
                </div>
            }
        </Layout>
    );
};

export default Detail;
