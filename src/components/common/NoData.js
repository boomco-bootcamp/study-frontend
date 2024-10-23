
const NoData = (props) => {
    const {
        message="등록된 게시글이 없습니다."
    } = props;

    return(
        <div className={"no_data_wrap"}>
            {message}
        </div>
    )
}

export default NoData
