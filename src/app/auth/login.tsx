import { View } from "react-native"
import LoginForm from "../../components/LoginForm"
import useAuth from "../../hooks/useAuth"
import { Redirect, router } from "expo-router"

const Login = () => {
    const { onLogin, user } = useAuth()

    const onSubmit = async ({ email, password }: { email: string, password: string }) => {
        const response = await onLogin({ email, password })
        if (response) {
            router.replace("/home")
        }
    }

    if (!user) {
        return <Redirect href="/home" />
    }

    return (
        <View>
            <LoginForm onSubmit={onSubmit} />
        </View>
    )
}

export default Login