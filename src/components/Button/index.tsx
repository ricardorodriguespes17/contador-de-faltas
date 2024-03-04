import { TouchableOpacity } from "react-native"

type ButtonProps = {
    onClick?: () => void
    children?: React.ReactNode
    className?: string
}

const Button = ({ onClick, className, children }: ButtonProps) => {
    return (
        <TouchableOpacity
            className={`flex justify-center items-center ${className}`}
            onPress={onClick}
        >
            {children}
        </TouchableOpacity>
    )
}

export default Button