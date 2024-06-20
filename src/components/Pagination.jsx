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
    totalPages.push(i + 1);
  }

  return (
    <div>
      <button onClick={previousPage}>Previous</button>
      {/* <input
        value={pageNumber}
        onChange={(e) => {
          changePage(e.target.valueAsNumber);
        }}
        type="number"
      /> */}
      {totalPages.map((pageN) => {
        return (
          <button onClick={() => changePage(pageN)} key={pageN}>
            {pageN}
          </button>
        );
      })}
      <button onClick={nextPage}>Next</button>
    </div>
  );
};

export default Pagination;
