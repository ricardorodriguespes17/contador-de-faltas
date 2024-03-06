import { Formik } from "formik"
import { Text, ToastAndroid } from "react-native"
import InputField from "./InputField"
import Button from "./Button"
import useAuth from "../hooks/useAuth"
import FormBase from "./FormBase"

type FormValueProps = {
  name: string
  username: string
  password: string
  confirmPassword: string
}

type RegisterFormProps = {
  onSubmit: (data: FormValueProps) => void
}

const RegisterForm = ({ onSubmit }: RegisterFormProps) => {
  const { isLoading } = useAuth()

  const validate = (values: FormValueProps) => {
    const errors = {} as any

    console.log(values.password.length)

    if (!values.password.trim()) {
      errors.password = 'A senha é obrigatória'
    } else if (values.password.trim().length < 6) {
      errors.password = 'A senha deve ter pelo menos 6 caracteres'
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = 'As senha devem ser iguais'
    }

    if (!values.name.trim()) {
      errors.name = 'O nome é obrigatório'
    }

    if (!values.username.trim()) {
      errors.username = 'O nome de usuário é obrigatório'
    } else if(values.username.includes("@")) {
      errors.username = 'O nome de usuário não pode conter "@"'
    }

    return errors
  }

  return (
    <Formik<FormValueProps>
      initialValues={{ name: '', username: '', password: '', confirmPassword: '' }}
      validate={validate}
      validateOnChange={false}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue, errors, handleSubmit }) => (
        <FormBase
          disabled={isLoading}
          textButton="Criar"
          handleSubmit={handleSubmit}
        >
          <InputField
            label="Nome"
            error={errors.name}
            value={values.name}
            onChangeText={(value) => setFieldValue('name', value)}
          />

          <InputField
            label="Nome de usuário"
            error={errors.username}
            value={values.username}
            onChangeText={(value) => setFieldValue('username', value)}
          />

          <InputField
            label="Senha"
            error={errors.password}
            value={values.password}
            secureTextEntry
            onChangeText={(value) => setFieldValue('password', value)}
          />

          <InputField
            label="Repita a senha"
            value={values.confirmPassword}
            error={values.confirmPassword}
            secureTextEntry
            onChangeText={(value) => setFieldValue('confirmPassword', value)}
          />
        </FormBase>
      )}
    </Formik>
  )
}

export default RegisterForm