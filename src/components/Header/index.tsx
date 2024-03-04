import { Text, View } from "react-native"
import { useColorScheme } from "nativewind"
import Icon from "../Icon"
import { lightMode } from "../../config/appConfig"
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins"

type HeaderProps = {
    title: string
}

const Header = (props: HeaderProps) => {
    const { toggleColorScheme, colorScheme } = useColorScheme()
    const [fontsLoaded] = useFonts({ Poppins_400Regular })

    return (
        <View className="flex w-full bg-teal-600 px-4 pt-8 flex-row h-24 justify-between items-center dark:bg-teal-900">
            <Text className="text-xl text-white" style={{ fontFamily: 'Poppins_400Regular' }}>{props.title}</Text>
            <Icon
                name={colorScheme === 'dark' ? 'sun' : 'moon'}
                onClick={toggleColorScheme}
                color={lightMode.textPrimaryColor}
            />
        </View>
    )
}

export default Header