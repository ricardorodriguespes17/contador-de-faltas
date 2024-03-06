import { CoursesProps } from "../../types/courses";
import firestore from "./database";

const collection = firestore().collection('users')

type GetFirebaseCourses = {
    userUid?: string
}

type UpdateFirebaseCourses = {
    userUid?: string
    courses: CoursesProps[]
}

export const getFirebaseCourses = async (data: GetFirebaseCourses) => {
    if (!data.userUid) return null

    try {
        const userData = await collection.doc(data.userUid).get()
        const courses = userData.get('courses') as CoursesProps[]
        return courses
    } catch (err) {
        return null
    }
}

export const updateFirebaseCourses = async (data: UpdateFirebaseCourses) => {
    if (!data.userUid) return null

    collection.doc(data.userUid).update({ courses: data.courses })
}