import { Formik } from "formik"
import { Text } from "react-native"
import InputField from "./InputField"
import Button from "./Button"
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

  const validate = (values: FormValueProps) => {
    const errors = {} as any

    if (!values.password.trim()) {
      errors.password = 'Insira a senha'
    }

    if (!values.username.trim()) {
      errors.username = 'Insira o nome de usuário'
    }

    return errors
  }

  return (
    <Formik<FormValueProps>
      initialValues={{ username: '', password: '' }}
      onSubmit={onSubmit}
      validateOnChange={false}
      validate={validate}
    >
      {({ values, setFieldValue, handleSubmit, errors }) => (
        <FormBase
          handleSubmit={handleSubmit}
          textButton="Entrar"
          secondaryButton={(
            <Button
              className="h-[50px] w-full rounded-md mt-1"
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
            error={errors.username}
            onChangeText={(value) => setFieldValue('username', value)}
          />

          <InputField
            label="Senha"
            secureTextEntry
            value={values.password}
            error={errors.password}
            onChangeText={(value) => setFieldValue('password', value)}
          />
        </FormBase>
      )}
    </Formik>
  )
}

export default LoginForm