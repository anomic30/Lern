import { create } from 'zustand'

const useCourseStore = create((set) => ({
    course: null,
    chapter: null,
    setCourse: (course) => set({ course }),
    setChapter: (chapter) => set({ chapter }),
}))

export default useCourseStore