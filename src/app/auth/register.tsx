import { ToastAndroid, View } from "react-native"
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
        const resp = await onRegister({ 
            name: name.trim(), 
            username: username.trim(), 
            password: password.trim()
        })

        if (resp) {
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