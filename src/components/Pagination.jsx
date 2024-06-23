import { useEffect } from "react";
import usePagination from "./usePagination.js";

const Pagination = (props) => {
  const { pageNumber, changePage, pageData, nextPage, previousPage } =
    usePagination(props.items, props.pageLimit);

  useEffect(() => {
    props.setPageItems(pageData);
  }, [pageNumber]);

  let totalPages = [];

  for (let i = 0; i < props.items.length / props.pageLimit; i++) {
    totalPages.push(i);
  }

  return (
    <div className="mt-5 text-white join">
      <button className="join-item" onClick={previousPage}>
        Previous
      </button>

      {totalPages.map((pageN) => {
        return (
          <button
            className="join-item btn text-white"
            onClick={() => changePage(pageN)}
            key={pageN}
          >
            {pageN + 1}
          </button>
        );
      })}
      <button className="join-item" onClick={nextPage}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
