import { createContext, useEffect, useState } from "react";
import { CoursesProps } from "../types/courses";
import uuid from 'react-native-uuid';
import { getLocalCourses, setLocalCourses } from "../services/local/courseStorage";
import { getFirebaseCourses, updateFirebaseCourses } from "../services/firebase/coursesDB";

type CoursesContextProps = {
    courses: CoursesProps[]
    setCourses: (data: CoursesProps[]) => Promise<void>
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
    const [coursesData, setData] = useState<CoursesProps[]>([])

    useEffect(() => {
        getCourses()
    }, [])

    const getCourses = async () => {
        const data = await getFirebaseCourses()
        const localData = await getLocalCourses()

        setData(data || [])
    }

    const setCourses = async (data: CoursesProps[]) => {
        await updateFirebaseCourses(data)
        await setLocalCourses(data)
        setData(data)
    }

    const createCourse = (data: CreateCourseProps) => {
        const newCourse: CoursesProps = {
            id: uuid.v4() as string,
            absences: 0,
            ...data,
        }

        setCourses(coursesData.concat(newCourse))
    }

    const removeCourse = (id: string) => {
        setCourses(coursesData.filter(item => item.id !== id))
    }

    const incrementAbsences = (id: string) => {
        setCourses(coursesData.map(item => {
            if (item.id === id) {
                return { ...item, absences: item.absences + item.absencesPerDay }
            }
            return item
        }))
    }

    const decrementAbsences = (id: string) => {
        setCourses(coursesData.map(item => {
            if (item.id === id && item.absences - item.absencesPerDay >= 0) {
                return { ...item, absences: item.absences - item.absencesPerDay }
            }
            return item
        }))
    }

    return (
        <CoursesContext.Provider value={{
            courses: coursesData,
            setCourses,
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

