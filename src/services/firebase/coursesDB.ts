import { CoursesProps } from "../../types/courses";
import firestore from "./database";

const collection = firestore().collection('users')

export const getFirebaseCourses = async () => {
    try {
        const userData = await collection.doc('mari').get()
        const data = userData.get('courses')
    } catch (err) {
        return null
    }
}

export const updateFirebaseCourses = async (courses: CoursesProps[]) => {
    collection.doc('mari').update({courses})
}