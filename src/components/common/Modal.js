import {DeleteIcon} from "../../assets/icons/Icon";


// @INFO
// buttonList = [
//     { text: "취소", handleClick: () => console.log("취소버튼"), className: "cancel" }
//     { text: "확인", handleClick: () => console.log("확인버튼"), className: "confirm" }
// ]
const Modal = (props) => {
    const {
        title,
        buttonList=[],
        handleClose,
        className="",
        children
    } = props;

    return(
        <div className={`modal ${className}`}>
            <div className={"layer"} />
            <div className="modal_box">
                <div className="modal_header">
                    <h3 className={"title"}>{ title ?? "-" }</h3>
                    <button onClick={handleClose}><DeleteIcon/></button>
                </div>
                <div className="modal_container">
                    {children}
                </div>
                {
                    buttonList?.length > 0 &&
                    <div className="modal_footer">
                        {
                            buttonList?.map((btn, idx) => (
                                <button
                                    className={`button ${btn.className}`}
                                    key={`modal_footer_button_${title}_${idx}`}
                                    onClick={(btn.handleClick) && btn.handleClick}
                                >
                                    {btn.text}
                                </button>
                            ))
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default Modal
