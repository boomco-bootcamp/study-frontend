import React, {useEffect, useRef, useState} from "react";
import {DeleteIcon, PlusIcon} from "../../assets/icons/Icon";

const ChipBox = (props) => {
    const {
        title,
        type="", // input || onClick
        mode="view", // view || edit
        placeholder="입력하세요",
        data,
        handleSetData,
        handleDelete,
        handleAddCustom=()=>{},
        maxLength=0,
        nodataMessage = ""
    } = props;

    const inputRef = useRef();
    const [input, setInput] = useState("");

    const handleAdd = () => {
        // 빈값 체크
        if(input === "") {
            alert("관심태그를 입력해주세요!");
            return false;
        }
        // maxLength 체크
        if(maxLength > 0) {
            if((data?.length + 1) > maxLength) {
                alert(`${maxLength}개 모드 등록하였습니다!`);
                return false;
            }
        }
        // 중복값 체크
        if(data?.length > 0) {
            const isDuplicate = data.some((item) => item.title === input);
            if(isDuplicate) {
                alert("이미 존재하는 태그입니다!");
                return false;
            }
        }
        // 등록
        handleSetData && handleSetData(input);
        setInput("");
        inputRef.current.focus();
    }


    return(
        <div className={"chip_wrap"}>
            <div className="chip_header">
                { title && <h3 className={"title"}>{title}</h3>}
                {
                    (type === "input") &&
                    <div className="input_wrap">
                        <input
                            type="text"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            ref={inputRef}
                            placeholder={placeholder}
                            onKeyPress={e => (e.key === "Enter") && handleAdd()}
                        />
                        <button onClick={handleAdd}><PlusIcon/></button>
                    </div>
                }
                {
                    (type === "plus") && <button onClick={handleAddCustom}><PlusIcon/></button>
                }
            </div>
            {
                data?.length > 0 ?
                    <div className="chip_list">
                        {
                            data.map((item, idx) => (
                                (mode === "view") ?
                                    <button className={"chip"} key={`${item}_${idx}`}>
                                        {item}
                                    </button> :
                                    <li className={"chip"} key={`${item.id}`}>
                                        {item.title}
                                        <button onClick={() => handleDelete(item.id)}><DeleteIcon/></button>
                                    </li>
                            ))
                        }
                    </div>
                    : <div className="apply_study_item" style={{placeContent: 'center'}}>
                        <div style={{padding: '50px', textAlignLast: 'center'}}>{nodataMessage}</div>
                    </div>
            }
        </div>
    )
}

export default ChipBox
