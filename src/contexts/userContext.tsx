import { createContext, useEffect, useState } from "react";
import { UserProps } from "../types/user";
import { createUser, getUser } from "../services/firebase/usersDB";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import auth from "../services/firebase/auth";
import Loading from "../components/Loading";
import validateError from "../services/firebase/validateError";

type UserContextProps = {
  user: UserProps | null
  onLogin: (data: LoginData) => Promise<string>
  onRegister: (data: RegisterData) => Promise<string>
  onLogout: () => Promise<string>
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

    try {
      const userData = await getUser(currentUser.uid)
      return { ...userData, uid: currentUser.uid }
    } catch (err) {
      return null
    }
  }

  const onLogin = async ({ username, password }: LoginData) => {
    try {
      setIsLoading(true)
      const credentials =
        await auth()
          .signInWithEmailAndPassword(username + "@gmail.com", password)

      await getUserData(credentials.user)
      return "OK"
    } catch (err) {
      const firebaseError = err as { message: string, code: string }
      return validateError(firebaseError.code)
        || "Não foi possível fazer login, tente novamente"
    } finally {
      setIsLoading(false)
    }
  }

  const onLogout = async () => {
    try {
      setIsLoading(true)
      await auth().signOut()
      return "OK"
    } catch (err) {
      const firebaseError = err as { message: string, code: string }
      return validateError(firebaseError.code)
        || "Não foi possível fazer logout, tente novamente"
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
        return "OK"
      }

      return "Erro ao receber as credenciais do usuário"
    } catch (err) {
      const firebaseError = err as { message: string, code: string }
      return validateError(firebaseError.code)
        || "Não foi possível criar conta, tente novamente"
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <UserContext.Provider value={{ user, onLogin, onLogout, onRegister }}>
      {isLoading ? <Loading /> : children}
    </UserContext.Provider>
  )
}

export default UserProvider