import {useEffect, useState} from "react";
import {useUser} from "../../context/UserContext";

const Reply = ({data, user, handleChangeMode, handleChangeReplyMode}) => {

    const handleApplyReply = (text) => {
        console.log("댓글 등록!", text);
    }

    const handleApplyReReply = (text) => {
        console.log("대 댓글 등록!", text);
    }

    return(
        <div className={"reply_wrap"}>
            <div className="reply_form_wrap">
                <div className={"reply_top"}>댓글 {data?.replyList?.length ?? 0}</div>
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

                    data?.replyList?.map((reply, idx) => (
                        // 댓글
                        <div className="reply_item" key={`reply_${idx}`}>
                            {
                                (reply.userIdx === user.userIdx) &&
                                (
                                    reply.isEdit ?
                                        <div className={"edit_btn_group"}>
                                            <button onClick={() => handleChangeMode(reply.idx)}>취소</button>
                                            <button>수정완료</button>
                                        </div>:
                                        <div className={"edit_btn_group"}>
                                            <button onClick={() => handleChangeMode(reply.idx)}>수정</button>
                                            <button>삭제</button>
                                        </div>
                                )
                            }
                            <p className="writer">{reply.userName}</p>
                            {
                                reply.isEdit ?
                                    <>
                                        <div className="content">
                                            <ReplyForm
                                                handleRegister={handleApplyReReply}
                                                value={reply.content}
                                                type={"edit"}
                                            />
                                        </div>
                                    </>:
                                    <>
                                        <p className="date">{reply.createDate}</p>
                                        <div className="content">
                                            { reply.content }
                                        </div>
                                    </>
                            }
                            {
                                !reply.isEdit &&
                                <ReplyForm
                                    handleRegister={handleApplyReReply}
                                    type={"reReply"}
                                    isMine={user?.userIdx?.toString() === reply?.userIdx?.toString()}
                                />
                            }
                            {/*대댓글*/}
                            {
                                reply.reReplyList?.map(reRe => (
                                    <div className="re_reply_item" key={`re_reply_${idx}`}>
                                        <div className="top_wrap">
                                            <p className="writer">{reRe.userName}</p>
                                            {
                                                (user?.userIdx === reRe.userIdx) &&
                                                (
                                                    (reRe.isEdit) ?
                                                    <div className={"top_button_group"}>
                                                        <button onClick={() => handleChangeReplyMode(reply.idx, reRe.idx)}>취소</button>
                                                        <button>수정완료</button>
                                                    </div> :
                                                    <div className={"top_button_group"}>
                                                        <button onClick={() => handleChangeReplyMode(reply.idx, reRe.idx)}>수정</button>
                                                        <button>삭제</button>
                                                    </div>
                                                )
                                            }
                                        </div>
                                        {
                                            reRe?.isEdit ?
                                                <div className="content">
                                                    <ReplyForm
                                                        handleRegister={handleApplyReReply}
                                                        value={reRe.content}
                                                        type={"edit"}
                                                    />
                                                </div> :
                                                <>
                                                    <p className="date">{reRe.createDate}</p>
                                                    <div className="content">
                                                        { reRe.content }
                                                    </div>
                                                </>
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}


// @INFO
// type : reReply(대댓글) || edit(수정모드)
const ReplyForm = ({handleRegister, type="", value=null, isMine=false}) => {

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
                    { type !== "edit" && <button className={"button"} onClick={() => handleRegister(text)}>댓글등록</button> }
                </div>
            }
            {/*대댓글*/}
        </div>
    )
}

export default Reply
