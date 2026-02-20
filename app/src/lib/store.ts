import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProgressState {
    completedLessons: string[];
    completedQuizzes: string[];
    points: number;
    streak: number;
    lastActivityDate: string | null;

    // Actions
    completeLesson: (lessonId: string) => void;
    isLessonCompleted: (lessonId: string) => boolean;
    completeQuiz: (quizId: string) => void;
    isQuizCompleted: (quizId: string) => boolean;
}

export const useProgressStore = create<ProgressState>()(
    persist(
        (set, get) => ({
            completedLessons: [],
            completedQuizzes: [],
            points: 0,
            streak: 0,
            lastActivityDate: null,

            completeLesson: (lessonId: string) => {
                const { completedLessons, lastActivityDate, streak, points } = get();

                if (completedLessons.includes(lessonId)) return; // Already done

                const today = new Date().toISOString().split('T')[0];
                let newStreak = streak;

                if (lastActivityDate !== today) {
                    // Check if yesterday was the last activity to increment streak
                    const yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1);
                    const yesterdayStr = yesterday.toISOString().split('T')[0];

                    if (lastActivityDate === yesterdayStr) {
                        newStreak += 1;
                    } else if (lastActivityDate === null) {
                        newStreak = 1;
                    } else {
                        // Reset streak if gap > 1 day (strict mode) or keep simple for now
                        newStreak = 1;
                    }
                }

                set({
                    completedLessons: [...completedLessons, lessonId],
                    points: points + 10,
                    streak: newStreak,
                    lastActivityDate: today
                });
            },

            isLessonCompleted: (lessonId: string) => {
                return get().completedLessons.includes(lessonId);
            },

            completeQuiz: (quizId: string) => {
                const { completedQuizzes, points } = get();
                if (completedQuizzes.includes(quizId)) return;
                set({
                    completedQuizzes: [...completedQuizzes, quizId],
                    points: points + 5,
                });
            },

            isQuizCompleted: (quizId: string) => {
                return get().completedQuizzes.includes(quizId);
            },
        }),
        {
            name: 'anti-learning-progress',
        }
    )
);

