import { createContext, useState } from "react";
import { CoursesProps } from "../types/courses";

type CoursesContextProps = {
    courses: CoursesProps[]
    removeCourse: (id: number) => void
    incrementAbsences: (id: number) => void
    decrementAbsences: (id: number) => void
}

export const CoursesContext = createContext({} as CoursesContextProps)

type CoursesProviderProps = {
    children: React.ReactNode
}

const CoursesProvider = ({ children }: CoursesProviderProps) => {
    const [courses, setCourses] = useState<CoursesProps[]>([
        { id: 0, name: 'Sociologia', absences: 0, absencesPerDay: 2 },
        { id: 1, name: 'Redes de Computadores I', absences: 0, absencesPerDay: 2 },
        { id: 2, name: 'Paradigmas de LP', absences: 0, absencesPerDay: 3 },
        { id: 3, name: 'Sistemas Inteligentes', absences: 0, absencesPerDay: 2 },
        { id: 4, name: 'TSI', absences: 0, absencesPerDay: 2 },
    ])

    const removeCourse = (id: number) => {
        setCourses(courses.filter(item => item.id !== id))
    }

    const incrementAbsences = (id: number) => {
        setCourses(courses.map(item => {
            if (item.id === id) {
                return { ...item, absences: item.absences + item.absencesPerDay }
            }
            return item
        }))
    }

    const decrementAbsences = (id: number) => {
        setCourses(courses.map(item => {
            if (item.id === id && item.absences - item.absencesPerDay >= 0) {
                return { ...item, absences: item.absences - item.absencesPerDay }
            }
            return item
        }))
    }

    return (
        <CoursesContext.Provider value={{ courses, removeCourse, incrementAbsences, decrementAbsences }}>
            {children}
        </CoursesContext.Provider>
    )
}

export default CoursesProvider

