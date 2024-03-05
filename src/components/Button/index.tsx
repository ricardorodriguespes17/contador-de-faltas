import { TouchableOpacity } from "react-native"

type ButtonProps = {
    onClick?: () => void
    children?: React.ReactNode
    className?: string
    disabled?: boolean
}

const Button = ({ onClick, className, children, disabled }: ButtonProps) => {
    return (
        <TouchableOpacity
            className={`flex justify-center items-center ${className}`}
            disabled={disabled}
            onPress={onClick}
        >
            {children}
        </TouchableOpacity>
    )
}

export default Button