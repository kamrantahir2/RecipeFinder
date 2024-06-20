import { useEffect } from "react";
import usePagination from "./usePagination.js";

const Pagination = (props) => {
  const { pageNumber, changePage, pageData, nextPage, previousPage } =
    usePagination(props.items, props.pageLimit);

  useEffect(() => {
    props.setPageItems(pageData);
  }, [pageNumber]);

  return (
    <div>
      <button onClick={previousPage}>Previous</button>
      <input
        value={pageNumber}
        onChange={(e) => {
          changePage(e.target.valueAsNumber);
        }}
        type="number"
      />
      <button onClick={nextPage}>Next</button>
    </div>
  );
};

export default Pagination;
