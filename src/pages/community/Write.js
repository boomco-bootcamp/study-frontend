import React, {useEffect, useState} from 'react';
import Layout from "../../components/layout/Layout";
import {useNavigate, useParams} from "react-router-dom";
import {COMMUNITY_TYPE} from "../../util/const";
import FileUpload from "../../components/common/FileUpload";
import {communityList} from "../../data/community";
import {useUser} from "../../context/UserContext";

const Write = () => {

    const navigate = useNavigate();
    const {user} = useUser();
    const {commId} = useParams();

    const [form, setForm] = useState({
        id: null,
        isReply: false, // 댓글승인여부
        postType: "joinMessage", // 게시글 유형
        title: "",
        content: "",
        fileList: []
    });
    const [files, setFiles] = useState([]);

    // @INFO 수정일때 기존 데이터 set
    const handleSetData = () => {
        const targetData = communityList.filter(item => item.id === parseInt(commId))?.[0];
        setForm({
            id: commId,
            postType: targetData.postType ?? "free",
            title: targetData?.title ?? "",
            content: targetData?.content ?? "",
            fileList: targetData?.fileList
        })
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    // 파일업로드 취소
    const handleCancel = (index) => {
        const newData = files.filter((_, idx) => idx !== index);
        setFiles(newData);
    }

    useEffect(() => {
        if(commId === "new") {
            // 신규
        } else {
            // 수정
            handleSetData();
        }
    }, [commId])


    return (
        <Layout>
            <div className={"page_wrap comm_write_page write_page default_width"}>
                {/*content_section start*/}
                <section className={"content_section"}>
                    <div className="form_row select_wrap">
                        <select name={"postType"}  defaultValue={form.postType} onChange={handleChange} className={"select"}>
                            {
                                Object.keys(COMMUNITY_TYPE).map((key, index) => (
                                    (user?.type === "admin") ?
                                        <option value={key}>{COMMUNITY_TYPE[`${key}`]}</option> :
                                        (key !== "notice") && <option value={key}>{COMMUNITY_TYPE[`${key}`]}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="form_row input_wrap">
                        <input
                            type="text"
                            placeholder={"제목을 입력하세요"}
                            className={"input"}
                            name={"title"}
                            value={form.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form_row content_wrap">
                        <textarea
                            placeholder={"내용을 입력하세요"}
                            className={"textarea"}
                            name={"content"}
                            value={form.content}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form_row attach_wrap">
                        <FileUpload
                            files={files}
                            setFiles={setFiles}
                            handleCancel={handleCancel}
                        />
                    </div>
                    <div className="button_group form_row">
                        <button className="button" onClick={() => navigate(-1)}>취소</button>
                        {
                            commId !== "new" ?
                                <button className="button linear">수정</button>:
                                <button className="button linear">등록</button>
                        }
                    </div>
                </section>
                {/*content_section end*/}
            </div>
        </Layout>
    );
};

export default Write;
