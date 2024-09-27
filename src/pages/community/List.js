import Layout from "../../components/layout/Layout";
import {studyList} from "../../data/study";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Search from "../../components/common/Search";
import {COMMUNITY_TYPE, STATUS_DATA, COMM_FILTER} from "../../util/const";
import {communityList} from "../../data/community";
import CommItem from "../../components/community/CommItem";
import Paging from "../../components/common/Paging";
import {Link} from "react-router-dom";

const List = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [studyData, setStudyData] = useState({});
    const [commDataList, setCommDataList] = useState([]);
    const [commTypeList, setCommTypeList] = useState([]);

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
        commType: "all",
        input: "",
        status: "all"
    });

    const handleSearch = (input, select) => {
        setSearchValue({
            ...searchValue,
            input: input,
            commType: select
        })
    }

    const handleSearchData = () => {
        // 추후 검색 api 호출
        console.log("검색 조건 -> ", searchValue)
    }

    const handlePaging = async (param) => {
        console.log(param);
    }

    // 상세커뮤니티 이동
    const handleDetail = (commIdx) => {
        navigate(`/community/detail/${commIdx}`, { state: studyData })
    }

    const handleWrite = (commIdx) => {
        navigate(`/community/write/${commIdx}`, { state: studyData })
    }

    useEffect(() => {
        // @INFO 커뮤니티 게시글 유형 select 세팅
        const commTypeData = Object.keys(COMMUNITY_TYPE)?.map(key => ({
            id: key,
            title: COMMUNITY_TYPE[key]
        }));
        setCommTypeList(commTypeData);

        // @INFO id로 study 정보 조회
        if(id && studyList) {
            const targetStudy = studyList.filter(study => study.id === parseInt(id));
            setStudyData(targetStudy[0]);
        }
    }, [studyList, id]);

    // @INFO 검색조건 바뀔때마다 검색 호출
    useEffect(() => {
        searchValue && handleSearchData();
    }, [searchValue])

    useEffect(() => {
        (communityList) && setCommDataList(communityList)
    }, [communityList])


    return(
        <Layout>
            <div className="page_wrap community_page">
                <div className="community_header default_width">
                    {/*<h2 className={"study_title"}>{studyData?.title}</h2>*/}
                    <h2 className={"study_title"}>백엔드 공부 모집</h2>
                    <button className={"button"} onClick={() => handleWrite("new")}>글쓰기</button>
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
                                className={`filter_item ${searchValue.status === "all" ? "active": ""}`}
                                onClick={() => setSearchValue({
                                    ...searchValue,
                                    status: "all"
                                })}
                            >전체
                            </button>
                            {
                                Object.keys(COMM_FILTER).map((item, idx) => (
                                    <button
                                        className={`filter_item ${item === searchValue.status ? "active": ""}`}
                                        onClick={() => setSearchValue({
                                            ...searchValue,
                                            status: item
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
                                                handleDetail={handleDetail}
                                                key={item.id + idx}
                                            />
                                        ))
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
