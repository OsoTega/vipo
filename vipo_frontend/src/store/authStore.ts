import { BASE_URL } from "@/utils";
import axios from "axios";
import { create } from "zustand";
import { persist } from 'zustand/middleware';

const authStore = (set: any) => ({
    userProfile: null,
    allUsers: null,
    addUser: (user: any) => set({ userProfile: user }),
    removeUser: () => set({ userProfile: null }),
    fetchAllUsers: async () => {
        const response = await axios.get(`${BASE_URL}/api/users`);
        set({ allUsers: response.data });
    }
})

const useAuthStore = create(
    persist(authStore, {
        name: 'auth'
    })
);

export default useAuthStore;