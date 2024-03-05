import { Formik } from "formik"
import { Text, View } from "react-native"
import InputField from "./InputField"
import Button from "./Button"
import { Redirect, router } from "expo-router"
import useAuth from "../hooks/useAuth"

type FormValueProps = {
    email: string,
    password: string
}

const LoginForm = () => {
    const { onLogin, isLoading, user } = useAuth()

    const onSubmit = async (values: FormValueProps) => {
        const response = await onLogin({ email: values.email, password: values.password })
        if (response) {
            router.replace("/")
        }
    }

    if(!user) {
        return <Redirect href="/" />
    }

    return (
        <Formik<FormValueProps>
            initialValues={{ email: '', password: '' }}
            onSubmit={onSubmit}
        >
            {({ values, setFieldValue }) => (
                <View className="flex h-full justify-center items-center px-20">
                    <InputField
                        label="Email"
                        value={values.email}
                        onChangeText={(value) => setFieldValue('email', value)}
                    />

                    <InputField
                        label="Senha"
                        value={values.password}
                        type="password"
                        onChangeText={(value) => setFieldValue('password', value)}
                    />

                    <Button
                        className="bg-teal-600 h-10 w-full rounded-md dark:bg-teal-900"
                        disabled={isLoading}
                        onClick={() => onSubmit(values)}
                    >
                        <Text className="text-xl text-white">
                            {isLoading ? "Entrando..." : "Entrar"}
                        </Text>
                    </Button>
                </View>
            )}
        </Formik>
    )
}

export default LoginForm