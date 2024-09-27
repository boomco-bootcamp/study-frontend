
// study 상태
export const STATUS_DATA = {
    ready: "모집중",
    proceeding: "진행중",
    closure: "종료"
}

// 거뮤니티 게시글 성격
export const COMMUNITY_TYPE = {
    notice: "공지",
    inquiry: "문의",
    joinMessage: "가입인사",
    qna: "질의응답",
    free: "자유글"
}

// 커뮤니티 게시글 조회 필터
export const COMM_FILTER = {
    asc: "최신순",
    view: "조회수",
    reply: "댓글많은순"
}

// 기본 confirm, alert 모달
export const MODAL_INFO = {
    message: "",
    status: false,
    handleConfirm: () => {},
    handleCancel: () => {}
}
