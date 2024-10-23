import Layout from "../../components/layout/Layout";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Search from "../../components/common/Search";
import {COMMUNITY_TYPE, STATUS_DATA, COMM_FILTER} from "../../util/const";
import CommItem from "../../components/community/CommItem";
import Paging from "../../components/common/Paging";
import Axios from "../../api/api";
import NoData from "../../components/common/NoData";

const List = () => {
    const navigate = useNavigate();
    const {id} = useParams();

    const [studyData, setStudyData] = useState({}); // 스터디 정보
    const [commDataList, setCommDataList] = useState([]); // 커뮤니티 목록
    const [commTypeList, setCommTypeList] = useState([]); // 커뮤니티 유형 select

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

    const [searchValue, setSearchValue] = useState({
        stdyComSt: "", // 스터디 커뮤니티 상태
        searchCon: "", // 검색어(제목, 내용)
        orderType: "all", // 정렬 조건
        stdyId: "",
        page: 1,
        record: 10
    });

    const handleSearch = (input, select) => {
        setSearchValue({
            ...searchValue,
            searchCon: input,
            stdyComSt: select,
            page: 1
        })
    }

    // 커뮤니티 목록 조회
    const handleGetStudyData = () => {
        Axios.get(`/study/detail`, {
            params: {
                stdyId: id,
            }
        })
        .then(function (response) {
            setStudyData(response.data);
        })
        .catch(function (error) {
            console.log("error", error);
        })
    }

    const handleGetList = async () => {
        await Axios.get(`/community/list`, {
            params: {
                stdyId: id,
                page: searchValue.page,
                record: searchValue.record,
                searchCon: searchValue.searchCon,
                stdyComSt: searchValue.stdyComSt === "all" ? "" : searchValue.stdyComSt,
                orderType: searchValue.orderType === "all" ? "" : searchValue.orderType
            }
        })
        .then(function (response) {
            setCommDataList(response?.data?.list);
            setPaging({
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

    const handlePaging = async (param) => {
        if(searchValue.page !== param.page) {
            setSearchValue({
                ...searchValue,
                page: param.page
            })
        }
    }


    useEffect(() => {
        // @INFO 커뮤니티 게시글 유형 select 세팅
        const commTypeData = Object.keys(COMMUNITY_TYPE)?.map(key => ({
            id: key,
            title: COMMUNITY_TYPE[key]
        }));
        setCommTypeList(commTypeData);
    }, []);

    useEffect(() => {
        searchValue && handleGetList()
    }, [searchValue])

    useEffect(() => {
        id && handleGetStudyData()
    }, [id])


    return(
        <Layout>
            <div className="page_wrap community_page">
                <div className="community_header default_width">
                    {/*<h2 className={"study_title"}>{studyData?.title}</h2>*/}
                    <h2 className={"study_title"}>{studyData?.stdyNm ?? "-"}</h2>
                    <button className={"button"} onClick={() => navigate(`/community/write/new`, {state: {stdyId: id}})}>글쓰기</button>
                </div>
                <section className="search_section default_width">
                    {
                        (commTypeList) &&
                        <Search
                            selectList={commTypeList}
                            selectedValue={searchValue.commType}
                            handleSearch={handleSearch}
                            placeholder="검색어를 입력하세요."
                        />
                    }
                </section>
                <div className="content default_width">
                    <section className="comm_list_section">
                        {/*filter_wrap start*/}
                        <div className="filter_wrap">
                            <button
                                className={`filter_item ${(searchValue.orderType === "all") ? "active": ""}`}
                                onClick={() => setSearchValue({
                                    ...searchValue,
                                    orderType: "all"
                                })}
                            >전체
                            </button>
                            {
                                Object.keys(COMM_FILTER).map((item, idx) => (
                                    <button
                                        className={`filter_item ${item === searchValue.orderType ? "active": ""}`}
                                        onClick={() => setSearchValue({
                                            ...searchValue,
                                            orderType: item
                                        })}
                                    >
                                        { COMM_FILTER[item] }
                                    </button>
                                ))
                            }
                        </div>
                        {/*filter_wrap end*/}
                        <div className="list_participant_wrap">
                            <div className="table_wrap">
                                <div className="header_wrap">
                                    <div className="row">
                                        <div className="col no">NO</div>
                                        <div className="col title">제목</div>
                                        <div className="col writer">글쓴이</div>
                                        <div className="col date">작성시간</div>
                                    </div>
                                </div>
                                <div className="list_wrap">
                                    {
                                        commDataList?.map((item, idx) => (
                                            <CommItem
                                                data={item}
                                                index={idx+1}
                                                handleDetail={() => navigate(`/community/detail/${item.stdyComtId}`, {state: {stdyId: id}})}
                                                key={item.stdyComtId}
                                            />
                                        ))
                                    }
                                    {
                                        (commDataList?.length <= 0) &&
                                        <NoData/>
                                    }
                                </div>
                                <Paging pagingData={paging} handlePaging={handlePaging} />
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </Layout>
    )
}

export default List
