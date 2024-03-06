import { CoursesProps } from "../../types/courses"
import { UserProps } from "../../types/user"
import firestore from "./database"

type CreateUserProps = {
  uid: string
  name: string
  courses: CoursesProps[]
  coursesUpdatedAt: Date
}

const colletion = firestore().collection('users')

export const getUser = async (uid: string) => {
  return (await colletion.doc(uid).get()).data() as UserProps
}

export const createUser = async (data: CreateUserProps) => {
  return colletion.doc(data.uid).set({
    name: data.name,
    courses: data.courses,
    coursesUpdatedAt: data.coursesUpdatedAt
  })
}