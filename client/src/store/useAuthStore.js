import { create } from 'zustand'

const useAuthStore = create((set) => ({
    auth: null,
    setAuth: (auth) => set({ auth }),
    logout: () => set({ auth: null }),
}))

export default useAuthStore
