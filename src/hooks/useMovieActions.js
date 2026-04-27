/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useCallback } from 'react';

export const useMovieActions = () => {
  const [favorites, setFavorites] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [userRatings, setUserRatings] = useState({});

<<<<<<< HEAD
<<<<<<< Updated upstream
=======
  const getCurrentUser = () => JSON.parse(localStorage.getItem('user'));

=======
  // دالة مساعدة لجلب اليوزر الحالي في أي لحظة
  const getCurrentUser = () => JSON.parse(localStorage.getItem('user'));

  // دالة لجلب المفاتيح بناءً على يوزر معين
>>>>>>> main
  const getKeysForUser = (user) => {
    const userId = user ? user.username : 'guest';
    return {
      favKey: `favorites_${userId}`,
      watchKey: `watchlist_${userId}`,
      ratingKey: `userRatings_${userId}`,
      userId
    };
  };

<<<<<<< HEAD
>>>>>>> Stashed changes
=======
  // 1. تحميل البيانات عند البداية
>>>>>>> main
  useEffect(() => {
    const user = getCurrentUser();
    const { favKey, watchKey, ratingKey } = getKeysForUser(user);
    
    const loadData = (key) => JSON.parse(localStorage.getItem(key)) || [];
    
    setFavorites(loadData(favKey));
    setWatchlist(loadData(watchKey));
    setUserRatings(JSON.parse(localStorage.getItem(ratingKey)) || {});
  }, []);

  // 2. دالة الـ Toggle
  const toggleAction = useCallback((item, type) => {
    const user = getCurrentUser(); // بنقرأ اليوزر هنا "فورا" عند الضغط
    const { favKey, watchKey, userId } = getKeysForUser(user);

    if (!user || userId === 'guest') {
      alert("Please login to save your list!");
      return;
    }

    const isFav = type === 'fav';
    const storageKey = isFav ? favKey : watchKey;
    const setFn = isFav ? setFavorites : setWatchlist;

    setFn(prev => {
      const newList = prev.find(i => i.id === item.id)
        ? prev.filter(i => i.id !== item.id)
        : [...prev, item];
      
      localStorage.setItem(storageKey, JSON.stringify(newList));
      return newList;
    });
  }, []);

  // 3. دالة التقييم
  const handleRate = useCallback((movieId, value) => {
    const user = getCurrentUser();
    const { ratingKey, userId } = getKeysForUser(user);

    if (!user || userId === 'guest') return;

    setUserRatings(prev => {
      const updated = { ...prev };
      if (updated[movieId] === value) {
        delete updated[movieId];
      } else {
        updated[movieId] = value;
      }
      localStorage.setItem(ratingKey, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return { favorites, watchlist, userRatings, toggleAction, handleRate };
};