// components/Pagination.tsx
import React from 'react'
import ReactPaginate from 'react-paginate'

import { DarkLeftArrowIcons, DarkRightArrowIcons } from '../Icons'

import { PaginationProps } from './interface'

const Pagination: React.FC<PaginationProps> = ({ onPageChange, pageCount }) => {
  return (
    <div className="mt-11 flex items-center justify-center ">
      <ReactPaginate
        activeClassName={'pagination__link--active'}
        breakLabel="..."
        containerClassName={'pagination'}
        disabledClassName={'pagination__link--disabled'}
        nextLabel={<DarkRightArrowIcons />}
        nextLinkClassName={'pagination__link'}
        pageCount={pageCount}
        pageRangeDisplayed={5}
        previousLabel={<DarkLeftArrowIcons />}
        previousLinkClassName={'pagination__link'}
        renderOnZeroPageCount={null}
        onPageChange={onPageChange}
        // initialPage={0}
        // forcePage={3}
      />
    </div>
  )
}

export default Pagination
