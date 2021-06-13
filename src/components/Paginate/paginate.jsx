import React from "react";

const Paginate = ({ currentPage, itemsPerPage, totalItems, pageSelected }) => {
  const pageNumbers = [];
  const count = Math.ceil(totalItems / itemsPerPage);

  for (let i = 1; i <= count; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination pagination-sm justify-content-end border-0">
        {pageNumbers.map((number) => {
          let classes = "page-item";
          if (number === currentPage) {
            classes += " active";
          }
          return (
            <li key={number} className={classes}>
              <a
                onClick={() => pageSelected(number)}
                href="!#"
                className="page-link"
              >
                {number}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Paginate;
