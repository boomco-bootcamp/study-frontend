import {useEffect, useState} from "react";

const Search = ({
                    selectList,
                    selectedValue,
                    handleSearch=()=>{},
                    placeholder="검색어를 입력하세요."
}) => {

    const [searchInput, setSearchInput] = useState("");
    const [activeSelect, setActiveSelect] = useState("all");

    useEffect(() => {
        selectedValue && setActiveSelect(selectedValue);
    }, [selectedValue])

    return(
        <div className={"search_wrap"}>
            {
                (selectList?.length > 0) &&
                <select defaultValue={activeSelect} onChange={e=>setActiveSelect(e.target.value)}>
                    <option value={"all"}>전체</option>
                    {
                        selectList?.map(sel => (
                            <option value={sel.id} key={sel.id}>{sel.title}</option>
                        ))
                    }
                </select>
            }
            <div className="input_button_wrap">
                <input
                    type="text"
                    value={searchInput}
                    onChange={e=>setSearchInput(e.target.value)}
                    onKeyPress={e => (e.key === "Enter") && handleSearch(searchInput, activeSelect)}
                    placeholder={placeholder}
                />
                <button onClick={() => handleSearch(searchInput, activeSelect)}>Search</button>
            </div>
        </div>
    )
}

export default Search
