import React from 'react';

const SearchCardSkeleton = () => {
  return (
    <div className="flex w-full bg-white dark:bg-[var(--card)] border border-gray-200 dark:border-[var(--border)] rounded-xl overflow-hidden h-[160px] md:h-[200px] mb-6 animate-pulse">
      <div className="min-w-[100px] md:min-w-[140px] bg-gray-200 dark:bg-zinc-800" />
      
      <div className="flex flex-col p-4 flex-grow space-y-4">
        <div className="flex justify-between">
          <div className="h-6 bg-gray-200 dark:bg-zinc-800 rounded w-1/2" />
          <div className="flex gap-2">
            <div className="h-8 w-8 bg-gray-200 dark:bg-zinc-800 rounded-full" />
            <div className="h-8 w-8 bg-gray-200 dark:bg-zinc-800 rounded-full" />
          </div>
        </div>
        <div className="h-4 bg-gray-100 dark:bg-zinc-800/50 rounded w-1/4" />
        <div className="space-y-2">
          <div className="h-3 bg-gray-100 dark:bg-zinc-800/50 rounded w-full" />
          <div className="h-3 bg-gray-100 dark:bg-zinc-800/50 rounded w-[90%]" />
        </div>
        <div className="mt-auto h-4 bg-gray-100 dark:bg-zinc-800/50 rounded w-20" />
      </div>
    </div>
  );
};

export default SearchCardSkeleton;