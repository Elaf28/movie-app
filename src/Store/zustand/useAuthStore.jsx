import { create } from "zustand";
export const useAuthStore = create((set) => ({
    user: JSON.parse(localStorage.getItem("currentUser")) || null,

    login: (user) => {
        localStorage.setItem("currentUser", JSON.stringify(user));
        set({ user });
    },

    logout: () => {
        localStorage.removeItem("currentUser");
        set({ user: null });
    },
}));