import { Formik } from "formik"
import { Text } from "react-native"
import InputField from "./InputField"
import Button from "./Button"
import useAuth from "../hooks/useAuth"
import { router } from "expo-router"
import FormBase from "./FormBase"

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
      {({ values, setFieldValue, handleSubmit }) => (
        <FormBase
          handleSubmit={handleSubmit}
          textButton="Entrar"
          secondaryButton={(
            <Button
              className="h-[50px] w-full rounded-md mt-1"
              disabled={isLoading}
              onClick={() => router.push('/auth/register')}
            >
              <Text className="text-xl">
                Criar conta
              </Text>
            </Button>
          )}
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
        </FormBase>
      )}
    </Formik>
  )
}

export default LoginForm