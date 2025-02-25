import PropTypes from "prop-types";
import { useEffect, useState } from "react";
function Pagination({ pagination, getProducts }) {
  const [page, setPage] = useState(1);
  useEffect(() => {
    getProducts(page);
  }, [page]);
  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        <li className={`page-item ${!pagination.has_pre ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => setPage(page - 1)}
            disabled={!pagination.has_pre}
          >
            Previous
          </button>
        </li>
        {[...Array(pagination.total_pages).keys()].map((item) => {
          return (
            <li className="page-item" key={item}>
              <button
                className={`page-link ${
                  pagination.current_page == item + 1 ? "active" : ""
                }`}
                disabled={page == item + 1}
                onClick={() => setPage(item + 1)}
              >
                {item + 1}
              </button>
            </li>
          );
        })}

        <li className={`page-item ${!pagination.has_next ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => setPage(page + 1)}
            disabled={!pagination.has_next}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}
Pagination.propTypes = {
  pagination: PropTypes.shape({
    has_pre: PropTypes.bool,
    has_next: PropTypes.bool,
    total_pages: PropTypes.number,
    current_page: PropTypes.number,
    category: PropTypes.string,
  }),
  getProducts: PropTypes.func,
};
export default Pagination;
