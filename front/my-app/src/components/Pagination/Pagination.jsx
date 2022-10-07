import React from 'react';

const Pagination = ({ heroesOnPage, totalHero,paginate }) => {
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalHero / heroesOnPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <div className="center">
            <ul className='pagination'>
                {
                    pageNumbers.map(number => (
                        <li className='page-item' key={number}>
                            <a  className='page-link' onClick={()=>{paginate(number)}}>
                                {number}
                            </a>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Pagination;