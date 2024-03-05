import { Formik } from "formik"
import { Text, View } from "react-native"
import InputField from "./InputField"
import Button from "./Button"
import { router } from "expo-router"

type FormValueProps = {
    username: string,
    password: string
}

const LoginForm = () => {

    const onSubmit = (values: FormValueProps) => {
        // router.replace("/")
    }

    return (
        <Formik<FormValueProps>
            initialValues={{ username: '', password: '' }}
            onSubmit={onSubmit}
        >
            {({ values, setFieldValue }) => (
                <View className="flex h-full justify-center items-center px-20">
                    <InputField
                        label="Usuário"
                        value={values.username}
                        onChangeText={(value) => setFieldValue('username', value)}
                    />

                    <InputField
                        label="Senha"
                        value={values.password}
                        type="password"
                        onChangeText={(value) => setFieldValue('password', value)}
                    />

                    <Button
                        className="bg-teal-600 h-10 w-full rounded-md dark:bg-teal-900"
                        onClick={() => onSubmit(values)}
                    >
                        <Text className="text-xl text-white">Entrar</Text>
                    </Button>
                </View>
            )}
        </Formik>
    )
}

export default LoginForm