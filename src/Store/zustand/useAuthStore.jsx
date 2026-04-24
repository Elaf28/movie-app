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
    updateUser: (updatedUser) => {
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const updatedUsers = users.map((u) =>
            u.email === updatedUser.email ? updatedUser : u
        );
        
        localStorage.setItem("users", JSON.stringify(updatedUsers));

        set({ user: updatedUser });
    },
}));