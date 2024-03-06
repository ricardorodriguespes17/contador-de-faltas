import { View } from "react-native"
import useAuth from "../../hooks/useAuth"
import RegisterForm from "../../components/RegisterForm"
import { router } from "expo-router"

type FormValueProps = {
    name: string
    email: string
    password: string
    confirmPassword: string
  }

const Register = () => {
    const { onRegister } = useAuth()

    const onSubmit = async ({ name, email, password, confirmPassword }: FormValueProps) => {
        const resp = await onRegister({ name, email, password, confirmPassword })

        if(resp) {
            router.back()
        }
    }

    return (
        <View>
            <RegisterForm onSubmit={onSubmit} />
        </View>
    )
}

export default Register