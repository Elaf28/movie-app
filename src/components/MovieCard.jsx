import React from 'react';
import { Heart, Bookmark, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMovieStore } from '@/Store/zustand/useMovieStore';

const MovieCard = ({ movie }) => {
    const { favorites, watchlist, toggleFavorite, toggleWatchlist } = useMovieStore();

    const isFavorite = favorites.some((m) => m.id === movie.id);
    const inWatchlist = watchlist.some((m) => m.id === movie.id);

    const title = movie.title || movie.name;
    const rating = movie.vote_average?.toFixed(1) || "0.0";
    const releaseDate =
        (movie.release_date || movie.first_air_date)?.split('-')[0] || "";

    const mediaType =
        movie.media_type || (movie.first_air_date ? "tv" : "movie");

    const posterUrl =
        movie.poster_path || movie.poster
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path || movie.poster}`
        : "/no-image.png";

    return (
        <Link to={`/movie/${movie.id}`}>
        <div className="group w-full max-w-[200px] cursor-pointer">

            {/* Image */}
            <div className="relative aspect-[2/3] w-full rounded-xl overflow-hidden shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">

            <img
                src={posterUrl}
                alt={title}
                className="w-full h-full object-cover"
            />

            {/* Rating */}
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 text-white text-xs flex items-center gap-1">
                <Star size={12} className="text-yellow-400 fill-yellow-400" />
                {rating}
            </div>

            <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">

                <button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleFavorite(movie);
                }}
                className={`p-3 rounded-full transition ${
                    isFavorite
                    ? "bg-red-500 text-white"
                    : "bg-black/50 text-white hover:bg-red-500"
                }`}
                >
                <Heart size={18} fill={isFavorite ? "white" : "none"} />
                </button>

                <button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleWatchlist(movie);
                }}
                className={`p-3 rounded-full transition ${
                    inWatchlist
                    ? "bg-primary text-primary-foreground"
                    : "bg-black/50 text-white hover:bg-primary"
                }`}
                >
                <Bookmark size={18} fill={inWatchlist ? "currentColor" : "none"} />
                </button>

            </div>
            </div>

            {/* Info */}
            <div className="mt-2 px-1">
            <h3 className="text-sm font-semibold text-foreground line-clamp-1 group-hover:text-primary transition">
                {title}
            </h3>

            <div className="flex justify-between items-center text-xs text-muted-foreground mt-1">
                <span>{releaseDate}</span>

                <span className="px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 uppercase text-[10px]">
                {mediaType}
                </span>
            </div>
            </div>

        </div>
        </Link>
    );
};

export default MovieCard;