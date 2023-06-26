import { create } from 'zustand'

const useUserStore = create((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    logout: () => set({ user: null }),
    addCourse: (course) => set((state) => ({ user: { ...state.user, courses: [...state.user.courses, course] } })),
}))

export default useUserStore

