import useAuth from "../hooks/useAuth"
import { Redirect } from "expo-router"

const SplashScreen = () => {
  const { user } = useAuth()

  if (!user) {
    return <Redirect href="/auth/login" />
  } else {
    return <Redirect href="/home" />
  }
}

export default SplashScreen