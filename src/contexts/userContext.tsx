import { createContext, useEffect, useState } from "react";
import { UserProps } from "../types/user";
import { createUser, getUser } from "../services/firebase/usersDB";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import auth from "../services/firebase/auth";
import Loading from "../components/Loading";

type UserContextProps = {
  user: UserProps | null
  isLoading: boolean
  onLogin: (data: LoginData) => Promise<boolean>
  onRegister: (data: RegisterData) => Promise<boolean>
  onLogout: () => Promise<boolean>
}

type LoginData = {
  username: string
  password: string
}

type RegisterData = {
  name: string
  username: string
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
    auth().onAuthStateChanged(onAuthStateChanged)
  }, [])

  const onAuthStateChanged = async (currentUser: FirebaseAuthTypes.User | null) => {
    const user = await getUserData(currentUser)
    setIsLoading(false)
    setUser(user)
  }

  const getUserData = async (currentUser: FirebaseAuthTypes.User | null) => {
    if (!currentUser) return null

    const userData = await getUser(currentUser.uid)
    return { ...userData, uid: currentUser.uid }
  }

  const onLogin = async ({ username, password }: LoginData) => {
    try {
      setIsLoading(true)
      const credentials =
        await auth()
          .signInWithEmailAndPassword(username + "@gmail.com", password)
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

  const onRegister = async ({ name, username, password }: RegisterData) => {
    try {
      setIsLoading(true)
      const credentials =
        await auth()
          .createUserWithEmailAndPassword(username + "@gmail.com", password)
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
      {isLoading ? <Loading /> : children}
    </UserContext.Provider>
  )
}

export default UserProvider