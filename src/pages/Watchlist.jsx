import React from 'react';
import { Bookmark} from 'lucide-react';
import { useMovieStore } from '@/Store/zustand/useMovieStore';
import MovieCard from '@/components/MovieCard';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Watchlist = () => {
    const watchlist = useMovieStore((state) => state.watchlist);
    const navigate = useNavigate();

    return (
        <div className="min-h-screen px-6 pt-30 pb-10 max-w-7xl mx-auto">

        <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">My Watchlist</h1>
            <p className="text-muted-foreground text-sm mt-1">
            {watchlist.length} {watchlist.length === 1 ? 'movie' : 'movies'}
            </p>
        </div>
        
        {watchlist.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-center">

            <div className="p-6 rounded-full bg-primary/10 mb-4">
                <Bookmark size={48} className="text-primary" />
            </div>

            <h2 className="text-xl font-semibold text-foreground mb-2">
                No watchlist yet
            </h2>

            <p className="text-muted-foreground text-sm mb-4">
                Start adding movies you love 
            </p>

            <Button className='p-5 text-base cursor-pointer'  onClick={() => navigate('/')}>
                Back to Home
            </Button>

            </div>
        ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10">
            {watchlist.map((movie) => (
                movie?.id && (
                <MovieCard key={movie.id} movie={movie} />
                )
            ))}
            </div>
        )}

        </div>
    );
};

export default Watchlist