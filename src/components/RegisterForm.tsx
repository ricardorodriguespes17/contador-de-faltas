import { Formik } from "formik"
import { KeyboardAvoidingView, Text } from "react-native"
import InputField from "./InputField"
import Button from "./Button"
import useAuth from "../hooks/useAuth"

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

  return (
    <Formik<FormValueProps>
      initialValues={{ name: '', username: '', password: '', confirmPassword: '' }}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue }) => (
        <KeyboardAvoidingView
          behavior="height"
          className="flex h-full justify-center items-center px-20"
        >
          <InputField
            label="Nome"
            value={values.name}
            onChangeText={(value) => setFieldValue('name', value)}
          />

          <InputField
            label="Nome de usuário"
            value={values.username}
            onChangeText={(value) => setFieldValue('username', value)}
          />

          <InputField
            label="Senha"
            value={values.password}
            secureTextEntry
            onChangeText={(value) => setFieldValue('password', value)}
          />

          <InputField
            label="Confirma a senha"
            value={values.confirmPassword}
            secureTextEntry
            onChangeText={(value) => setFieldValue('confirmPassword', value)}
          />

          <Button
            className="bg-teal-600 h-10 w-full rounded-md dark:bg-teal-900"
            disabled={isLoading}
            onClick={() => onSubmit(values)}
          >
            <Text className="text-xl text-white">
              {isLoading ? "Criando..." : "Criar"}
            </Text>
          </Button>
        </KeyboardAvoidingView>
      )}
    </Formik>
  )
}

export default RegisterForm