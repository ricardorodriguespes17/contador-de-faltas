import { createContext, useEffect, useState } from "react";
import auth from "../services/firebase/auth";
import { UserProps } from "../types/user";
import { createUser, getUser } from "../services/firebase/usersDB";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

type UserContextProps = {
    user: UserProps | null
    isLoading: boolean
    onLogin: (data: LoginData) => Promise<boolean>
    onRegister: (data: RegisterData) => Promise<boolean>
    onLogout: () => Promise<boolean>
}

type LoginData = {
    email: string
    password: string
}

type RegisterData = {
    name: string
    email: string
    password: string
    confirmPassword: string
}

export const UserContext = createContext({} as UserContextProps)

type UserProviderProps = {
    children: React.ReactNode
}

const UserProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<UserProps | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        auth().onAuthStateChanged(onAuthStateChanged)
    }, [])

    const onAuthStateChanged = async (currentUser: FirebaseAuthTypes.User | null) => {
        const user = await getUserData(currentUser)
        setIsLoading(false)
        setUser(user)
    }

    const getUserData = async (currentUser: FirebaseAuthTypes.User | null) => {
        if (!currentUser) return null

        console.log('current:', currentUser)
        const userData = await getUser(currentUser.uid)
        console.log('userData:', userData)
        return { ...userData, uid: currentUser.uid }
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
            return true
        } catch (err) {
            return false
        } finally {
            setIsLoading(false)
        }
    }

    const onRegister = async ({ name, email, password }: RegisterData) => {
        try {
            setIsLoading(true)
            const credentials = await auth().createUserWithEmailAndPassword(email, password)
            if (credentials.user) {
                await createUser({
                    uid: credentials.user.uid,
                    name, courses: [],
                    coursesUpdatedAt: new Date()
                })
                const user = await getUserData(credentials.user)
                setUser(user)
                return !!user
            }
            return false
        } catch (err) {
            return false
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <UserContext.Provider value={{ user, isLoading, onLogin, onLogout, onRegister }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider