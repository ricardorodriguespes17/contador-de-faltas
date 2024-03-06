import { KeyboardAvoidingView } from "react-native"

type FormBaseProps = {
  children: React.ReactNode
}

const FormBase = ({ children }: FormBaseProps) => {
  return (
    <KeyboardAvoidingView
      behavior="height"
      className="flex w-full h-full justify-center items-center px-14"
    >
      {children}
    </KeyboardAvoidingView>
  )
}

export default FormBase