import { KeyboardAvoidingView, Text } from "react-native"
import Button from "./Button"

type FormBaseProps = {
  children: React.ReactNode
  textButton: string
  secondaryButton?: React.ReactNode
  disabled?: boolean
  handleSubmit?: () => void
}

const FormBase = ({ children, disabled, handleSubmit, secondaryButton, textButton }: FormBaseProps) => {
  return (
    <KeyboardAvoidingView
      behavior="height"
      className="flex w-full h-full justify-center items-center px-14"
    >
      {children}

      <Button
        className="bg-teal-600 h-[50px] w-full rounded-md dark:bg-teal-900"
        disabled={disabled}
        onClick={handleSubmit}
      >
        <Text className="text-xl text-white">
          {textButton}
        </Text>
      </Button>

      {secondaryButton}
    </KeyboardAvoidingView>
  )
}

export default FormBase