import { View } from "react-native"
import LoginForm from "../../components/LoginForm"
import useAuth from "../../hooks/useAuth"
import { Redirect } from "expo-router"

const Login = () => {
    const { onLogin, user } = useAuth()

    const onSubmit = async ({ username, password }: { username: string, password: string }) => {
        await onLogin({ username: username.trim(), password: password.trim() })
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