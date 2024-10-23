
import {COMMUNITY_TYPE} from "../../util/const";
import dayjs from "dayjs";

const CommItem = ({data, index, handleDetail}) => {

    return(
        <div className="row" onClick={() => handleDetail(data?.stdyComtId)}>
            <div className="col no">{data?.stdyComSt === "notice" ? "📢" : index}</div>
            <div className="col title">
                <p className={"ellipsis"}><b>[{COMMUNITY_TYPE[data.stdyComSt]}]</b>&nbsp;{data.stdyComTitle}</p>
            </div>
            <div className="col writer">{data?.rgsnUserId}</div>
            <div className="col date">{dayjs(data?.rgsnTs).format("YYYY-MM-DD HH:mm")}</div>
        </div>
    )
}

export default CommItem
