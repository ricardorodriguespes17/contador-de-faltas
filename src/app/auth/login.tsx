import { Alert, View } from "react-native"
import LoginForm from "../../components/LoginForm"
import useAuth from "../../hooks/useAuth"
import { Redirect } from "expo-router"

const Login = () => {
  const { onLogin, user } = useAuth()

  const onSubmit = async ({ username, password }: { username: string, password: string }) => {
    const response = await onLogin({ username: username.trim(), password: password.trim() })

    if(response === "OK") return

    Alert.alert('Login', response)
  }

  if (user) {
    return <Redirect href="/home" />
  }

  return (
    <View>
      <LoginForm onSubmit={onSubmit} />
    </View>
  )
}

export default Login