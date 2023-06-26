import { create } from 'zustand'

const useCourseStore = create((set) => ({
    course: null,
    chapter: null,
    setCourse: (course) => set({ course }),
    setChapter: (chapter) => set({ chapter }),
    setChapterQuizId: (chapterId, quizId) => set((state) => ({ course: { ...state.course, chapters: state.course.chapters.map((chapter, i) => chapter._id === chapterId ? { ...chapter, quizId: quizId } : chapter) } })),
}))

export default useCourseStore