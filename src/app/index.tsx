import { Text, View } from "react-native"
import useAuth from "../hooks/useAuth"
import { Redirect } from "expo-router"

const SplashScreen = () => {
  const { user, isLoading } = useAuth()

  if (!isLoading) {
    if (!user) {
      return <Redirect href="/auth/login" />
    } else {
      return <Redirect href="/home" />
    }
  }

  return (
    <View className="flex justify-center items-center w-full h-full">
      <Text>Carregando...</Text>
    </View>
  )
}

export default SplashScreen