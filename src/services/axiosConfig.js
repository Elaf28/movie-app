import axios from 'axios';

const tmdbApi = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
});

tmdbApi.interceptors.request.use((config) => {
    config.headers.Authorization= `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`
    return config;
});

export default tmdbApi;