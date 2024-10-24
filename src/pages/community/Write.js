import React, {useEffect, useState} from 'react';
import Layout from "../../components/layout/Layout";
import {useNavigate, useParams} from "react-router-dom";
import {COMMUNITY_TYPE} from "../../util/const";
import FileUpload from "../../components/common/FileUpload";
import {useUser} from "../../context/UserContext";
import Axios from "../../api/api";
import { useLocation } from 'react-router-dom';

const Write = () => {

    const navigate = useNavigate();
    const {user} = useUser();
    const {commId} = useParams();
    const location = useLocation();
    const { stdyId } = location?.state || {};


    const [form, setForm] = useState({
        stdyId : stdyId, // 스터디 ID
        stdyComTitle : "", // 스터티 커뮤니티 제목
        stdyComCon : "", // 스터디 커뮤니티 내용
        stdyComSt : "", // 스터디 커뮤니티 상태
        fileList : [ // 스터디 커뮤니티 첨부파일 리스트
            // {
            //     "fileId" : "3356c4dc-f05b-4d96-88ef-7aae938e1111"
            // }
        ]
    });
    // 에러 체크
    const [errorList, setErrorList] = useState({
        stdyComTitle: "",
        stdyComCon: ""
    });

    const [files, setFiles] = useState([]);

    // @INFO 수정일때 기존 데이터 set
    const handleSetData = async () => {
        await Axios.get(`/community/detail?stdyComtId=${commId}`, )
            .then(function (response) {
                const data = response.data;
                setForm({
                    stdyId : data.stdyId,
                    stdyComTitle : data.stdyComTitle,
                    stdyComCon : data.stdyComCon,
                    stdyComSt : data.stdyComSt,
                });
            })
            .catch(function (error) {
                console.log("error", error);
            })
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

        if(e.target.value !== "") {
            setErrorList({
                ...errorList,
                [e.target.name]: ""
            });
        }
    }
    // 파일업로드 취소
    const handleCancel = (index) => {
        const newData = files.filter((_, idx) => idx !== index);
        setFiles(newData);
    }

    // 유효성 체크
    const handleCheckValidate = (data) => {
        const checkObj = {}
        if(form.stdyComTitle === "") checkObj.stdyComTitle = "빈값을 입력하세요";
        if(form.stdyComCon === "") checkObj.stdyComCon = "빈값을 입력하세요";
        setErrorList(checkObj);
        return Object.keys(checkObj)?.length <= 0;
    }

    // 글 등록
    const handleSubmit = async () => {
        let postData = {
            ...form
        }
        if(commId !== "new") {
            postData = {
                ...form,
                stdyComtId: commId
            }
        }
        if(handleCheckValidate(postData)) {
            await Axios.post(`/community/save`, postData)
                .then(() => {
                    navigate(`/community/${stdyId}`)
                })
                .catch(function (error) {
                    console.log("error", error);
                })
        }
    }

    useEffect(() => {
        if(commId === "new") {
            // 신규
        } else {
            // 수정
            handleSetData();
        }
    }, [commId]);



    return (
        <Layout>
            <div className={"page_wrap comm_write_page write_page default_width"}>
                {/*content_section start*/}
                <section className={"content_section"}>
                    <div className="form_row select_wrap">
                        {
                            form &&
                            <select name={"stdyComSt"} value={form?.stdyComSt ?? "inquiry"} onChange={handleChange} className={"select"}>
                                {
                                    // @INFO 관리자만 공지사항을 올릴수 있음
                                    Object.keys(COMMUNITY_TYPE).map((key, index) => (
                                        (user?.type === "admin") ?
                                            <option value={key}>{COMMUNITY_TYPE[`${key}`]}</option> :
                                            (key !== "notice") && <option value={key}>{COMMUNITY_TYPE[`${key}`]}</option>
                                    ))
                                }
                            </select>
                        }
                    </div>
                    <div className="form_row input_wrap">
                        <input
                            type="text"
                            placeholder={"제목을 입력하세요"}
                            className={`input ${errorList.stdyComTitle ? "error": ""}`}
                            name={"stdyComTitle"}
                            value={form.stdyComTitle}
                            onChange={handleChange}
                        />
                        {(errorList.stdyComTitle) && <p className="error_notice">{errorList.stdyComTitle}</p>}
                    </div>
                    <div className="form_row content_wrap">
                        <textarea
                            placeholder={"내용을 입력하세요"}
                            className={`textarea ${errorList.stdyComCon ? "error": ""}`}
                            name={"stdyComCon"}
                            value={form.stdyComCon}
                            onChange={handleChange}
                        />
                        {(errorList.stdyComCon) && <p className="error_notice">{errorList.stdyComCon}</p>}
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
                                <button className="button linear" onClick={handleSubmit}>수정</button>:
                                <button className="button linear" onClick={handleSubmit}>등록</button>
                        }
                    </div>
                </section>
                {/*content_section end*/}
            </div>
        </Layout>
    );
};

export default Write;
