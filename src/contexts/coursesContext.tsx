import { createContext, useEffect, useState } from "react";
import { CoursesProps } from "../types/courses";
import uuid from 'react-native-uuid';
import { getLocalCourses, setLocalCourses } from "../services/local/courseStorage";

type CoursesContextProps = {
    courses: CoursesProps[]
    createCourse: (data: CreateCourseProps) => void
    removeCourse: (id: string) => void
    incrementAbsences: (id: string) => void
    decrementAbsences: (id: string) => void
}

type CreateCourseProps = {
    name: string
    absencesPerDay: number
}

export const CoursesContext = createContext({} as CoursesContextProps)

type CoursesProviderProps = {
    children: React.ReactNode
}

const CoursesProvider = ({ children }: CoursesProviderProps) => {
    const [courses, setCourses] = useState<CoursesProps[]>([])

    useEffect(() => {
        storageCourse()
    }, [courses])

    const storageCourse = async () => {
        if(courses.length > 0) {
            setLocalCourses(courses)
        } else {
            const localCourses = await getLocalCourses()
            if(localCourses) {
                setCourses(localCourses)
            }
        }
    }

    const createCourse = (data: CreateCourseProps) => {
        const newCourse: CoursesProps = {
            id: uuid.v4() as string,
            absences: 0,
            ...data,
        }

        setCourses(courses.concat(newCourse))
    }

    const removeCourse = (id: string) => {
        setCourses(courses.filter(item => item.id !== id))
    }

    const incrementAbsences = (id: string) => {
        setCourses(courses.map(item => {
            if (item.id === id) {
                return { ...item, absences: item.absences + item.absencesPerDay }
            }
            return item
        }))
    }

    const decrementAbsences = (id: string) => {
        setCourses(courses.map(item => {
            if (item.id === id && item.absences - item.absencesPerDay >= 0) {
                return { ...item, absences: item.absences - item.absencesPerDay }
            }
            return item
        }))
    }

    return (
        <CoursesContext.Provider value={{
            courses,
            removeCourse,
            incrementAbsences,
            decrementAbsences,
            createCourse
        }}>
            {children}
        </CoursesContext.Provider>
    )
}

export default CoursesProvider

