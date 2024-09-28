import React from 'react';

const Pagination = ({
    itemPerPage,
    currentPage,
    total,
    totalPages,
    handlePageChange
}) => {
  return (
    <div className="p-5">

        <div className="flex justify-center mt-5">
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className={`mx-1 px-3 py-1 border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
                >
                    {index + 1}
                </button>
            ))}
        </div>
    </div>
  );
};

export default Pagination;