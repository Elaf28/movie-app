import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";
import toast from "react-hot-toast";

export const useMovieStore = create((set, get) => ({
    favorites: [],
    watchlist: [],

    syncWithUser: () => {
        const user = useAuthStore.getState().user;
        set({
            favorites: user?.favorites || [],
            watchlist: user?.watchlist || [],
        });
    },

    toggleFavorite: (movie) => {
        const { favorites } = get();
        const user = useAuthStore.getState().user;

        if (!user) {
            toast.error("Please login first");
            return;
        }

        const exists = favorites.some((m) => m.id === movie.id);
        let newFavorites;

        if (exists) {
            newFavorites = favorites.filter((m) => m.id !== movie.id);
            toast("Removed from favorites");
        } else {
            newFavorites = [...favorites, movie];
            toast.success("Added to favorites");
        }

        const updatedUser = { ...user, favorites: newFavorites };
        useAuthStore.getState().updateUser(updatedUser);

        set({ favorites: newFavorites });
    },

    toggleWatchlist: (movie) => {
        const { watchlist } = get();
        const user = useAuthStore.getState().user;

        if (!user) {
            toast.error("Please login first");
            return;
        }

        const exists = watchlist.some((m) => m.id === movie.id);
        let newWatchlist;

        if (exists) {
            newWatchlist = watchlist.filter((m) => m.id !== movie.id);
            toast("Removed from watchlist");
        } else {
            newWatchlist = [...watchlist, movie];
            toast.success("Added to watchlist");
        }

        const updatedUser = { ...user, watchlist: newWatchlist };
        useAuthStore.getState().updateUser(updatedUser);

        set({ watchlist: newWatchlist });
    },
}));