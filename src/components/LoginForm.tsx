import { Formik } from "formik"
import { Text, View } from "react-native"
import InputField from "./InputField"
import Button from "./Button"
import useAuth from "../hooks/useAuth"

type FormValueProps = {
    email: string,
    password: string
}

type LoginFormProps = {
    onSubmit: (data: FormValueProps) => void
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
    const { isLoading } = useAuth()

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