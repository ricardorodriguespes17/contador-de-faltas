import { CoursesProps } from "../../types/courses";
import auth from "./auth";
import firestore from "./database";

const collection = firestore().collection('users')
const user = auth().currentUser

export const getFirebaseCourses = async () => {
    if(!user) return null

    try {
        const userData = await collection.doc(user.uid).get()
        const data = userData.get('courses')
    } catch (err) {
        return null
    }
}

export const updateFirebaseCourses = async (courses: CoursesProps[]) => {
    if(!user) return null
    
    collection.doc(user.uid).update({courses})
}