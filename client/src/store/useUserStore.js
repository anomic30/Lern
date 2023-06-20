import { create } from 'zustand'

const useUserStore = create((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    logout: () => set({ user: null }),
}))

export default useUserStore

