import { Text, TouchableHighlight, View } from "react-native"

type ButtonProps = {
    onClick?: () => void
    children?: React.ReactNode
    className?: string
    textClassName?: string
}

const Button = ({ onClick, className, children, textClassName }: ButtonProps) => {
    return (
        <TouchableHighlight
            className={`flex justify-center items-center ${className}`}
            onPress={onClick}
        >
            <View>
                <Text className={textClassName}>
                    {children}
                </Text>
            </View>
        </TouchableHighlight>
    )
}

export default Button