import { createContext, useEffect, useState } from "react";
import { CoursesProps } from "../types/courses";
import uuid from 'react-native-uuid';
import { getLocalCourses, setLocalCourses } from "../services/local/courseStorage";
import { getFirebaseCourses, updateFirebaseCourses } from "../services/firebase/coursesDB";
import useAuth from "../hooks/useAuth";

type CoursesContextProps = {
    courses: CoursesProps[]
    isLoading: boolean
    createCourse: (data: CreateCourseProps) => void
    removeCourse: (id: string) => void
    incrementAbsences: (id: string) => void
    decrementAbsences: (id: string) => void
}

type CreateCourseProps = {
    name: string
    absencesPerDay: number
    absenceLimit: number
}

export const CoursesContext = createContext({} as CoursesContextProps)

type CoursesProviderProps = {
    children: React.ReactNode
}

const CoursesProvider = ({ children }: CoursesProviderProps) => {
    const [coursesData, setData] = useState<CoursesProps[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useAuth()

    useEffect(() => {
        if (user) {
            getCourses()
        }
    }, [user])

    const getCourses = async () => {
        try {
            setIsLoading(true)
            const data = await getFirebaseCourses({ userUid: user?.uid })
            const localData = await getLocalCourses()
            setData(data || [])
        } catch (err) {
            console.log('erro ao carregar as matérias')
        } finally {
            setIsLoading(false)
        }
    }

    const setCourses = async (data: CoursesProps[]) => {
        try {
            setIsLoading(true)
            await updateFirebaseCourses({ courses: data, userUid: user?.uid })
            await setLocalCourses(data)
            setData(data)
        } catch (err) {
            console.log('erro ao atualizar as matérias')
        } finally {
            setIsLoading(false)
        }

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
            isLoading,
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

