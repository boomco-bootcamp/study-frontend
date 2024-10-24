import React, {useState, useEffect} from 'react';
import Badge from "../common/Badge";
import {STATUS_DATA} from "../../util/const";
import { useNavigate } from "react-router-dom";
import {useUser} from "../../context/UserContext";

const StudyItem = ({data}) => {
    const {user} = useUser()
    const navigate = useNavigate();

    return (
        <div
            className={"study_item"}
            onClick={() => navigate(`/study/detail/${data?.stdyId}`)}
        >
            <div className="title_section">
                <p className="title">
                    <b>[{data?.stdyCatNm}]</b>{ data?.stdyNm }
                </p>
                <Badge
                    className={data.status}
                    text={STATUS_DATA[`${data.stdySt}`]}
                />
            </div>
            {
                (data?.tagList?.length > 0) &&
                <div className="tag_list">
                    {
                        data?.tagList?.map((tag, index) => (
                            <span className={"tag"} key={`${tag?.stdyTagId}`}>
                                {tag?.stdyTagCon}
                            </span>
                        ))
                    }
                </div>
            }
            {/*<div className="bottom_section">*/}
            {/*    <div className="left_section">*/}
            {/*        <span className="writer">{data.userName}</span>*/}
            {/*        <span className="date">{data.createDate}</span>*/}
            {/*    </div>*/}
            {/*    <div className="right_section">*/}
            {/*        <span className="like">like: {data.like ?? 0}</span>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
};

export default StudyItem;
