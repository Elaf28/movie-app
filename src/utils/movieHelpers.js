export const getMovieMetadata = (movie) => {
  if (!movie || !movie.credits) return {};

  const director = movie.credits.crew
    .filter((person) => person.job === "Director")
    .map((p) => p.name)
    .join(", ");

  const writers = movie.credits.crew
    ?.filter((person) => ["Writer", "Screenplay", "Story"].includes(person.job))
    .map((w) => w.name)
    .join(", ");

  const stars = movie.credits.cast
    .slice(0, 3)
    .map((s) => s.name)
    .join(", ");

  const trailer =
    movie.videos?.results.find(
      (vid) =>
        vid.type === "Trailer" &&
        vid.site === "YouTube" &&
        vid.official === true,
    ) ||
    movie.videos?.results.find(
      (vid) => vid.type === "Trailer" && vid.site === "YouTube",
    ) ||
    movie.videos?.results[0];

  const trailerYoutubeKey = trailer?.key;

  return { director, writers, stars, trailerYoutubeKey };
};

export const formatRuntime = (totalMinutes) => {
  if (!totalMinutes) return "N/A";
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
};
