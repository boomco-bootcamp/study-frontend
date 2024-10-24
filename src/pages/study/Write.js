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
        stdyNm: "",
        stdyCon: "",
        stdyStDt: new Date(),
        stdyEnDt: new Date(),
        stdySt: "ready",
        stdyCatId: null,
        tagList: []
    });
    const [categoryDataList, setCategoryDataList] = useState([]);
    const [tagList, setTagList] = useState([]);

    // @INFO 수정일때 기존 데이터 set
    const handleSetData = () => {
        Axios.get(`/study/detail?stdyId=${id}`)
            .then(function (response) {
               const data = response.data;
               let tagDatas = []; // form 용
                let tagChips = []; // UI용
               if(data?.tagList?.length > 0) {
                   tagDatas = data?.tagList?.map(tag => ({
                       stdyTagCon: tag.stdyTagCon
                   }))
                   tagChips = data?.tagList?.map((tag, idx) => ({
                       id: idx,
                       title: tag.stdyTagCon
                   }))
               }
                setForm({
                    stdyId: data.stdyId,
                    stdyNm: data.stdyNm,
                    stdyCon: data.stdyCon,
                    stdyStDt: data.stdyStDt,
                    stdyEnDt: data.stdyEnDt,
                    stdySt: data.stdySt,
                    stdyCatId: data.stdyCatId,
                    tagList: tagDatas
                });
               setTagList(tagChips);
            })
            .catch(function (error) {
                console.log("error", error);
            })
    }


    const handleGetCategory = async () => {
        // 추후 검색 api 호출
        Axios.get(`/category/list/all`)
            .then(function (response) {
                const categorySelect = response.data.map((cat, index) => ({
                    id: cat.stdyCatId,
                    title: cat.stdyCatNm
                }));
                setCategoryDataList(categorySelect);
                setForm({
                    ...form,
                    stdyCatId: categorySelect[0]?.id
                })
            })
            .catch(function (error) {
                console.log("error", error);
            })
    }


    // 등록 & 수정
    const handleCreate = () => {
        const tagLists = tagList.map(tag => ({ stdyTagCon: tag.title }));
        let postData = {
            ...form,
            stdyStDt: format(form.stdyStDt, "yyyy-MM-dd mm:ss"),
            stdyEnDt: format(form.stdyEnDt, "yyyy-MM-dd mm:ss"),
            tagList: tagLists
        }
        if(form.stdyId) {
            postData = {
                ...postData,
                stdyId: form.stdyId
            }
        }
        Axios.post(`/study/save`, postData)
            .then(function (response) {
                setIsConfirmModal({
                    status: true,
                    message: `${form.stdyId ? "수정": "등록"}이 완료되었습니다.`,
                    handleConfirm: () => navigate('/admin'),
                })
            })
            .catch(function (error) {
                console.log("error", error);
            })
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
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
        if(id !== "new") handleSetData();
    }, [id]);


    return (
        <Layout>
            <div className={"page_wrap study_write_page write_page default_width"}>
                {/*content_section start*/}
                <section className={"content_section"}>
                    <div className="form_row select_wrap">
                        {
                            (categoryDataList && form) &&
                            <select name={"stdyCatId"} defaultValue={form?.stdyCatId}  onChange={handleChange} className={"select"}>
                                {
                                    categoryDataList?.map((item) => (
                                        <option key={item.id + item.title} value={item.id}>{item.title}</option>
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
                                <button className="button linear" onClick={handleCreate}>수정</button>:
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
