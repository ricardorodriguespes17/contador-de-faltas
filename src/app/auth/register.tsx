import { Alert, View } from "react-native"
import useAuth from "../../hooks/useAuth"
import RegisterForm from "../../components/RegisterForm"
import { router } from "expo-router"

type FormValueProps = {
  name: string
  username: string
  password: string
}

const Register = () => {
  const { onRegister } = useAuth()

  const onSubmit = async ({ name, username, password }: FormValueProps) => {
    const response = await onRegister({
      name: name.trim(),
      username: username.trim(),
      password: password.trim()
    })

    if (response === "OK") {
      router.back()
      return 
    }

    Alert.alert('Criar conta', response)
  }

  return (
    <View>
      <RegisterForm onSubmit={onSubmit} />
    </View>
  )
}

export default Register