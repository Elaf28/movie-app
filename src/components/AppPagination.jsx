import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

function AppPagination({ page, totalPages, onPageChange }) {
  const actualTotalPages = Math.min(totalPages, 500);

  const getPageNumbers = () => {
    const pages = [];
    const start = Math.max(2, page - 2);
    const end = Math.min(actualTotalPages - 1, page + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(page - 1)}
            className={
              page === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'
            }
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink
            onClick={() => onPageChange(1)}
            isActive={page === 1}
            className="cursor-pointer"
          >
            1
          </PaginationLink>
        </PaginationItem>

        {page > 4 && <PaginationEllipsis />}

        {pageNumbers.map((num) => (
          <PaginationItem key={num}>
            <PaginationLink
              onClick={() => onPageChange(num)}
              isActive={page === num}
              className="cursor-pointer"
            >
              {num}
            </PaginationLink>
          </PaginationItem>
        ))}

        {page < actualTotalPages - 3 && <PaginationEllipsis />}

        {actualTotalPages > 1 && (
          <PaginationItem>
            <PaginationLink
              onClick={() => onPageChange(actualTotalPages)}
              isActive={page === actualTotalPages}
              className="cursor-pointer"
            >
              {actualTotalPages}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(page + 1)}
            className={
              page === actualTotalPages
                ? 'pointer-events-none opacity-50'
                : 'cursor-pointer'
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
export default AppPagination;
