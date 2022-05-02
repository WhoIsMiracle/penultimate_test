import React, { useState } from "react";
import cls from './users.module.scss';

type paginatorProps = {
    totalCount: number
    pageSize: number
    changePage: (page: number) => void
    currentPage: number
    portionSize: number
}

const Paginator: React.FC<paginatorProps> = ({  totalCount,
                                                pageSize, 
                                                changePage, 
                                                portionSize=10, 
                                                currentPage, ...props  }) => {                     
    let countPages = Math.ceil(totalCount / pageSize)
    let pages = []
    for(let i=1; i <= countPages; i++){
        pages.push(i)
    }
    let [currentPortion, setCurrentPortion] = useState(0) 
    let countPortions = Math.ceil(countPages / portionSize)
    let leftPortionPage = (currentPortion * portionSize) + 1
    let rightPortionPage = leftPortionPage + portionSize - 1
    const changePortion = (direction: boolean) => {
        return currentPortion > 0 && direction === false ? currentPortion - 1
        : currentPortion >= 0 && currentPortion < countPortions - 1 && direction === true ? currentPortion + 1
        : currentPortion === 0 ? 0 : countPortions - 1
    }
    return(
        <div className={cls.paginator}>
            <button onClick={() => setCurrentPortion(changePortion(false))}>Prev</button>
            {pages.filter((page) => {
                return page >= leftPortionPage && page <= rightPortionPage
            }).map((page, index) => {
                return <button className={currentPage === page ? cls.page__current : cls.page__other} 
                    key={page + index} 
                        onClick={() => changePage(page)}>{page}</button>
            })}
            <button onClick={() => setCurrentPortion(changePortion(true))}>Next</button>
        </div>
    )
}

export default Paginator;