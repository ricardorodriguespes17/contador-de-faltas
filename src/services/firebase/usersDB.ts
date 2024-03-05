import { UserProps } from "../../types/user"
import firestore from "./database"

const colletion = firestore().collection('users')

export const getUser = async (uid: string) => {
    return (await colletion.doc(uid).get()).data() as UserProps
}