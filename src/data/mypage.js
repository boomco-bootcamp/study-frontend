
// 관심카테고리 임시데이터
export const likeCategoryList = [
    {
        id: "category_1",
        title: "개발 · 프로그래밍",
    },
    {
        id: "category_2",
        title: "프론트엔드",
    },
    {
        id: "category_4",
        title: "풀스택",
    },
    {
        id: "category_5",
        title: "모바일 앱 개발",
    },
]

// 관심 태그 임시데이터
export const likeTagList = [
    "풀스택", "프론트엔드", "react", "nextjs", "fullstack"
]

// 가입된&신청한 스터디목록 임시데이터
export const appliedStudyList = [
    {
        applyStatus: false,
        title: "물경력을 기업이 먼저 찾는 이온 음료로 만드는 작은 학습 습관을 함께 만들어가실 스터디원을 찾습니다.",
        userName: "supxyrho",
        id: 27150,
        tagList: ["자기개발", "웹 개발"],
        category: {
            id: "category_1",
            title: "개발 · 프로그래밍"
        },
        status: "ready",
        createDate: "2024-08-10",
        like: 18,
        view: 120,
        participants: [
            {
                userName: "최지훈",
                userId: "choijh83",
                userIdx: 321321
            }
        ],
        content: "하루에 작은 시간씩 투자해 학습 습관을 형성하고 싶으신가요?\n저희 스터디는 꾸준한 자기 개발을 지향하며, 실전 프로젝트와 학습을 병행합니다.\n함께 도전하고 성장할 분을 기다립니다!"
    },
    {
        applyStatus: true,
        title: "[자바스프링 백엔드] 포폴 기반 실전 면접 연습",
        userName: "Tom C.",
        id: 27163,
        tagList: ["자기개발", "웹 개발"],
        category: {
            id: "category_4",
            title: "풀스택",
        },
        status: "closure",
        createDate: "2024-08-01",
        like: 1,
        view: 68,
        participants: [],
        content: "자바스프링 백엔드 포트폴리오를 기반으로 실전 면접을 준비하는 스터디입니다.\n모의 면접을 통해 실제 인터뷰 경험을 쌓고,\n피드백을 통해 면접 대응 능력을 향상시키는 것을 목표로 했습니다."
    }
]

// 관심있는 스터디목록 임시데이터
export const likeStudyList = [
    {
        title: "[자바스프링 백엔드] 포폴 기반 실전 면접 연습",
        userName: "Tom C.",
        id: 27163,
        tagList: ["자기개발", "웹 개발"],
        category: {
            id: "category_1",
            title: "개발 · 프로그래밍"
        },
        status: "closure",
        createDate: "2024-08-01",
        like: 1,
        view: 68,
        participants: [],
        content: "자바스프링 백엔드 포트폴리오를 기반으로 실전 면접을 준비하는 스터디입니다.\n모의 면접을 통해 실제 인터뷰 경험을 쌓고,\n피드백을 통해 면접 대응 능력을 향상시키는 것을 목표로 했습니다."
    }
]

// 관리자 studyList
export const adminStudyList = [
    {
        title: "웹 프로젝트 같이 하실 분 구합니다 (FE react)",
        userName: "스프링은 개발자",
        id: 27174,
        tagList: ["웹 개발", "react", "프론트엔드"],
        category: {
            id: "category_2",
            title: "프론트엔드"
        },
        status: "proceeding",
        createDate: "2024-08-29",
        like: 15,
        view: 80,
        applyParticipants: [
            {
                userName: "김철수",
                userId: "kimcs91",
                userIdx: 456456,
                applyStatus: false,
            },
            {
                userName: "이영희",
                userId: "leeyh88",
                userIdx: 789789,
                applyStatus: true,

            }
        ],
        content: "React로 웹 프로젝트를 진행할 프론트엔드 개발자를 구합니다.\n함께 협업하여 실제 서비스 개발 경험을 쌓고 싶으신 분들을 환영합니다.\n코드 리뷰와 지속적인 피드백을 통해 함께 성장해요!"
    },
    {
        title: "물경력을 기업이 먼저 찾는 이온 음료로 만드는 작은 학습 습관을 함께 만들어가실 스터디원을 찾습니다.",
        userName: "supxyrho",
        id: 27150,
        tagList: ["자기개발", "웹 개발"],
        applyParticipants: [
            {
                id: "category_1",
                title: "개발 · 프로그래밍"
            },
            {
                id: "category_2",
                title: "프론트엔드"
            }
        ],
        status: "ready",
        createDate: "2024-08-10",
        like: 18,
        view: 120,
        participants: [
            {
                userName: "최지훈",
                userId: "choijh83",
                userIdx: 321321,
                applyStatus: false,
            }
        ],
        content: "하루에 작은 시간씩 투자해 학습 습관을 형성하고 싶으신가요?\n저희 스터디는 꾸준한 자기 개발을 지향하며, 실전 프로젝트와 학습을 병행합니다.\n함께 도전하고 성장할 분을 기다립니다!"
    },
    {
        title: "(직장인 평일 새벽,저녁 && 주말 코딩 공부) 디스코드 모각코 ToDoList 스터디원 모집",
        userName: "GoldenBoy 골든보이",
        id: 27122,
        tagList: ["자기개발", "웹 개발"],
        category: {
            id: "category_1",
            title: "개발 · 프로그래밍"
        },
        status: "ready",
        createDate: "2024-08-01",
        like: 10,
        view: 150,
        applyParticipants: [
            {
                userName: "이영희",
                userId: "leeyh88",
                userIdx: 789789,
                applyStatus: false,
            },
            {
                userName: "박민수",
                userId: "parkms95",
                userIdx: 987654,
                applyStatus: true,
            }
        ],
        content: "직장인들을 위한 새벽, 저녁, 주말 모각코 스터디입니다.\n디스코드를 통해 서로의 작업을 체크하며 동기부여를 얻고,\n목표를 이루기 위해 함께 공부해 나갈 스터디원을 모집합니다."
    },
    {
        title: "개발과외 모집",
        userName: "Teddy Kwak",
        id: 27120,
        tagList: ["자기개발", "웹 개발"],
        category: {
            id: "category_6",
            title: "알고리즘 · 자료구조"
        },
        status: "proceeding",
        createDate: "2024-08-01",
        like: 60,
        view: 300,
        applyParticipants: [
            {
                userName: "김철수",
                userId: "kimcs91",
                userIdx: 456456,
                applyStatus: false,
            },
            {
                userName: "박민수",
                userId: "parkms95",
                userIdx: 987654,
                applyStatus: false,
            },
            {
                userName: "최지훈",
                userId: "choijh83",
                userIdx: 321321,
                applyStatus: false,
            },
            {
                userName: "정수진",
                userId: "jungsj85",
                userIdx: 654321,
                applyStatus: true,
            }
        ],
        content: "개발 입문자를 대상으로 한 과외 스터디를 진행합니다.\n기초부터 고급 알고리즘과 자료구조까지 다루며,\n실력 향상을 목표로 함께 공부하고 피드백을 제공합니다."
    },
]

