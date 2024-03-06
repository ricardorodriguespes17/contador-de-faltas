import { TouchableOpacity, TouchableOpacityProps } from "react-native"

type ButtonProps = {
  onClick?: () => void
  children?: React.ReactNode
  className?: string
} & TouchableOpacityProps

const Button = ({ onClick, className, children, ...rest }: ButtonProps) => {
  return (
    <TouchableOpacity
      {...rest}
      className={`flex justify-center items-center ${className}`}
      onPress={onClick}
    >
      {children}
    </TouchableOpacity>
  )
}

export default Button