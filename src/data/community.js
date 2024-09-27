
export const communityList = [
    {
        id: "f2bdfdb1-6e96-419f-b9b7-e17aaae32c82",
        title: "커뮤니티 이용 규칙 안내",
        writer: {
            userName: "관리자",
            userId: "admin",
            userIdx: 100001
        },
        createDate: "2024-09-01",
        content: "커뮤니티 이용 시 준수해야 할 규칙을 안내드립니다. 모두가 즐겁게 이용할 수 있도록 협조 부탁드립니다.",
        postType: "notice",
        isReply: true,
        fileList: [],
    },
    {
        id: 6234,
        title: "서버 점검 안내",
        writer: {
            userName: "관리자",
            userId: "admin",
            userIdx: 100001
        },
        createDate: "2024-08-25",
        content: "서버 점검이 예정되어 있습니다. 점검 시간 동안 서비스 이용이 제한될 수 있으니 양해 부탁드립니다.",
        postType: "notice",
        isReply: true,
        fileList: [],
    },
    {
        id: 23546,
        title: "React 프로젝트 팀원 모집",
        writer: {
            userName: "이영희",
            userId: "leeyh88",
            userIdx: 789789
        },
        createDate: "2024-08-29",
        content: "React를 이용한 웹 프로젝트를 함께 진행할 팀원을 모집합니다. 관심 있는 분들은 댓글로 문의 부탁드립니다.",
        postType: "qna",
        isReply: true,
        fileList: [],
    },
    {
        id: 3678,
        title: "사이트 이용 중 궁금한 점 문의드립니다.",
        writer: {
            userName: "박민수",
            userId: "parkms95",
            userIdx: 987654
        },
        createDate: "2024-08-28",
        content: "사이트에서 제공하는 서비스 관련해서 궁금한 점이 있습니다. 문의드립니다.",
        postType: "inquiry",
        isReply: true,
        fileList: [],
    },
    {
        id: 4654,
        title: "신규 가입 인사드립니다.",
        writer: {
            userName: "정수진",
            userId: "jungsj85",
            userIdx: 654321
        },
        createDate: "2024-08-27",
        content: "안녕하세요! 커뮤니티에 새로 가입했습니다. 앞으로 잘 부탁드립니다!",
        postType: "joinMessage",
        isReply: true,
        fileList: [],
    },
    {
        id: 5899,
        title: "자바스크립트에서 배열 다루는 법 질문",
        writer: {
            userName: "김철수",
            userId: "kimcs91",
            userIdx: 456456
        },
        createDate: "2024-08-26",
        content: "자바스크립트에서 배열을 효율적으로 다루는 방법에 대해 질문이 있습니다. 도움 부탁드립니다.",
        postType: "qna",
        isReply: true,
        fileList: [],
    },
    {
        id: 7002,
        title: "커뮤니티 이용 중 발생한 오류 문의",
        writer: {
            userName: "김철수",
            userId: "kimcs91",
            userIdx: 456456
        },
        createDate: "2024-08-24",
        content: "사이트 이용 중 오류가 발생했습니다. 빠른 조치 부탁드립니다.",
        postType: "inquiry",
        isReply: true,
        fileList: [],
    },
    {
        id: 8334,
        title: "새로운 기술 스택 도입에 대한 의견",
        writer: {
            userName: "최지훈",
            userId: "choijh83",
            userIdx: 321321
        },
        createDate: "2024-08-23",
        content: "새로운 기술 스택을 도입하려고 하는데, 커뮤니티의 의견을 듣고 싶습니다.",
        postType: "qna",
        isReply: true,
        fileList: [],
    }
];


export const commReplyList = [
    {
        id: 1123,
        replyList: [
            {
                idx: 333323,
                userName: "김철수",
                userId: "kimcs91",
                userIdx: 456456,
                content: "잘 부탁드립니다~",
                createDate: "2024-08-30",
                reReplyList: [],
            },
            {
                idx: 333324,
                userName: "이영희",
                userId: "leeyh88",
                userIdx: 789789,
                content: "재밌을꺼같아요!",
                createDate: "2024-08-30",
                reReplyList: [],
            }
        ],
    },
    {
        id: 6234,
        replyList: [
            {
                idx: 333325,
                userName: "최지훈",
                userId: "choijh83",
                userIdx: 321321,
                content: "잘 부탁드립니다~",
                createDate: "2024-08-12",
                reReplyList: [],
            },
        ],
    },
    {
        id: 23546,
        replyList: [
            {
                idx: 333326,
                userName: "박민수",
                userId: "parkms95",
                userIdx: 987654,
                content: "열심히 하겠습니다!",
                createDate: "2024-08-12",
                reReplyList: [],
            }
        ],
    },
    {
        id: 3678,
        replyList: [
            {
                idx: 3333237,
                userName: "김철수",
                userId: "kimcs91",
                userIdx: 456456,
                content: "오프라인 모임이 있나요?",
                createDate: "2024-08-09",
                reReplyList: [
                    {
                        idx: 44443,
                        userName: "Teddy Kwak",
                        userId: "teddy9292",
                        userIdx: 456400,
                        content: "신청한 인원에게 따로 안내드리고 있습니다!",
                        createDate: "2024-08-10",
                    },
                ]
            },
            {
                idx: 3333238,
                userName: "정수진",
                userId: "jungsj85",
                userIdx: 654321,
                content: "마지막이라고 생각하고 열심히 해보겠습니다~!",
                createDate: "2024-08-09",
                reReplyList: [],
            }
        ],
    },
    {
        id: 5899,
        createDate: "2024-08-01",
        replyList: [
            {
                idx: 3333239,
                userName: "이영희",
                userId: "leeyh88",
                userIdx: 789789,
                content: "다같이 모여서 스터디 하는거 너무 좋네요~!",
                createDate: "2024-08-09",
                reReplyList: [],
            }
        ]
    },
    {
        id: 8334,
        replyList: [
            {
                idx: 4433238,
                userName: "정수진",
                userId: "jungsj85",
                userIdx: 654321,
                content: "graphQl 어떨까요? 서버리스 사용하는 사이드프로젝트 구현시 유용하게 쓸 수 있을것 같습니다~",
                createDate: "2024-08-09",
                reReplyList: [
                    {
                        idx: 4433239,
                        userName: "최지훈",
                        userId: "choijh83",
                        userIdx: 321321,
                        content: "좋은 생각이네요! 다른 새로도입할 기술목록을 만들어놓고 의견을 나누어 봅시다!",
                        createDate: "2024-08-11",
                    },
                ],
            },

        ],
    },
]
