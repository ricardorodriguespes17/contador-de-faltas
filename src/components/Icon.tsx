import { useColorScheme } from 'nativewind'
import FAIcon from 'react-native-vector-icons/FontAwesome5'
import { darkMode, lightMode } from '../config/appConfig'

type IconProps = {
    name: string
    size?: number
    color?: string
    onClick?: () => void
}

const Icon = ({ name, size = 24, color, onClick }: IconProps) => {
    const { colorScheme } = useColorScheme();
    const theme = colorScheme === 'dark' ? darkMode : lightMode

    return (
        <FAIcon
            name={name}
            size={size}
            onPress={onClick}
            color={color || theme.textAppColor}
        />
    )
}

export default Icon