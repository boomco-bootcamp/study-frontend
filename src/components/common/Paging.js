import { useEffect, useState } from 'react'

const Paging = (props) => {
    const { pagingData, handlePaging } = props

    const handlePagingClick = (num) => {
        handlePaging({ page: num })
    }

    const [fullPage, setFullPage] = useState(0)
    const getFullPage = () => {
        let cnt = 0
        for (let i = pagingData.startPage; i <= pagingData.endPage; i++) {
            cnt++
        }
        setFullPage(cnt)
    }

    useEffect(() => {
        pagingData && getFullPage();
    }, [pagingData])

    if (pagingData) {
        return (
            <div className="paging_wrap">
                {pagingData.totalPage > 0 && (
                    <>
                        <button className="first" disabled={!pagingData.first} onClick={() => handlePagingClick(1)}>
                            <span className="hide">처음</span>
                        </button>
                        <button
                            className="prev"
                            disabled={!pagingData.prev}
                            onClick={() => handlePagingClick(pagingData.startPage - 1)}
                        >
                            <span className="hide">이전</span>
                        </button>
                        {Array(fullPage)
                            .fill(pagingData.startPage)
                            .map((el, idx) => (
                                <button
                                    key={idx}
                                    className={`number ${el + idx === pagingData.page ? 'active' : ''}`}
                                    onClick={() => handlePagingClick(el + idx)}
                                >
                                    {(el + idx)?.toString()}
                                </button>
                            ))}
                        <button
                            className="next"
                            disabled={!pagingData.next}
                            onClick={() => handlePagingClick(pagingData.endPage + 1)}
                        >
                            <span className="hide">다음</span>
                        </button>
                        <button className="last" disabled={!pagingData.end} onClick={() => handlePagingClick(pagingData.totalPage)}>
                            <span className="hide">마지막</span>
                        </button>
                    </>
                )}
            </div>
        )
    } else {
        return <></>
    }
}

export default Paging
