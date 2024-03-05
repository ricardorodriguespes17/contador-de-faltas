import { Text, TextInput, View } from "react-native"

type InputFieldProps = {
    label: string
    value?: string
    onChangeText?: (value: string) => void
}

const InputField = ({ label, value, onChangeText }: InputFieldProps) => {
    return (
        <View className="flex my-4 w-full">
            <Text className="text-xl dark:text-white">{label}</Text>
            <TextInput
                className="w-full h-10 border-2 border-gray-300 pl-3 rounded-md dark:text-white dark:border-gray-700"
                onChangeText={onChangeText}
                value={value}
            />
        </View>
    )
}

export default InputField