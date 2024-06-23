import React from 'react';

// @ts-ignore
const Pagination = ({ totalPages, currentPage, onChange }) => {
    const handlePageChange = (pageNumber: number) => {
        onChange(pageNumber);
    };

    return (
        <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                <button
                    key={pageNumber}
                    className={`pagination-button ${currentPage === pageNumber ? 'active' : ''}`}
                    onClick={() => handlePageChange(pageNumber)}
                >
                    {pageNumber}
                </button>
            ))}
        </div>
    );
};

export default Pagination;