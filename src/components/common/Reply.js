import {useEffect, useState} from "react";
import {useUser} from "../../context/UserContext";
import dayjs from "dayjs";

const Reply = (props) => {
    const {
        data,
        user,
        handleChangeMode,
        handleChangeReplyMode,
        handleGetList,
        handleWrite,
        handleDelete
    } = props;

    const handleApplyReply = (text, id=null) => {
        if(handleWrite) handleWrite(text, id);
    }


    return(
        <div className={"reply_wrap"}>
            <div className="reply_form_wrap">
                <div className={"reply_top"}>댓글 {data?.length ?? 0}</div>
                <ReplyForm
                    handleRegister={handleApplyReply}
                />
            </div>
            <div className="reply_list">
                {
                    (data?.replyList?.length <= 0) &&
                    <div className="no_result">
                        댓글이 없습니다.
                    </div>
                }
                {

                    data?.map((reply, idx) => (
                        // 댓글
                        <div className="reply_item" key={reply.stdyComCommentId}>
                            {
                                (reply.rgsnUserId === user.userId) &&
                                (
                                    reply.isEdit ?
                                        <div className={"edit_btn_group"}>
                                            <button onClick={() => handleChangeMode(reply.stdyComCommentId)}>취소</button>
                                            {/*<button onClick={() => handleApplyReply}>수정완료</button>*/}
                                        </div>:
                                        <div className={"edit_btn_group"}>
                                            <button onClick={() => handleChangeMode(reply.stdyComCommentId)}>수정</button>
                                            <button onClick={() => handleDelete(reply.stdyComCommentId)}>삭제</button>
                                        </div>
                                )
                            }
                            <p className="writer">{reply.rgsnUserId}</p>
                            {
                                reply.isEdit ?
                                    <>
                                        <div className="content">
                                            <ReplyForm
                                                handleRegister={handleApplyReply}
                                                value={reply.stdyComCommentCon}
                                                type={"edit"}
                                                targetId={reply.stdyComCommentId}
                                            />
                                        </div>
                                    </>:
                                    <>
                                        <p className="date">{dayjs(reply.rgsnTs).format("YYYY-MM-DD HH:mm")}</p>
                                        <div className="content">
                                            { reply.stdyComCommentCon }
                                        </div>
                                    </>
                            }
                            {
                                !reply.isEdit &&
                                <ReplyForm
                                    handleRegister={handleApplyReply}
                                    type={"reReply"}
                                    isMine={reply?.amnnUserId === user?.userId}
                                    parentCommId={reply.stdyComCommentId}
                                />
                            }
                            {/*대댓글 start*/}
                            {
                                reply?.stdyChildComCommentList?.map(reRe => (
                                    <div className="re_reply_item" key={reRe.stdyComCommentId}>
                                        <div className="top_wrap">
                                            <p className="writer">{reRe.rgsnUserId}</p>
                                            {
                                                (user?.userId === reRe.rgsnUserId) &&
                                                (
                                                    (reRe?.isEdit) ?
                                                    <div className={"top_button_group"}>
                                                        <button onClick={() => handleChangeReplyMode(reply.stdyComCommentId, reRe.stdyComCommentId)}>취소</button>
                                                        {/*<button>수정완료</button>*/}
                                                    </div> :
                                                    <div className={"top_button_group"}>
                                                        <button onClick={() => handleChangeReplyMode(reply.stdyComCommentId, reRe.stdyComCommentId)}>수정</button>
                                                        <button onClick={() => handleDelete(reRe.stdyComCommentId)}>삭제</button>
                                                    </div>
                                                )
                                            }
                                        </div>
                                        {
                                            reRe?.isEdit ?
                                                <div className="content">
                                                    <ReplyForm
                                                        handleRegister={handleApplyReply}
                                                        value={reRe.stdyComCommentCon}
                                                        type={"edit"}
                                                    />
                                                </div> :
                                                <>
                                                    <p className="date">{dayjs(reRe.rgsnTs).format("YYYY-MM-DD HH:mm")}</p>
                                                    <div className="content">
                                                        { reRe.stdyComCommentCon }
                                                    </div>
                                                </>
                                        }
                                    </div>
                                ))
                            }
                            {/*대댓글 end*/}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}


// @INFO
// type : reReply(대댓글) || edit(수정모드)
const ReplyForm = (props) => {
    const {
        handleRegister,
        type="",
        value=null,
        isMine=false,
        parentCommId=null // 있으면 대댓글, 없으면 댓글
    } = props;

    const [text, setText] = useState("");
    const [replyStatus, setReplyStatus] = useState(false);

    useEffect(() => {
        value && setText(value)
    }, [value])

    return(
        <div className={"reply_form"}>
            {
                (type === "reReply" && !isMine) &&
                <div className="button_wrap">
                    <button className="button" onClick={() => setReplyStatus(!replyStatus)}>댓글달기</button>
                </div>
            }
            {/*일반댓글*/}
            {
                (type !== "reReply" || replyStatus) &&
                <div className="textarea_button_wrap">
                    <textarea
                        value={text}
                        onChange={e => setText(e.target.value)}
                        className={"textarea"}
                        placeholder={"댓글을 등록해보세요"}
                    />
                    { type !== "edit" &&
                        <button className={"button "} onClick={() => {
                            handleRegister(text, parentCommId);
                            setText("");
                            if(replyStatus) setReplyStatus(false);
                        }}>댓글등록</button>}
                </div>
            }
            {/*대댓글*/}
        </div>
    )
}

export default Reply
