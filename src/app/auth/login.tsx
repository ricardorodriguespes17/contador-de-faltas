import { View } from "react-native"
import LoginForm from "../../components/LoginForm"
import useAuth from "../../hooks/useAuth"
import { Redirect, router } from "expo-router"

const Login = () => {
    const { onLogin, user } = useAuth()

    const onSubmit = async ({ email, password }: { email: string, password: string }) => {
        await onLogin({ email, password })
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