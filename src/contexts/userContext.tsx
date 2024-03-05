import { createContext, useEffect, useState } from "react";
import auth from "../services/firebase/auth";
import { UserProps } from "../types/user";
import { getUser } from "../services/firebase/usersDB";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

type UserContextProps = {
    user: UserProps | null
    isLoading: boolean
    onLogin: (data: LoginData) => Promise<UserProps | null>
}

type LoginData = {
    email: string
    password: string
}

export const UserContext = createContext({} as UserContextProps)

type UserProviderProps = {
    children: React.ReactNode
}

const UserProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<UserProps | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        recoverUser()
    }, [])

    const recoverUser = async () => {
        try {
            setIsLoading(true)
            const currentUser = auth().currentUser
            const user = await getUserData(currentUser)
            setUser(user)
        } catch(err) {
            console.log('erro ao buscar o usuário')
        } finally {
            setIsLoading(false)
        }
    }

    const getUserData = async (currentUser: FirebaseAuthTypes.User | null) => {
        if (!currentUser) return null

        const user = await getUser(currentUser.uid)
        return user
    }

    const onLogin = async ({ email, password }: LoginData) => {
        try {
            setIsLoading(true)
            const credentials = await auth().signInWithEmailAndPassword(email, password)
            const user = getUserData(credentials.user)
            return user
        } catch (err) {
            return null
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <UserContext.Provider value={{ user, isLoading, onLogin }}>
            {!isLoading && children}
        </UserContext.Provider>
    )
}

export default UserProvider