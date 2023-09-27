import ReactPaginate from 'react-paginate';
import { FC } from 'react';
import { PaginatorInterface } from './types';

const PaginatedItems: FC<PaginatorInterface> = ({
  itemsPerPage,
  count,
  onSetPage,
  forcedPage,
}) => {
  const pageCount = Math.ceil(count / itemsPerPage);

  const handlePageClick = ({ selected }: { selected: number }) => {
    onSetPage(selected + 1);
  };

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel="Вперед >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< Назад"
        renderOnZeroPageCount={null}
        forcePage={forcedPage - 1}
        containerClassName="pagination_container"
        pageLinkClassName="page_pagination"
        previousLinkClassName="previous_next"
        nextLinkClassName="previous_next"
        activeLinkClassName="active_page"
        disabledClassName="disabled_page"/>
    </>
  );
};

export default PaginatedItems;
