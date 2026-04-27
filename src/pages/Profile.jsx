import { useAuthStore } from '@/Store/zustand/useAuthStore';
import { useMovieStore } from '@/Store/zustand/useMovieStore';
import React from 'react';
import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar";
import { Link, useNavigate } from 'react-router';
import MovieCard from '@/components/MovieCard';

const Profile = () => {
    const user = useAuthStore((state) => state.user);
    const favorites = useMovieStore((state) => state.favorites) || [];
    const watchlist = useMovieStore((state) => state.watchlist) || [];

    const navigate = useNavigate();

    const initials = user?.name?.charAt(0)?.toUpperCase()

    return (
    <div className='min-h-screen px-4 py-10 max-w-7xl mx-auto'>
        <div className=' mb-8 flex items-center gap-6'>
            <Avatar className="w-24 h-24">
                <AvatarFallback className='text-3xl bg-primary text-primary-foreground'>
                    {initials}
                </AvatarFallback>
            </Avatar>

            <div>
                <h2 className='text-2xl font-bold text-foreground'>
                    {user?.name}
                </h2>
                <p className='text-muted-foreground'>
                    {user?.email}
                </p>
            </div>
        </div>

        <hr />

        <div className="my-8">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-semibold">Favorites</h3>

                <Link className='text-lg underline text-primary' onClick={() => navigate('/favorites')}>
                    See All
                </Link>
            </div>

            {favorites.length === 0 ? (
                <p className="text-muted-foreground">No favorites yet</p>
                ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {favorites.slice(0, 4).map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </div>

        <hr />

        {/* Watchlist */}
        <div>
            <div className="flex justify-between items-center my-8">
                <h3 className="text-2xl font-semibold">Watchlist</h3>

                <Link className='text-lg underline text-primary' onClick={() => navigate('/watchlist')}>
                    See All
                </Link>
            </div>

            {watchlist.length === 0 ? (
                <p className="text-muted-foreground">No watchlist yet</p>
                ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {watchlist.slice(0, 4).map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
            </div>
        </div>
    );
};

export default Profile;