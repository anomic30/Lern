import { create } from 'zustand'

const useQuizStore = create((set) => ({
    quiz: null,
    setQuiz: (quiz) => set({ quiz }),
}))

export default useQuizStore