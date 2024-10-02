import React, {useEffect, useState} from 'react';
import Layout from "../../components/layout/Layout";
import Search from "../../components/common/Search";

// data
// import {categoryList, hotTagList, studyList} from "../../data/study";
// const
import {STATUS_DATA} from "../../util/const";
import StudyItem from "../../components/study/StudyItem";
import Paging from "../../components/common/Paging";
import {useUser} from "../../context/UserContext";
import ChipBox from "../../components/common/ChipBox";
import {useParams} from "react-router-dom";
import api from "../../api/api";

const List = () => {
    const {user} = useUser();
    const {keyword} = useParams();

    const [categoryDataList, setCategoryDataList] = useState([]);
    const [searchValue, setSearchValue] = useState({
        category: "all",
        input: "",
        status: "all", // all + STATUS_DATA
        page: 1,
    });
    const [studyDataList, setStudyDataList] = useState([]);
    const [hotTagDataList, setHotTagDataList] = useState([]);

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

    const handleSearch = (input, select) => {
        setSearchValue({
            ...searchValue,
            input: input,
            category: select
        })
    }

    const handleGetTagList = async () => {
        api.get(`/tag/list/favorite`)
            .then(function (response) {
                // handle success
                let tagData = [];
                response.data.map(tag => tagData.push(tag.stdyTagCon));
                setHotTagDataList(tagData)
            })
            .catch(function (error) {
                // handle error
                console.log("error", error);
            })
    }

    const handleSearchData = async (page=1) => {
        // 추후 검색 api 호출
        api.get(`/study/list`, {
                params: {
                    searchCon: searchValue?.input ?? "",
                    orderType: "desc",
                    page: searchValue.page,
                    record: 10
                }
            })
            .then(function (response) {
                setStudyDataList(response.data.list);
                setPaging({
                    next: response.data.next,
                    endPage: response.data.endPage,
                    page: response.data.page,
                    prev: response.data.prev,
                    record: response.data.record,
                    startPage: response.data.startPage,
                    total: response.data.total,
                    totalPage: response.data.totalPage,
                })
            })
            .catch(function (error) {
                console.log("error", error);
            })
    }

    const handleGetCategory = async () => {
        // 추후 검색 api 호출
        api.get(`/category/list/all`)
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

    const handlePaging = (param) => {
        setSearchValue({
            ...searchValue,
            page: param.page
        })
    }

    useEffect(() => {
        handleGetCategory();
        handleGetTagList();
    }, []);


    useEffect(() => {
        if(keyword) {
            setSearchValue({
                ...searchValue,
                input: keyword
            });
        }
    }, [keyword])

    // @INFO 검색조건 바뀔때마다 검색 호출
    useEffect(() => {
        searchValue && handleSearchData();
    }, [searchValue])

    return (
        <Layout>
            <div className="page_wrap study_page">
                <section className="search_section">
                    {
                        (categoryDataList) &&
                        <Search
                            selectList={categoryDataList}
                            selectedValue={searchValue.category}
                            handleSearch={handleSearch}
                            placeholder="검색어를 입력하세요."
                        />
                    }
                </section>
                <div className="content default_width">
                    <section className="study_list_section">
                        {/*filter_wrap start*/}
                        <div className="filter_wrap">
                            <button
                                className={`filter_item ${searchValue.status === "all" ? "active": ""}`}
                                onClick={() => setSearchValue({
                                    ...searchValue,
                                    status: "all"
                                })}
                            >전체
                            </button>
                            {
                                Object.keys(STATUS_DATA).map((item, idx) => (
                                    <button
                                        className={`filter_item ${item === searchValue.status ? "active": ""}`}
                                        onClick={() => setSearchValue({
                                            ...searchValue,
                                            status: item
                                        })}
                                    >
                                        { STATUS_DATA[item] }
                                    </button>
                                ))
                            }
                        </div>
                        {/*filter_wrap end*/}
                        <div className="list_tag_wrap">
                            <div className="list_wrap">
                                {
                                    (studyDataList?.length <= 0 && searchValue.input) &&
                                    <div className={"no_result"}>
                                        검색결과가 없습니다.
                                    </div>
                                }
                                {
                                    studyDataList?.map((item) => (
                                        <StudyItem
                                            key={item.id}
                                            data={item}
                                        />
                                    ))
                                }
                                {
                                    paging.page > 0 &&
                                    <Paging
                                        pagingData={paging}
                                        handlePaging={handlePaging} />
                                }
                            </div>
                            {
                                hotTagDataList &&
                                <ChipBox
                                    title={"인기 태그"}
                                    data={hotTagDataList}
                                />
                            }
                        </div>
                    </section>
                </div>
            </div>
        </Layout>
    );
};

export default List;
