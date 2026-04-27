import React from 'react';

function ResultsStats({ isLoading, totalResults, genre, displayTitle }) {
  if (isLoading) {
    return (
      <div className="text-muted-foreground text-base font-medium text-center mt-4 w-full bg-card py-5 animate-pulse"></div>
    );
  }

  return (
    <>
      {totalResults > 0 && !isLoading && (
        <p className="text-muted-foreground text-base font-medium text-center mt-4 w-full bg-card py-2">
          There are {totalResults.toLocaleString()} {genre ? displayTitle : ''}{' '}
          movies
        </p>
      )}
    </>
  );
}

export default ResultsStats;
