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
    <Pagination className="mt-12 mb-8">
      <PaginationContent className="bg-card rounded-xl px-2 py-1 gap-4">
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(page - 1)}
            className={`text-base ${page === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink
            // className={`cursor-pointer h-10 w-10 text-base ${page === 1 ? 'bg-primary text-primary-foreground' : ''}`}
            className="cursor-pointer h-10 w-10 text-base"
            onClick={() => onPageChange(1)}
            isActive={page === 1}
            // className="cursor-pointer"
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
              className="cursor-pointer h-10 w-10 text-base"
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
              className="cursor-pointer h-10 w-10 text-base"
            >
              {actualTotalPages}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(page + 1)}
            className={`text-base ${page === actualTotalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
export default AppPagination;
