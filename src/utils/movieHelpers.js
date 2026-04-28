export const getMovieMetadata = (credits) => {
  // if (!credits) return {};

  console.log(credits);

  const director = credits.crew
    .filter((person) => person.job === "Director")
    .map((p) => p.name)
    .join(", ");

  const writers = [
    ...new Set(
      credits.crew
        ?.filter((p) => ["Writer", "Screenplay", "Story"].includes(p.job))
        .map((w) => w.name),
    ),
  ].join(", ");

  const stars = credits.cast
    ?.slice(0, 3)
    .map((s) => s.name)
    .join(", ");

  const topCast = credits.cast.slice(0, 18);

  return { crew: { director, writers, stars }, topCast };
};

export const getMovieTrailer = (movieVideos) => {
  const trailer =
    movieVideos.find(
      (vid) =>
        vid.type === "Trailer" &&
        vid.site === "YouTube" &&
        vid.official === true,
    ) ||
    movieVideos.find(
      (vid) => vid.type === "Trailer" && vid.site === "YouTube",
    ) ||
    movieVideos[0];

  return trailer;
};

export const formatRuntime = (totalMinutes) => {
  if (!totalMinutes) return "N/A";
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
};
