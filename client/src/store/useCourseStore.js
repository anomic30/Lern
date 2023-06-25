import { create } from 'zustand'

const useCourseStore = create((set) => ({
    course: null,
    setCourse: (course) => set({ course }),
}))

export default useCourseStore

