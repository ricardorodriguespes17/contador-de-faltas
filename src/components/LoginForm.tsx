import { Formik } from "formik"
import { KeyboardAvoidingView, Text } from "react-native"
import InputField from "./InputField"
import Button from "./Button"
import useAuth from "../hooks/useAuth"
import { router } from "expo-router"

type FormValueProps = {
  username: string,
  password: string
}

type LoginFormProps = {
  onSubmit: (data: FormValueProps) => void
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const { isLoading } = useAuth()

  return (
    <Formik<FormValueProps>
      initialValues={{ username: '', password: '' }}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue }) => (
        <KeyboardAvoidingView
          behavior="height"
          className="flex h-full justify-center items-center px-20"
        >
          <InputField
            label="Usuário"
            value={values.username}
            onChangeText={(value) => setFieldValue('username', value)}
          />

          <InputField
            label="Senha"
            value={values.password}
            secureTextEntry
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

          <Button
            className="h-10 w-full rounded-md mt-1"
            disabled={isLoading}
            onClick={() => router.push('/auth/register')}
          >
            <Text className="text-xl">
              Criar conta
            </Text>
          </Button>
        </KeyboardAvoidingView>
      )}
    </Formik>
  )
}

export default LoginForm