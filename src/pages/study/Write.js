import React, {useEffect, useState} from 'react';
import {format} from "date-fns";
import Layout from "../../components/layout/Layout";
import {useNavigate, useParams} from "react-router-dom";
// import {categoryList, studyList} from "../../data/study";
import ChipBox from "../../components/common/ChipBox";
import Calendar from "../../components/common/Calendar";
import Axios from "../../api/api";
import Modal from "../../components/common/Modal";
import {MODAL_INFO} from "../../util/const";

const Write = () => {

    const navigate = useNavigate();
    const {id} = useParams();

    const [isConfirmModal, setIsConfirmModal] = useState(MODAL_INFO);

    const [form, setForm] = useState({
    // {
    //     "stdyNm" : "물경력을 기업이 먼저 찾는 이온 음료로 만드는 작은 학습 습관을 함께 만들어가실 스터디원을 찾습니다."
    //     , "stdyCon" : "React로 웹 프로젝트를 진행할 프론트엔드 개발자를 구합니다. 함께 협업하여 실제 서비스 개발 경험을 쌓고 싶으신 분들을 환영합니다. 코드 리뷰와 지속적인 피드백을 통해 함께 성장해요!"
    //     , "stdyStDt" : "2024-10-01 09:00"
    //     , "stdyEnDt" : "2024-10-07 16:00"
    //     , "stdySt" : "ready"
    //     , "stdyCatId" : "069d01f7-a8de-4e78-866b-bb602bba0543"
    //     , "tagList" : [
    //     {"stdyTagCon" : "웹 개발"},
    //     {"stdyTagCon" : "경력"}
    // ]
    // }
    //     stdyId: null,
        // postType: "joinMessage", // 게시글 유형
        stdyNm: "",
        stdyCon: "",
        stdyStDt: null,
        stdyEnDt: null,
        stdySt: "ready",
        stdyCatId: null,
        tagList: []
    });
    const [categoryDataList, setCategoryDataList] = useState([]);
    const [tagList, setTagList] = useState([]);

    // @INFO 수정일때 기존 데이터 set
    const handleSetData = () => {
        // const targetData = studyList.filter(item => item.id === parseInt(id))?.[0];
        // setForm({
        //     id: id,
        //     category: targetData?.category?.id ?? categoryData[0]?.id,
        //     title: targetData?.title ?? "",
        //     content: targetData?.content ?? "",
        //     tagList: targetData?.tagList,
        // });
        // const tagList = targetData?.tagList?.map((item, idx) => ({
        //     id: idx,
        //     title: item
        // }))
        // setTagList(tagList ?? []);
    }
    const handleGetCategory = async () => {
        // 추후 검색 api 호출
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

    // 등록 & 수정
    const handleCreate = () => {
        const tagLists = tagList.map(tag => ({ stdyTagCon: tag.title }));
        const postData = {
            ...form,
            stdyStDt: format(form.stdyStDt, "yyyy-MM-dd mm:ss"),
            stdyEnDt: format(form.stdyEnDt, "yyyy-MM-dd mm:ss"),
            tagList: tagLists
        }
        if(id !== "new") {
            // 수정
        } else {
            // 신규 등록
            Axios.post(`/study/save`, postData)
                .then(function (response) {
                    setIsConfirmModal({
                        status: true,
                        message: "등록이 완료되었습니다.",
                        handleConfirm: () => navigate('/admin'),
                    })
                })
                .catch(function (error) {
                    console.log("error", error);
                })
        }
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSelect = (e) => {
        console.log("e.target.value -> ", e.target.value)
    }

    // tag handler
    const handleAddTagList = (data) => {
        setTagList([
            ...tagList,
            {
                id: tagList.length,
                title: data
            }
        ])
    }
    const handleDeleteTag = (id) => {
        const newtagList = tagList.filter(tag => tag.id !== id);
        setTagList(newtagList);
    }

    useEffect(() => {
        handleGetCategory();
        if(id === "new") {
            // 신규
        } else {
            // 수정
            handleSetData();
        }
    }, [id]);

    // useEffect(() => {
    //     (categoryList) && setCategoryData(categoryList)
    // }, [categoryList])


    return (
        <Layout>
            <div className={"page_wrap study_write_page write_page default_width"}>
                {/*content_section start*/}
                <section className={"content_section"}>
                    <div className="form_row select_wrap">
                        {
                            (categoryDataList && form) &&
                            <select name={"stdyCatId"} value={form?.category} onChange={handleChange} className={"select"}>
                                {
                                    categoryDataList?.map((item, index) => (
                                        <option value={item.id}>{ item.title}</option>
                                    ))
                                }
                            </select>
                        }
                    </div>
                    <div className="form_row input_wrap">
                        <input
                            type="text"
                            placeholder={"스터디명을 입력하세요"}
                            className={"input"}
                            name={"stdyNm"}
                            value={form.stdyNm}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form_row content_wrap">
                        <textarea
                            placeholder={"스터디 소개글을 작성하세요"}
                            className={"textarea"}
                            name={"stdyCon"}
                            value={form.stdyCon}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="term_wrap">
                        <Calendar
                            placeholder={"시작일을 선택하세요"}
                            date={form.stdyStDt}
                            onChangeDate={(date) => setForm({
                                ...form,
                                stdyStDt: date
                            })}
                        />
                        <Calendar
                            placeholder={"종료일을 선택하세요"}
                            date={form.stdyEnDt}
                            onChangeDate={(date) => setForm({
                                ...form,
                                stdyEnDt: date
                            })}
                        />
                    </div>
                    <div className="form_row tag_list_wrap">
                        <ChipBox
                            title={"태그 설정"}
                            type={"input"}
                            mode={"edit"}
                            data={tagList}
                            handleSetData={handleAddTagList}
                            handleDelete={handleDeleteTag}
                            placeholder={"태그를 입력하세요"}
                            maxLength={5}
                        />
                        <p className="notice">🔴 태그는 최대 5개까지 등록 가능합니다.</p>
                    </div>
                    <div className="button_group form_row">
                        <button className="button" onClick={() => navigate(-1)}>취소</button>
                        {
                            id !== "new" ?
                                <button className="button linear">수정</button>:
                                <button className="button linear" onClick={handleCreate}>등록</button>
                        }
                    </div>
                </section>
                {/*content_section end*/}
            </div>

            {
                isConfirmModal.status &&
                <Modal
                    title={"스터디 등록"}
                    buttonList={[
                        { text: "확인", handleClick: isConfirmModal.handleConfirm, className: "confirm" }
                    ]}
                    className={"confirm_modal"}>
                    <div className="modal_message">
                        { isConfirmModal?.message }
                    </div>
                </Modal>
            }
        </Layout>
    );
};

export default Write;
