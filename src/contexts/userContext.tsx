import { createContext, useEffect, useState } from "react";
import auth from "../services/firebase/auth";
import { UserProps } from "../types/user";
import { getUser } from "../services/firebase/usersDB";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

type UserContextProps = {
    user: UserProps | null
    isLoading: boolean
    onLogin: (data: LoginData) => Promise<boolean>
    onLogout: () => Promise<boolean>
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
        const sub = auth().onAuthStateChanged(onAuthStateChanged)
        return sub
    }, [])

    const onAuthStateChanged = async (currentUser: FirebaseAuthTypes.User | null) => {
        const user = await getUserData(currentUser)
        setIsLoading(false)
        setUser(user)
    }

    const getUserData = async (currentUser: FirebaseAuthTypes.User | null) => {
        if (!currentUser) return null

        const user = await getUser(currentUser.uid)
        console.log(user)
        return { ...user, uid: currentUser.uid }
    }

    const onLogin = async ({ email, password }: LoginData) => {
        try {
            setIsLoading(true)
            const credentials = await auth().signInWithEmailAndPassword(email, password)
            const user = getUserData(credentials.user)
            return !!user
        } catch (err) {
            return false
        } finally {
            setIsLoading(false)
        }
    }

    const onLogout = async () => {
        try {
            setIsLoading(true)
            await auth().signOut()
            setUser(null)
            return true
        } catch (err) {
            return false
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <UserContext.Provider value={{ user, isLoading, onLogin, onLogout }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider