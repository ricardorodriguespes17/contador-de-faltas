import { Text, TextInput, TextInputProps, View } from "react-native"

type InputFieldProps = {
  label: string
  error?: string
} & TextInputProps

const InputField = ({ label, error, ...rest }: InputFieldProps) => {
  return (
    <View className="flex my-4 w-full">
      <Text className="text-xl dark:text-white">{label}</Text>
      <TextInput
        {...rest}
        className="w-full h-12 border-2 border-gray-300 pl-3 rounded-md dark:text-white dark:border-gray-700"
      />
      {error && <Text className="text-sm text-red-500 ml-1">{error}</Text>}
    </View>
  )
}

export default InputField