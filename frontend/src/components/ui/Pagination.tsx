import { Button } from './Button';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({ currentPage, totalPages, onPageChange, className = '' }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className={`flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 ${className}`}>
      <div className="flex flex-1 justify-between sm:hidden">
        <Button variant="secondary" size="sm" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage <= 1}>
          Previous
        </Button>
        <Button variant="secondary" size="sm" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage >= totalPages}>
          Next
        </Button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Page <span className="font-medium text-gray-900 dark:text-white">{currentPage}</span> of{' '}
            <span className="font-medium text-gray-900 dark:text-white">{totalPages}</span>
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage <= 1}>
            Previous
          </Button>
          <Button variant="secondary" size="sm" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage >= totalPages}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
