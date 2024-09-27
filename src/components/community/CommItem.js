
import {COMMUNITY_TYPE} from "../../util/const";

const CommItem = ({data, index, handleDetail}) => {


    return(
        <div className="row" onClick={() => handleDetail(data.id)}>
            <div className="col no">{data.postType === "notice" ? "📢" : index}</div>
            <div className="col title">
                <p className={"ellipsis"}><b>[{COMMUNITY_TYPE[data.postType]}]</b>&nbsp;{data.title}</p>
            </div>
            <div className="col writer">{data.writer.userId}</div>
            <div className="col date">{data.createDate}</div>
        </div>
    )
}

export default CommItem
