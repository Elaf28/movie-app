import React from "react";

function ResultsStats({ isLoading, totalResults, genre, displayTitle }) {
  if (isLoading) {
    return (
      <div className="text-muted-foreground bg-card mt-8 w-full animate-pulse py-5 text-center text-base font-medium"></div>
    );
  }

  return (
    <>
      {totalResults > 0 && !isLoading && (
        <p className="text-muted-foreground bg-card mt-8 w-full py-2 text-center text-base font-medium">
          There are {totalResults.toLocaleString()} {genre ? displayTitle : ""}{" "}
          movies
        </p>
      )}
    </>
  );
}

export default ResultsStats;
