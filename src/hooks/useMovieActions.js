/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useCallback } from 'react';

export const useMovieActions = () => {
  const [favorites, setFavorites] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [userRatings, setUserRatings] = useState({});

<<<<<<< Updated upstream
=======
  const getCurrentUser = () => JSON.parse(localStorage.getItem('user'));

  const getKeysForUser = (user) => {
    const userId = user ? user.username : 'guest';
    return {
      favKey: `favorites_${userId}`,
      watchKey: `watchlist_${userId}`,
      ratingKey: `userRatings_${userId}`,
      userId
    };
  };

>>>>>>> Stashed changes
  useEffect(() => {
    const loadData = (key) => JSON.parse(localStorage.getItem(key)) || [];
    setFavorites(loadData('favorites'));
    setWatchlist(loadData('watchlist'));
    setUserRatings(JSON.parse(localStorage.getItem('userRatings')) || {});
  }, []);

  const toggleAction = useCallback((item, type) => {
    const isFav = type === 'fav';
    const key = isFav ? 'favorites' : 'watchlist';
    const setFn = isFav ? setFavorites : setWatchlist;

    setFn(prev => {
      const newList = prev.find(i => i.id === item.id)
        ? prev.filter(i => i.id !== item.id)
        : [...prev, item];
      localStorage.setItem(key, JSON.stringify(newList));
      return newList;
    });
  }, []);

  const handleRate = useCallback((movieId, value) => {
    setUserRatings(prev => {
      const updated = { ...prev };
      if (updated[movieId] === value) {
        delete updated[movieId];
      } else {
        updated[movieId] = value;
      }
      localStorage.setItem('userRatings', JSON.stringify(updated));
      return updated;
    });
  }, []);

  return { favorites, watchlist, userRatings, toggleAction, handleRate };
};