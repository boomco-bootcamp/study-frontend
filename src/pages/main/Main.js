import React, {useEffect, useState} from 'react';
import {useUser} from "../../context/UserContext";

// data
import {hotTagList} from "../../data/study";
// components
import Layout from "../../components/layout/Layout";
import Banner from "./components/Banner";
import ListSection from "../../components/common/ListSection";
import StudyItem from "../../components/study/StudyItem";
import {Link} from "react-router-dom";
import ChipBox from "../../components/common/ChipBox";
// api
import Axios from '../../api/api'


const Main = () => {
    const {user} = useUser();

    const [studyList, setStudyList] = useState([]);
    const [tagList, setTagList] = useState([]);

    const [recentList, setRecentList] = useState([]);
    const [hotList, setHotList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);

    const temp_user_category = ["프론트엔드", "모바일 앱 개발"]; // 임시 데이터 "프론트엔드", "모바일 앱 개발"

    const handleGetStudyData = async (orderType, setFunction) => {
            return await Axios.get(`/study/list`, {
                params: {
                    orderType: orderType,
                    page: 1,
                    record: 10
                }
            })
            .then(function (response) {
                    // setStudyList(response.data.list)
                    setFunction(response.data.list)
                }

            )
            .catch(function (error) {
                console.log("error", error);
            })
    }

    const handleGetTagList = async () => {
            Axios.get(`/tag/list/favorite`)
            .then(function (response) {
                // handle success
                let tagData = [];
                response.data.map(tag => tagData.push(tag.stdyTagCon));
                setTagList(tagData)
            })
            .catch(function (error) {
                // handle error
                console.log("error", error);
            })
    }

    useEffect(() => {
        // handleGetStudyData();
        handleGetTagList();
        handleGetStudyData("desc", setRecentList)
        handleGetStudyData("like", setHotList)
    }, [])

    useEffect(() => {
        // @INFO 추후 API set
        if(studyList?.length > 0) {
            const categoryListData = studyList.filter(item =>
                // item?.categoryList?.some(category => temp_user_category.includes(category.title))
                temp_user_category.includes(item?.category?.title)
            );
            setCategoryList(categoryListData);
        }
    }, [studyList])

    return (
        <Layout>
            <div className="page_wrap main">
                <Banner/>
                <div className="content default_width">
                    <section className="study_box">
                        <ListSection
                            title={"최신 스터디"}
                            link={"/study"}
                        >
                            {
                                recentList?.length <= 0 &&
                                <div className={"no_result"}>
                                    최신 스터디가 없습니다.
                                </div>
                            }
                            {
                                recentList?.map((item, idx) => (
                                    (idx < 4) &&
                                    <StudyItem
                                        key={idx}
                                        data={item}
                                    />
                                ))
                            }
                        </ListSection>
                        <ListSection
                            title={"인기 스터디"}
                            link={"/study"}
                        >
                            {
                                hotList?.length <= 0 &&
                                <div className={"no_result"}>
                                    인기 스터디가 없습니다.
                                </div>
                            }
                            {
                                hotList?.map((item, idx) => (
                                    (idx < 4) &&
                                    <StudyItem
                                        key={idx}
                                        data={item}
                                    />
                                ))
                            }
                        </ListSection>
                    </section>

                    <section className="recommend_box">
                        {
                            (user.name) ?
                                <div className={"recommend_list"}>
                                    {
                                        (categoryList?.length > 0) ?
                                            <>
                                                <p className="notice">
                                                    ✨ {user.name}님이 관심있는 카테고리에 매칭 되는 스터디예요 👀
                                                    ({temp_user_category?.map((category, idx) => <span key={`user_category_${idx}`}>#{category}</span>)})
                                                </p>
                                                {
                                                    categoryList.map((item, idx) => (
                                                        (idx < 4) &&
                                                        <StudyItem
                                                            key={idx}
                                                            data={item}
                                                        />
                                                    ))
                                                }
                                            </>:
                                            <div className={"request_login"}>
                                                <p className="main_text">마이페이지에서 관심 카테고리를 설정할 수 있어요!</p>
                                                <Link to={"/mypage"}>관심 카테고리 설정하러 가기 →</Link>
                                            </div>
                                    }
                               </div> :
                                <div className={"request_login"}>
                                    <p className="main_text">회원가입을 하면 더 많은 스터디를 볼 수 있어요!</p>
                                    <Link to={"/signup"}>회원가입하러 가기 →</Link>
                                </div>
                        }
                        {
                            tagList?.length > 0 &&
                            <ChipBox
                                title={"인기 태그"}
                                data={tagList}
                            />
                        }
                    </section>
                </div>
            </div>
        </Layout>
    );
};

export default Main;
